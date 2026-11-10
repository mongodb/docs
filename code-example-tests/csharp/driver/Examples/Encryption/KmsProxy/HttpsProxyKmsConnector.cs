namespace Examples.Encryption.KmsProxy;

// :snippet-start: kms-connector
using System;
using System.IO;
using System.Net.Security;
using System.Net.Sockets;
using System.Text;
using System.Threading;
using System.Threading.Tasks;
using MongoDB.Driver.Encryption;

// This connector's TLS handshake with the proxy is separate from the driver's TLS handshake
// with the KMS host, so the proxy never sees KMS traffic in plaintext.
public class HttpsProxyKmsConnector : IKmsConnector
{
    private readonly string _proxyHost;
    private readonly int _proxyPort;

    public HttpsProxyKmsConnector(string proxyHost, int proxyPort)
    {
        _proxyHost = proxyHost;
        _proxyPort = proxyPort;
    }

    public Stream Connect(KmsConnectionContext context, CancellationToken cancellationToken)
    {
        var socket = new Socket(SocketType.Stream, ProtocolType.Tcp);
        IDisposable resourceToDisposeOnFailure = socket;
        try
        {
            socket.Connect(_proxyHost, _proxyPort);
            var proxyStream = new SslStream(new NetworkStream(socket, ownsSocket: true), leaveInnerStreamOpen: false);
            resourceToDisposeOnFailure = proxyStream;
            proxyStream.AuthenticateAsClient(_proxyHost);

            var request = BuildConnectRequest(context.Host, context.Port);
            proxyStream.Write(request, 0, request.Length);
            ReadConnectResponse(proxyStream);

            return proxyStream;
        }
        catch
        {
            resourceToDisposeOnFailure.Dispose();
            throw;
        }
    }

    public async Task<Stream> ConnectAsync(KmsConnectionContext context, CancellationToken cancellationToken)
    {
        var socket = new Socket(SocketType.Stream, ProtocolType.Tcp);
        IDisposable resourceToDisposeOnFailure = socket;
        try
        {
            await socket.ConnectAsync(_proxyHost, _proxyPort);
            var proxyStream = new SslStream(new NetworkStream(socket, ownsSocket: true), leaveInnerStreamOpen: false);
            resourceToDisposeOnFailure = proxyStream;
            await proxyStream.AuthenticateAsClientAsync(_proxyHost);

            var request = BuildConnectRequest(context.Host, context.Port);
            await proxyStream.WriteAsync(request, 0, request.Length, cancellationToken);
            await ReadConnectResponseAsync(proxyStream, cancellationToken);

            return proxyStream;
        }
        catch
        {
            resourceToDisposeOnFailure.Dispose();
            throw;
        }
    }

    private static byte[] BuildConnectRequest(string host, int port) =>
        Encoding.ASCII.GetBytes($"CONNECT {host}:{port} HTTP/1.1\r\nHost: {host}:{port}\r\n\r\n");

    // Reads exactly the proxy's response headers, up to the blank line that terminates them,
    // so the stream lines up with the start of the KMS TLS handshake that the driver performs
    // immediately after this method returns. Any leftover bytes would corrupt that handshake.
    // Throws an IOException if the proxy refuses the tunnel, for example with
    // "407 Proxy Authentication Required".
    private static void ReadConnectResponse(Stream stream)
    {
        var response = new StringBuilder();
        int b;
        while ((b = stream.ReadByte()) != -1)
        {
            response.Append((char)b);
            if (EndsWithBlankLine(response))
            {
                EnsureTunnelEstablished(response.ToString());
                return;
            }
        }
        throw new IOException("The proxy closed the connection before it responded to the CONNECT request.");
    }

    private static async Task ReadConnectResponseAsync(Stream stream, CancellationToken cancellationToken)
    {
        var response = new StringBuilder();
        var buffer = new byte[1];
        while (await stream.ReadAsync(buffer, 0, 1, cancellationToken) != 0)
        {
            response.Append((char)buffer[0]);
            if (EndsWithBlankLine(response))
            {
                EnsureTunnelEstablished(response.ToString());
                return;
            }
        }
        throw new IOException("The proxy closed the connection before it responded to the CONNECT request.");
    }

    private static bool EndsWithBlankLine(StringBuilder response) =>
        response.Length >= 4 &&
        response[response.Length - 4] == '\r' && response[response.Length - 3] == '\n' &&
        response[response.Length - 2] == '\r' && response[response.Length - 1] == '\n';

    private static void EnsureTunnelEstablished(string response)
    {
        var statusLine = response.Substring(0, response.IndexOf("\r\n", StringComparison.Ordinal));
        var statusLineParts = statusLine.Split(' ');
        if (statusLineParts.Length < 2 || statusLineParts[1] != "200")
        {
            // IOException tells the driver this is a connection failure that it can retry.
            throw new IOException($"The proxy did not establish a tunnel: {statusLine}");
        }
    }
}
// :snippet-end:
