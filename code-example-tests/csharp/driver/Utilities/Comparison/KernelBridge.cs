using System.Collections.Concurrent;
using System.Diagnostics;
using System.Runtime.InteropServices;
using System.Text;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Utilities.Comparison;

// ──────────────────────────────────────────────────────────────────────────────
// Protocol DTOs  (map directly to the kernel's JSON wire format)
// ──────────────────────────────────────────────────────────────────────────────

internal sealed class KernelRequest
{
    [JsonPropertyName("protocolVersion")] public int ProtocolVersion { get; init; } = KernelBridge.ProtocolVersion;
    [JsonPropertyName("expected")] public string Expected { get; init; } = "";
    // Actual is embedded as a JSON value (array/object), not a JSON-encoded string,
    // so the kernel doesn't have to double-decode it.
    [JsonPropertyName("actual")] public object? Actual { get; init; }
    [JsonPropertyName("options")] public KernelRequestOptions Options { get; init; } = new();
}

internal sealed class KernelRequestOptions
{
    [JsonPropertyName("comparisonType")] public string? ComparisonType { get; init; }
    [JsonPropertyName("ignoreFieldValues")] public List<string>? IgnoreFieldValues { get; init; }
    [JsonPropertyName("schema")] public KernelSchema? Schema { get; init; }
}

internal sealed class KernelSchema
{
    [JsonPropertyName("count")] public int Count { get; init; }
    [JsonPropertyName("requiredFields")] public string[]? RequiredFields { get; init; }
    [JsonPropertyName("fieldValues")] public Dictionary<string, object?>? FieldValues { get; init; }
}

internal sealed class KernelResponse
{
    [JsonPropertyName("protocolVersion")] public int ProtocolVersion { get; init; }
    [JsonPropertyName("isMatch")] public bool IsMatch { get; init; }
    [JsonPropertyName("errors")] public List<KernelError>? Errors { get; init; }
    [JsonPropertyName("error")] public string? Error { get; init; }
}

internal sealed class KernelError
{
    [JsonPropertyName("path")] public string? Path { get; init; }
    [JsonPropertyName("expected")] public string? Expected { get; init; }
    [JsonPropertyName("actual")] public string? Actual { get; init; }
    [JsonPropertyName("message")] public string? Message { get; init; }
}

// ──────────────────────────────────────────────────────────────────────────────
// KernelBridge
// ──────────────────────────────────────────────────────────────────────────────

/// <summary>
/// Manages a pool of comparison-kernel child processes and exposes a
/// CompareAsync() method that communicates over the newline-delimited JSON protocol.
///
/// Each concurrent caller gets its own exclusive process connection from the pool,
/// so no semaphore or lock is needed and tests run fully in parallel.
///
/// The kernel is a native Go binary, one per supported platform, copied into the
/// test output directory by Utilities.csproj. The bridge picks the binary matching
/// the host OS/arch at runtime via RuntimeInformation — no external runtime needed.
/// </summary>
internal sealed class KernelBridge : IDisposable
{
    /// <summary>Wire-protocol version this bridge speaks. Must match the kernel's.</summary>
    public const int ProtocolVersion = 1;

    private static readonly JsonSerializerOptions _jsonOptions = new()
    {
        DefaultIgnoreCondition = JsonIgnoreCondition.WhenWritingNull,
    };

    /// <summary>Shared pool — connections created lazily on first use.</summary>
    public static readonly KernelBridge Shared = new();

    // Pool of reusable kernel connections — one per concurrent caller.
    // Sized to the host's processor count, with a floor of 4 (so single- and
    // dual-core CI runners still get useful parallelism) and a ceiling of 16
    // (each kernel process holds a few MB of resident memory, so an unbounded
    // pool on a many-core CI box would waste memory for diminishing returns).
    // Mirrors the Java bridge's POOL_SIZE. Note: this caps *retained* idle
    // connections, not in-flight processes — under heavy concurrency callers
    // can still spawn fresh processes; they just won't be returned to the pool
    // once it's full.
    private static readonly int _maxPoolSize = Math.Min(
        16, Math.Max(4, Environment.ProcessorCount));

    private readonly string _binaryPath;
    private readonly ConcurrentQueue<KernelConnection> _pool = new();
    private int _pooledCount;
    private bool _disposed;

    /// <summary>One live connection to a single kernel process.</summary>
    private sealed class KernelConnection : IDisposable
    {
        public StreamWriter Stdin { get; }
        public StreamReader Stdout { get; }
        private readonly Process _process;
        private bool _disposed;

        public KernelConnection(Process process, StreamWriter stdin, StreamReader stdout)
        {
            _process = process;
            Stdin = stdin;
            Stdout = stdout;
        }

        public bool IsAlive
        {
            get { try { return !_disposed && !_process.HasExited; } catch { return false; } }
        }

        public void Dispose()
        {
            if (_disposed) return;
            _disposed = true;
            try { Stdin.Close(); } catch { /* best-effort */ }
            try { _process.WaitForExit(milliseconds: 500); } catch { /* best-effort */ }
            try { if (!_process.HasExited) _process.Kill(entireProcessTree: true); }
            catch { /* best-effort */ }
        }
    }

    public KernelBridge(string? binaryPath = null)
    {
        _binaryPath = binaryPath ?? FindBinaryPath();
    }

    // ── path resolution ────────────────────────────────────────────────────────

    /// <summary>
    /// Map .NET's RuntimeInformation onto Go's GOOS/GOARCH naming used by
    /// tools/comparison-kernel/build.sh.
    /// </summary>
    private static string BinaryName()
    {
        string goos;
        if (RuntimeInformation.IsOSPlatform(OSPlatform.OSX)) goos = "darwin";
        else if (RuntimeInformation.IsOSPlatform(OSPlatform.Linux)) goos = "linux";
        else if (RuntimeInformation.IsOSPlatform(OSPlatform.Windows)) goos = "windows";
        else throw new PlatformNotSupportedException(
                $"comparison-kernel: unsupported host OS {RuntimeInformation.OSDescription}");

        string goarch = RuntimeInformation.OSArchitecture switch
        {
            Architecture.Arm64 => "arm64",
            Architecture.X64 => "amd64",
            _ => throw new PlatformNotSupportedException(
                    $"comparison-kernel: unsupported host arch {RuntimeInformation.OSArchitecture}"),
        };

        var suffix = goos == "windows" ? ".exe" : "";
        return $"comparison-kernel-{goos}-{goarch}{suffix}";
    }

    private static string FindBinaryPath()
    {
        var name = BinaryName();

        // Primary: copied into the test output directory by Utilities.csproj.
        var primary = Path.Combine(AppContext.BaseDirectory, name);
        if (File.Exists(primary)) return primary;

        // Fallback: walk up the directory tree looking for the source bin/ directory.
        var current = new DirectoryInfo(AppContext.BaseDirectory);
        while (current != null)
        {
            var candidate = Path.Combine(
                current.FullName, "tools", "comparison-kernel", "bin", name);
            if (File.Exists(candidate)) return candidate;
            current = current.Parent;
        }

        throw new FileNotFoundException(
            $"{name} not found. Build it with: ./build.sh in " +
            "code-example-tests/tools/comparison-kernel");
    }

    // ── pool lifecycle ─────────────────────────────────────────────────────────

    private async Task<KernelConnection> CreateConnectionAsync()
    {
        if (!File.Exists(_binaryPath))
            throw new FileNotFoundException(
                $"comparison-kernel binary not found at: {_binaryPath}");

        // UTF-8 without BOM — Encoding.UTF8 emits a BOM preamble on first write,
        // which would prepend \xEF\xBB\xBF to the first JSON request line and
        // cause the kernel's json.Unmarshal to fail with "invalid character 'ï'".
        var utf8NoBom = new UTF8Encoding(encoderShouldEmitUTF8Identifier: false);
        var startInfo = new ProcessStartInfo(_binaryPath)
        {
            UseShellExecute = false,
            RedirectStandardInput = true,
            RedirectStandardOutput = true,
            RedirectStandardError = true,
            StandardInputEncoding = utf8NoBom,
            StandardOutputEncoding = utf8NoBom,
        };

        var process = new Process { StartInfo = startInfo };
        process.Start();

        // Forward kernel stderr to the test output so errors are visible
        _ = Task.Run(async () =>
        {
            string? line;
            while ((line = await process.StandardError.ReadLineAsync()) != null)
                Console.Error.WriteLine($"[comparison-kernel] {line}");
        });

        var conn = new KernelConnection(process, process.StandardInput, process.StandardOutput);
        await ProbeConnectionAsync(conn);
        return conn;
    }

    /// <summary>
    /// Sends a minimal no-op request and waits for a response, confirming the kernel
    /// is ready to handle real comparisons. More robust than a fixed startup delay:
    /// waits as long as the kernel actually needs (up to the timeout) without
    /// burning unnecessary time on fast machines.
    /// </summary>
    private async Task ProbeConnectionAsync(KernelConnection conn)
    {
        using var cts = new CancellationTokenSource(TimeSpan.FromSeconds(10));
        try
        {
            var probe = new KernelRequest { Expected = "[]", Actual = Array.Empty<object?>() };
            var probeLine = JsonSerializer.Serialize(probe, _jsonOptions);

            await conn.Stdin.WriteLineAsync(probeLine.AsMemory(), cts.Token);
            await conn.Stdin.FlushAsync(cts.Token);

            var responseLine = await conn.Stdout.ReadLineAsync(cts.Token);
            if (responseLine == null)
                throw new InvalidOperationException(
                    "comparison-kernel exited before responding to startup probe");
        }
        catch (OperationCanceledException)
        {
            conn.Dispose();
            throw new TimeoutException(
                "comparison-kernel did not respond to startup probe within 10 seconds. " +
                "Ensure the kernel binary at " + _binaryPath + " is valid and runnable.");
        }
    }

    /// <summary>
    /// Returns a live connection: a pooled one if available, otherwise a freshly
    /// spawned process. Always succeeds or throws — callers don't need to null-check.
    /// </summary>
    private async Task<KernelConnection> BorrowOrCreateAsync()
    {
        while (_pool.TryDequeue(out var conn))
        {
            Interlocked.Decrement(ref _pooledCount);
            if (conn.IsAlive) return conn;
            conn.Dispose(); // stale — discard and try the next one
        }
        return await CreateConnectionAsync();
    }

    private void ReturnConnection(KernelConnection conn)
    {
        if (!conn.IsAlive)
        {
            conn.Dispose();
            return;
        }
        // Atomically reserve a slot before enqueueing, mirroring Java's
        // ArrayBlockingQueue.offer(). If the pool is full, destroy instead.
        if (Interlocked.Increment(ref _pooledCount) <= _maxPoolSize)
        {
            _pool.Enqueue(conn);
        }
        else
        {
            Interlocked.Decrement(ref _pooledCount);
            conn.Dispose();
        }
    }

    // ── public API ─────────────────────────────────────────────────────────────

    /// <summary>
    /// Sends a comparison request to the kernel and returns the parsed response.
    /// Each caller borrows an exclusive connection from the pool (creating one if
    /// the pool is empty), so concurrent callers never share a stdin/stdout pipe.
    /// </summary>
    internal async Task<KernelResponse> CompareAsync(
        string expectedContent,
        object? actual,
        KernelRequestOptions options,
        CancellationToken cancellationToken = default)
    {
        var conn = await BorrowOrCreateAsync();
        try
        {
            var request = new KernelRequest
            {
                Expected = expectedContent,
                Actual = actual,
                Options = options,
            };
            var requestLine = JsonSerializer.Serialize(request, _jsonOptions);

            await conn.Stdin.WriteLineAsync(requestLine.AsMemory(), cancellationToken);
            await conn.Stdin.FlushAsync(cancellationToken);

            var responseLine = await conn.Stdout.ReadLineAsync(cancellationToken);
            if (responseLine == null)
            {
                conn.Dispose();
                throw new InvalidOperationException(
                    "comparison-kernel process exited unexpectedly");
            }

            ReturnConnection(conn);

            return JsonSerializer.Deserialize<KernelResponse>(responseLine, _jsonOptions)
                ?? throw new InvalidOperationException(
                    $"Failed to parse kernel response: {responseLine}");
        }
        catch
        {
            conn.Dispose();
            throw;
        }
    }

