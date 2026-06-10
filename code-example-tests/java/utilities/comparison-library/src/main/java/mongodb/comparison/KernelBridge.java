package mongodb.comparison;

import com.fasterxml.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.OutputStreamWriter;
import java.io.PrintWriter;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.LinkedHashMap;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ArrayBlockingQueue;

/**
 * Bridge to the comparison kernel (a native Go binary committed under
 * tools/comparison-kernel/bin/). Delegates file-based comparisons to the
 * language-agnostic kernel for consistency across all driver test suites.
 *
 * <p>A pool of persistent kernel processes is maintained so that concurrent test
 * threads each get an exclusive connection without contention. Each connection reads
 * newline-delimited JSON requests from stdin and writes newline-delimited JSON
 * responses to stdout, amortising process startup cost across many calls.
 */
class KernelBridge {

    private static final ObjectMapper MAPPER = new ObjectMapper();

    /** Wire-protocol version this bridge speaks. Must match the kernel's. */
    private static final int PROTOCOL_VERSION = 1;

    // Pool of reusable kernel connections — one per concurrent caller.
    // Sized to the host's processor count, with a floor of 4 (so single- and
    // dual-core CI runners still get useful parallelism) and a ceiling of 16
    // (each kernel process holds a few MB of resident memory, so an unbounded
    // pool on a many-core CI box would waste memory for diminishing returns).
    private static final int POOL_SIZE = Math.min(
            16, Math.max(4, Runtime.getRuntime().availableProcessors()));
    private static final ArrayBlockingQueue<KernelConnection> POOL =
            new ArrayBlockingQueue<>(POOL_SIZE);

    private static volatile Path cachedBinaryPath = null;

    /** A single live connection to one kernel process. */
    private static final class KernelConnection {
        final Process       process;
        final PrintWriter   writer;
        final BufferedReader reader;

        KernelConnection(Process process, PrintWriter writer, BufferedReader reader) {
            this.process = process;
            this.writer  = writer;
            this.reader  = reader;
        }

        boolean isAlive() { return process.isAlive(); }

        void destroy() {
            try { writer.close(); } catch (Exception ignored) {}
            process.destroy();
        }
    }

    static {
        // Drain and destroy all pooled connections on JVM shutdown.
        Runtime.getRuntime().addShutdownHook(new Thread(() -> {
            List<KernelConnection> connections = new ArrayList<>();
            POOL.drainTo(connections);
            for (KernelConnection conn : connections) {
                conn.destroy();
            }
        }));
    }

    /**
     * Map the JVM's os.name / os.arch system properties onto Go's GOOS / GOARCH
     * naming used by tools/comparison-kernel/build.sh.
     */
    static String binaryName() {
        String osName = System.getProperty("os.name", "").toLowerCase();
        String osArch = System.getProperty("os.arch", "").toLowerCase();

        String goos;
        if (osName.contains("mac") || osName.contains("darwin")) goos = "darwin";
        else if (osName.contains("linux")) goos = "linux";
        else if (osName.contains("windows")) goos = "windows";
        else throw new UnsupportedOperationException(
                "comparison-kernel: unsupported host OS " + osName);

        String goarch;
        if (osArch.equals("aarch64") || osArch.equals("arm64")) goarch = "arm64";
        else if (osArch.equals("x86_64") || osArch.equals("amd64")) goarch = "amd64";
        else throw new UnsupportedOperationException(
                "comparison-kernel: unsupported host arch " + osArch);

        String suffix = goos.equals("windows") ? ".exe" : "";
        return "comparison-kernel-" + goos + "-" + goarch + suffix;
    }

    /**
     * Find the platform-specific kernel binary by walking up from the current
     * working directory.
     */
    static Path findBinaryPath() throws IOException {
        String name = binaryName();
        Path dir = Paths.get(System.getProperty("user.dir")).toAbsolutePath();
        for (int i = 0; i < 12; i++) {
            Path candidate = dir.resolve("tools/comparison-kernel/bin").resolve(name);
            if (Files.exists(candidate)) {
                return candidate;
            }
            Path parent = dir.getParent();
            if (parent == null || parent.equals(dir)) {
                break;
            }
            dir = parent;
        }
        throw new IOException(
                name + " not found; build it with: ./build.sh in "
                        + "code-example-tests/tools/comparison-kernel");
    }

    /**
     * Resolve a relative file path using the same strategies as ExpectedOutputParser.
     */
    static Path resolveFilePath(String filePath) {
        if (Paths.get(filePath).isAbsolute()) {
            return Paths.get(filePath);
        }
        Path cwd = Paths.get(System.getProperty("user.dir"));
        Path[] candidates = {
            cwd.resolve(filePath),
            cwd.resolve("examples").resolve(filePath),
            cwd.getParent() != null ? cwd.getParent().resolve("examples").resolve(filePath) : null,
            cwd.resolve("src/test/resources").resolve(filePath),
            cwd.resolve("src/test/resources/examples").resolve(filePath),
        };
        for (Path candidate : candidates) {
            if (candidate != null && Files.exists(candidate)) {
                return candidate;
            }
        }
        // Walk up to 3 parent levels looking for examples/
        Path searchDir = cwd;
        for (int i = 0; i < 3; i++) {
            Path p = searchDir.resolve("examples").resolve(filePath);
            if (Files.exists(p)) return p;
            searchDir = searchDir.getParent();
            if (searchDir == null) break;
        }
        return Paths.get(filePath);
    }

    /**
     * Normalize actual results to a JSON-serialisable List for the kernel's
     * "actual" wire field. The value is embedded directly in the request JSON,
     * not stringified, so the kernel doesn't have to double-decode it.
     */
    static List<Object> serializeActual(Object actual) {
        Object normalized = MongoTypeNormalizer.normalizeValue(actual);
        if (normalized instanceof List<?> list) {
            return new ArrayList<>(list);
        }
        if (normalized == null) {
            return List.of();
        }
        return List.of(normalized);
    }

    /**
     * Spawn a fresh kernel process and wrap it in a KernelConnection.
     */
    private static KernelConnection newConnection() throws IOException {
        // Find the platform-specific binary once; subsequent calls reuse the
        // cached path.
        if (cachedBinaryPath == null) {
            synchronized (KernelBridge.class) {
                if (cachedBinaryPath == null) {
                    cachedBinaryPath = findBinaryPath();
                }
            }
        }
        ProcessBuilder pb = new ProcessBuilder(cachedBinaryPath.toString());
        pb.redirectErrorStream(false);
        Process process = pb.start();
        // Drain stderr asynchronously so the pipe buffer never fills and deadlocks
        // the child process. Mirrors what the C# bridge does with Task.Run.
        Thread stderrDrainer = new Thread(() -> {
            try (BufferedReader err = new BufferedReader(
                    new InputStreamReader(process.getErrorStream(), StandardCharsets.UTF_8))) {
                String line;
                while ((line = err.readLine()) != null) {
                    System.err.println("[comparison-kernel] " + line);
                }
            } catch (IOException ignored) {
                // Stream closed when the process exits — nothing left to drain.
            }
        }, "kernel-stderr-drainer");
        stderrDrainer.setDaemon(true);
        stderrDrainer.start();
        PrintWriter writer = new PrintWriter(
                new OutputStreamWriter(process.getOutputStream(), StandardCharsets.UTF_8),
                /* autoFlush= */ true);
        BufferedReader reader = new BufferedReader(
                new InputStreamReader(process.getInputStream(), StandardCharsets.UTF_8));
        return new KernelConnection(process, writer, reader);
    }

    /**
     * Borrow a connection from the pool, creating one if the pool is empty.
     */
    private static KernelConnection borrowConnection() throws IOException {
        KernelConnection conn = POOL.poll();
        if (conn != null && conn.isAlive()) {
            return conn;
        }
        if (conn != null) {
            conn.destroy(); // stale — discard and create a fresh one
        }
        return newConnection();
    }

    /**
     * Return a connection to the pool. Destroys it if the pool is already full
     * or the process has died.
     */
    private static void returnConnection(KernelConnection conn) {
        if (conn.isAlive() && POOL.offer(conn)) {
            return; // successfully returned
        }
        conn.destroy(); // pool full or process dead — clean up
    }

    /**
     * Run any comparison via the kernel process pool. The expected value is
     * serialised into raw text the kernel can parse (existing file path → file
     * contents; JSON-shaped string → as-is; everything else → BSON-normalised
     * and JSON-encoded). The actual value is normalised into a
     * JSON-serialisable list embedded directly in the request body.
     *
     * <p>Throws IOException if the kernel binary is missing or the round-trip
     * fails; callers should surface the error rather than masking it.
     */
    static ComparisonResult compare(
            Object expected, Object actual, ComparisonOptions options) throws IOException {
        return compare(expected, actual, options, null);
    }

    /**
     * Like {@link #compare(Object, Object, ComparisonOptions)} but also passes
     * a schema descriptor to the kernel for ShouldResemble-style validation.
     */
    static ComparisonResult compare(
            Object expected, Object actual, ComparisonOptions options, Schema schema)
            throws IOException {
        String expectedContent = serializeExpected(expected);
        List<Object> actualPayload = serializeActual(actual);

        Map<String, Object> optsMap = new LinkedHashMap<>();
        optsMap.put("comparisonType",
                options != null && options.comparisonType() != null
                        ? options.comparisonType().name().toLowerCase()
                        : "");
        optsMap.put("ignoreFieldValues",
                options != null && options.ignoreFieldValues() != null
                        ? options.ignoreFieldValues()
                        : List.of());
        if (schema != null) {
            Map<String, Object> schemaMap = new LinkedHashMap<>();
            schemaMap.put("count", schema.getCount());
            schemaMap.put("requiredFields",
                    schema.getRequiredFields() != null ? schema.getRequiredFields() : List.of());
            Map<String, Object> normalizedFV = new LinkedHashMap<>();
            for (Map.Entry<String, Object> e : schema.getFieldValues().entrySet()) {
                normalizedFV.put(e.getKey(), MongoTypeNormalizer.normalizeValue(e.getValue()));
            }
            schemaMap.put("fieldValues", normalizedFV);
            optsMap.put("schema", schemaMap);
        }

        Map<String, Object> request = new LinkedHashMap<>();
        request.put("protocolVersion", PROTOCOL_VERSION);
        request.put("expected", expectedContent);
        request.put("actual", actualPayload);
        request.put("options", optsMap);
        String requestLine = MAPPER.writeValueAsString(request);

        // Borrow an exclusive connection — no lock held during I/O.
        KernelConnection conn = borrowConnection();
        String responseLine;
        try {
            conn.writer.println(requestLine);
            if (conn.writer.checkError()) {
                conn.destroy();
                throw new IOException("Failed to write request to kernel process");
            }
            responseLine = conn.reader.readLine();
            returnConnection(conn);
        } catch (IOException e) {
            conn.destroy();
            throw e;
        }

        if (responseLine == null || responseLine.isBlank()) {
            throw new IOException("Kernel returned empty response");
        }

        @SuppressWarnings("unchecked")
        Map<String, Object> response = MAPPER.readValue(responseLine, Map.class);
        boolean isMatch = Boolean.TRUE.equals(response.get("isMatch"));
        if (isMatch) {
            return ComparisonResult.success();
        }

        @SuppressWarnings("unchecked")
        List<Map<String, Object>> errors = (List<Map<String, Object>>) response.get("errors");
        if (errors != null && !errors.isEmpty()) {
            List<ComparisonError> compErrors = errors.stream()
                    .map(e -> new ComparisonError(
                            String.valueOf(e.getOrDefault("path", "")),
                            String.valueOf(e.getOrDefault("expected", "")),
                            String.valueOf(e.getOrDefault("actual", "")),
                            String.valueOf(e.getOrDefault("message", "Comparison failed"))))
                    .toList();
            return ComparisonResult.failure(compErrors);
        }

        String errorMsg = (String) response.get("error");
        return ComparisonResult.failure(errorMsg != null ? errorMsg : "Comparison failed");
    }

    /**
     * Turn an expected value into raw text the kernel can parse:
     * <ul>
     *   <li>existing file path                → file contents</li>
     *   <li>string starting with "{" or "["  → as-is (MongoDB-syntax content)</li>
     *   <li>everything else                  → BSON-normalised and JSON-encoded</li>
     * </ul>
     */
    static String serializeExpected(Object expected) throws IOException {
        if (expected == null) {
            return "null";
        }
        if (expected instanceof Path pathExpected) {
            return Files.readString(pathExpected, StandardCharsets.UTF_8);
        }
        if (expected instanceof String s) {
            if (looksLikeFilePath(s)) {
                Path resolved = resolveFilePath(s);
                if (Files.exists(resolved)) {
                    return Files.readString(resolved, StandardCharsets.UTF_8);
                }
            }
            String trimmed = s.stripLeading();
            if (trimmed.startsWith("{") || trimmed.startsWith("[")) {
                return s;
            }
            return MAPPER.writeValueAsString(s);
        }
        return MAPPER.writeValueAsString(MongoTypeNormalizer.normalizeValue(expected));
    }

    /**
     * Heuristic: a string could plausibly be a file path if it is single-line,
     * shorter than 1 KiB, and doesn't start with a JSON marker.
     */
    private static boolean looksLikeFilePath(String s) {
        if (s == null || s.isEmpty()) return false;
        if (s.length() > 1024) return false;
        if (s.indexOf('\n') >= 0 || s.indexOf('\r') >= 0) return false;
        String trimmed = s.stripLeading();
        return !trimmed.startsWith("{") && !trimmed.startsWith("[");
    }
}