    /// <summary>
    /// Normalises a C# value (including BSON types) into a JSON-serialisable
    /// payload for the kernel's "actual" wire field. Always produces a top-level
    /// array. The value is embedded directly in the request JSON, not stringified.
    ///
    /// String actuals that look like JSON (start with "{" or "[") are parsed
    /// into structured payloads so they compare structurally against expected
    /// JSON content rather than as raw strings — mirroring how the expected
    /// side already handles MongoDB-syntax string input.
    /// </summary>
    public static object?[] SerializeActual(object? actual)
    {
        if (actual is string str)
        {
            var trimmed = str.TrimStart();
            if (trimmed.StartsWith("{") || trimmed.StartsWith("["))
            {
                try
                {
                    using var doc = JsonDocument.Parse(str);
                    var parsed = ValueNormalizer.Normalize(doc.RootElement.Clone());
                    return parsed switch
                    {
                        object?[] array => array,
                        null => Array.Empty<object?>(),
                        _ => new[] { parsed },
                    };
                }
                catch (JsonException)
                {
                    // Fall through to treat as a plain string.
                }
            }
        }

        var normalized = ValueNormalizer.Normalize(actual);

        return normalized switch
        {
            object?[] array => array,
            null => Array.Empty<object?>(),
            _ => new[] { normalized },
        };
    }

    /// <summary>
    /// Turns an expected value into raw text the kernel can parse:
    /// <list type="bullet">
    ///   <item>existing file path → file contents</item>
    ///   <item>string starting with "{" or "[" → as-is (MongoDB-syntax content)</item>
    ///   <item>everything else → BSON-normalised and JSON-encoded</item>
    /// </list>
    /// </summary>
    public static async Task<string> SerializeExpectedAsync(object? expected)
    {
        if (expected is null) return "null";
        if (expected is string s)
        {
            if (LooksLikeFilePath(s))
            {
                var resolved = ResolveExpectedFilePath(s);
                if (File.Exists(resolved))
                    return await File.ReadAllTextAsync(resolved);
            }
            var trimmed = s.TrimStart();
            if (trimmed.StartsWith("{") || trimmed.StartsWith("["))
                return s;
            return JsonSerializer.Serialize(s, _jsonOptions);
        }
        var normalized = ValueNormalizer.Normalize(expected);
        return JsonSerializer.Serialize(normalized, _jsonOptions);
    }

    /// <summary>
    /// Lightweight heuristic for whether a string could plausibly be a file path.
    /// Single-line, no JSON markers at the start, shorter than 1 KiB.
    /// </summary>
    public static bool LooksLikeFilePath(string? input)
    {
        if (string.IsNullOrWhiteSpace(input)) return false;
        if (input.Length > 1024) return false;
        if (input.IndexOfAny(new[] { '\n', '\r' }) >= 0) return false;
        var trimmed = input.TrimStart();
        return !trimmed.StartsWith("{") && !trimmed.StartsWith("[");
    }

    /// <summary>
    /// Resolve a possibly-relative expected-file path. Searches the working
    /// directory and common <c>examples/</c> ancestor locations used by the
    /// driver test suites.
    /// </summary>
    public static string ResolveExpectedFilePath(string expectedFilePath)
    {
        if (Path.IsPathRooted(expectedFilePath)) return expectedFilePath;
        var currentDir = Directory.GetCurrentDirectory();
        string[] candidates =
        {
            Path.Combine(currentDir, "..", "examples", expectedFilePath),
            Path.Combine(currentDir, "examples", expectedFilePath),
            Path.Combine(currentDir, "..", "..", "examples", expectedFilePath),
            Path.Combine(currentDir, expectedFilePath),
            expectedFilePath,
        };
        return candidates.FirstOrDefault(File.Exists) ?? expectedFilePath;
    }

    // ── IDisposable ────────────────────────────────────────────────────────────

    public void Dispose()
    {
        if (_disposed) return;
        _disposed = true;
        while (_pool.TryDequeue(out var conn))
        {
            Interlocked.Decrement(ref _pooledCount);
            conn.Dispose();
        }
    }
}
