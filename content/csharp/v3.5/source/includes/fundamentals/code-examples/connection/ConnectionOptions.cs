using System.Net.Security;
using System.Security.Authentication;
using System.Security.Cryptography.X509Certificates;
using System.Text;
using Microsoft.Extensions.Logging;
using MongoDB.Driver;
using MongoDB.Driver.Core.Compression;
using MongoDB.Driver.Core.Configuration;
using MongoDB.Driver.Core.Events;

namespace Connection;

public class ConnectionOptions
{
    public void ConnectionUriExample()
    {
        // start-connection-uri
        const string uri = "mongodb+srv:/localhost:27017/?connectTimeoutMS=60000&tls=true";
        // end-connection-uri
    }

    public void MongoClientSettingsExample()
    {
        // start-mongo-client-settings
        var settings = new MongoClientSettings()
        {
            Scheme = ConnectionStringScheme.MongoDBPlusSrv,
            Server = new MongoServerAddress("localhost", 27017),
            ConnectTimeout = TimeSpan.FromMilliseconds(60000),
            UseTls = true
        };

        var client = new MongoClient(settings);
        // end-mongo-client-settings
    }

    public void FromConnectionStringExample()
    {
        // start-from-connection-string
        const string connectionUri = "mongodb+srv://localhost:27017/?connectTimeoutMS=60000&tls=true";
        var settings = MongoClientSettings.FromConnectionString(connectionUri);
        settings.ServerApi = new ServerApi(ServerApiVersion.V1);
        
        var client = new MongoClient(settings);
        // end-from-connection-string
    }

    public void FromUrlExample()
    {
        // start-from-url
        const string connectionUri = "mongodb+srv://localhost:27017/?connectTimeoutMS=60000&tls=true";
        var url = new MongoUrl(connectionUri);
        var settings = MongoClientSettings.FromUrl(url);
        settings.ServerApi = new ServerApi(ServerApiVersion.V1);
        
        var client = new MongoClient(settings);
        // end-from-url
    }
    
    public void MongoUrlBuilderExample()
    {
        // start-mongo-url-builder
        const string connectionUri = "mongodb+srv://localhost:27017/?connectTimeoutMS=60000&tls=true";
        var builder = new MongoUrlBuilder(connectionUri)
        {
            ServerMonitoringMode = MongoDB.Driver.Core.Servers.ServerMonitoringMode.Stream
        };
        var url = builder.ToMongoUrl();
        
        var client = new MongoClient(url);
        // end-mongo-url-builder
    }
    
    public void ReplicaSetName()
    {
        // start-settings-replica-set-name
        var settings = new MongoClientSettings
        {
            ReplicaSetName = "yourReplicaSet",
        };
        // end-settings-replica-set-name

        // start-builder-replica-set-name
        var builder = new MongoUrlBuilder
        {
            ReplicaSetName = "yourReplicaSet",
        };
        // end-builder-replica-set-name
    }

    public void DirectConnection()
    {
        // start-settings-direct-connection
        var settings = new MongoClientSettings
        {
            DirectConnection = true,
        };
        // end-settings-direct-connection

        // start-builder-direct-connection
        var builder = new MongoUrlBuilder
        {
            DirectConnection = true,
        };
        // end-builder-direct-connection
    }

    public void AllowInsecureTls()
    {
        // start-settings-allow-insecure-tls
        var settings = new MongoClientSettings
        {
            AllowInsecureTls = true,
        };
        // end-settings-allow-insecure-tls

        // start-builder-allow-insecure-tls
        var builder = new MongoUrlBuilder
        {
            AllowInsecureTls = true,
        };
        // end-builder-allow-insecure-tls
    }

    public void UseTls()
    {
        // start-settings-use-tls
        var settings = new MongoClientSettings
        {
            UseTls = true,
        };
        // end-settings-use-tls

        // start-builder-use-tls
        var builder = new MongoUrlBuilder
        {
            UseTls = true,
        };
        // end-builder-use-tls
    }

    public void ConnectTimeout()
    {
        // start-settings-connect-timeout
        var settings = new MongoClientSettings
        {
            ConnectTimeout = TimeSpan.FromSeconds(60),
        };
        // end-settings-connect-timeout

        // start-builder-connect-timeout
        var builder = new MongoUrlBuilder
        {
            ConnectTimeout = TimeSpan.FromSeconds(60),
        };
        // end-builder-connect-timeout
    }

    public void SocketTimeout()
    {
        // start-settings-socket-timeout
        var settings = new MongoClientSettings
        {
            SocketTimeout = TimeSpan.FromSeconds(60),
        };
        // end-settings-socket-timeout

        // start-builder-socket-timeout
        var builder = new MongoUrlBuilder
        {
            SocketTimeout = TimeSpan.FromSeconds(60),
        };
        // end-builder-socket-timeout
    }

    public void Compressors()
    {
        // start-settings-compressors
        var settings = new MongoClientSettings
        {
            Compressors = new List<CompressorConfiguration>()
            {
                new(CompressorType.Zlib),
                new(CompressorType.Snappy)
            }
        };
        // end-settings-compressors

        // start-builder-compressors
        var builder = new MongoUrlBuilder
        {
            Compressors = new List<CompressorConfiguration>()
            {
                new(CompressorType.Zlib),
                new(CompressorType.Snappy)
            }
        };
        // end-builder-compressors
    }

    public void MaxConnecting()
    {
        // start-settings-max-connecting
        var settings = new MongoClientSettings
        {
            MaxConnecting = 3,
        };
        // end-settings-max-connecting

        // start-builder-max-connecting
        var builder = new MongoUrlBuilder
        {
            MaxConnecting = 3,
        };
        // end-builder-max-connecting
    }

    public void MaxConnectionIdleTime()
    {
        // start-settings-max-connection-idle-time
        var settings = new MongoClientSettings
        {
            MaxConnectionIdleTime = TimeSpan.FromMinutes(8),
        };
        // end-settings-max-connection-idle-time

        // start-builder-max-connection-idle-time
        var builder = new MongoUrlBuilder
        {
            MaxConnectionIdleTime = TimeSpan.FromMinutes(8),
        };
        // end-builder-max-connection-idle-time
    }

    public void MaxConnectionLifeTime()
    {
        // start-settings-max-connection-life-time
        var settings = new MongoClientSettings
        {
            MaxConnectionLifeTime = TimeSpan.FromMinutes(40),
        };
        // end-settings-max-connection-life-time

        // start-builder-max-connection-life-time
        var builder = new MongoUrlBuilder
        {
            MaxConnectionLifeTime = TimeSpan.FromMinutes(40),
        };
        // end-builder-max-connection-life-time
    }

    public void MaxConnectionPoolSize()
    {
        // start-settings-max-connection-pool-size
        var settings = new MongoClientSettings
        {
            MaxConnectionPoolSize = 150,
        };
        // end-settings-max-connection-pool-size

        // start-builder-max-connection-pool-size
        var builder = new MongoUrlBuilder
        {
            MaxConnectionPoolSize = 150,
        };
        // end-builder-max-connection-pool-size
    }

    public void MinConnectionPoolSize()
    {
        // start-settings-min-connection-pool-size
        var settings = new MongoClientSettings
        {
            MinConnectionPoolSize = 3,
        };
        // end-settings-min-connection-pool-size

        // start-builder-min-connection-pool-size
        var builder = new MongoUrlBuilder
        {
            MinConnectionPoolSize = 3,
        };
        // end-builder-min-connection-pool-size
    }

    public void WaitQueueTimeout()
    {
        // start-settings-wait-queue-timeout
        var settings = new MongoClientSettings
        {
            WaitQueueTimeout = TimeSpan.FromSeconds(30),
        };
        // end-settings-wait-queue-timeout

        // start-builder-wait-queue-timeout
        var builder = new MongoUrlBuilder
        {
            WaitQueueTimeout = TimeSpan.FromSeconds(30),
        };
        // end-builder-wait-queue-timeout
    }

    public void ReadConcern()
    {
        // start-settings-read-concern
        var settings = new MongoClientSettings
        {
            ReadConcern = MongoDB.Driver.ReadConcern.Local,
        };
        // end-settings-read-concern
    }

    public void ReadConcernLevel()
    {
        // start-builder-read-concern-level
        var builder = new MongoUrlBuilder
        {
            ReadConcernLevel = MongoDB.Driver.ReadConcernLevel.Local,
        };
        // end-builder-read-concern-level
    }

    public void ReadPreference()
    {
        // start-settings-read-preference
        var settings = new MongoClientSettings
        {
            ReadPreference = MongoDB.Driver.ReadPreference.PrimaryPreferred,
        };
        // end-settings-read-preference

        // start-builder-read-preference
        var builder = new MongoUrlBuilder
        {
            ReadPreference = MongoDB.Driver.ReadPreference.PrimaryPreferred,
        };
        // end-builder-read-preference
    }

    public void Credential()
    {
        // start-settings-credential
        var settings = new MongoClientSettings
        {
            Credential = MongoCredential.CreatePlainCredential(
                databaseName: "admin",
                username: "user",
                password: "password"
            )
        };
        // end-settings-credential
    }

    public void BuilderAuthentication()
    {
        // start-builder-authentication
        var builder = new MongoUrlBuilder
        {
            AuthenticationMechanism = "GSSAPI",
            AuthenticationMechanismProperties = new Dictionary<string, string>
            {
                { "SERVICE_NAME", "other" },
                { "CANONICALIZE_HOST_NAME", "true" }
            },
            AuthenticationSource = "db"
        };
        // end-builder-authentication
    }

    public void HeartbeatInterval()
    {
        // start-settings-heartbeat-interval
        var settings = new MongoClientSettings
        {
            HeartbeatInterval = TimeSpan.FromSeconds(5)
        };
        // end-settings-heartbeat-interval

        // start-builder-heartbeat-interval
        var builder = new MongoUrlBuilder
        {
            HeartbeatInterval = TimeSpan.FromSeconds(5)
        };
        // end-builder-heartbeat-interval
    }

    public void HeartbeatTimeout()
    {
        // start-settings-heartbeat-timeout
        var settings = new MongoClientSettings
        {
            HeartbeatTimeout = TimeSpan.FromSeconds(5)
        };
        // end-settings-heartbeat-timeout

        // start-builder-heartbeat-timeout
        var builder = new MongoUrlBuilder
        {
            HeartbeatTimeout = TimeSpan.FromSeconds(5)
        };
        // end-builder-heartbeat-timeout
    }

    public void LocalThreshold()
    {
        // start-settings-local-threshold
        var settings = new MongoClientSettings
        {
            LocalThreshold = TimeSpan.FromSeconds(15)
        };
        // end-settings-local-threshold

        // start-builder-local-threshold
        var builder = new MongoUrlBuilder
        {
            LocalThreshold = TimeSpan.FromSeconds(15)
        };
        // end-builder-local-threshold
    }

    public void ServerSelectionTimeout()
    {
        // start-settings-server-selection-timeout
        var settings = new MongoClientSettings
        {
            ServerSelectionTimeout = TimeSpan.FromSeconds(30)
        };
        // end-settings-server-selection-timeout

        // start-builder-server-selection-timeout
        var builder = new MongoUrlBuilder
        {
            ServerSelectionTimeout = TimeSpan.FromSeconds(30)
        };
        // end-builder-server-selection-timeout
    }

    public void ApplicationName()
    {
        // start-settings-application-name
        var settings = new MongoClientSettings
        {
            ApplicationName = "yourAppName",
        };
        // end-settings-application-name

        // start-builder-application-name
        var builder = new MongoUrlBuilder
        {
            ApplicationName = "yourAppName",
        };
        // end-builder-application-name
    }

    public void Ipv6()
    {
        // start-settings-ipv6
        var settings = new MongoClientSettings
        {
            IPv6 = true,
        };
        // end-settings-ipv6

        // start-builder-ipv6
        var builder = new MongoUrlBuilder
        {
            IPv6 = true,
        };
        // end-builder-ipv6
    }

    public void LoadBalanced()
    {
        // start-settings-load-balanced
        var settings = new MongoClientSettings
        {
            LoadBalanced = true,
        };
        // end-settings-load-balanced

        // start-builder-load-balanced
        var builder = new MongoUrlBuilder
        {
            LoadBalanced = true,
        };
        // end-builder-load-balanced
    }

    public void RetryReads()
    {
        // start-settings-retry-reads
        var settings = new MongoClientSettings
        {
            RetryReads = false,
        };
        // end-settings-retry-reads

        // start-builder-retry-reads
        var builder = new MongoUrlBuilder
        {
            RetryReads = false,
        };
        // end-builder-retry-reads
    }

    public void RetryWrites()
    {
        // start-settings-retry-writes
        var settings = new MongoClientSettings
        {
            RetryWrites = false,
        };
        // end-settings-retry-writes

        // start-builder-retry-writes
        var builder = new MongoUrlBuilder
        {
            RetryWrites = false,
        };
        // end-builder-retry-writes
    }

    public void Scheme()
    {
        // start-settings-scheme
        var settings = new MongoClientSettings
        {
            Scheme = ConnectionStringScheme.MongoDBPlusSrv,
        };
        // end-settings-scheme

        // start-builder-scheme
        var builder = new MongoUrlBuilder
        {
            Scheme = ConnectionStringScheme.MongoDBPlusSrv,
        };
        // end-builder-scheme
    }

    public void Server()
    {
        // start-settings-server
        var settings = new MongoClientSettings
        {
            Server = new MongoServerAddress("localhost", 27017)
        };
        // end-settings-server

        // start-builder-server
        var builder = new MongoUrlBuilder
        {
            Server = new MongoServerAddress("localhost", 27017)
        };
        // end-builder-server
    }

    public void ServerMonitoringMode()
    {
        // start-settings-server-monitoring-mode
        var settings = new MongoClientSettings
        {
            ServerMonitoringMode = MongoDB.Driver.Core.Servers.ServerMonitoringMode.Stream
        };
        // end-settings-server-monitoring-mode

        // start-builder-server-monitoring-mode
        var builder = new MongoUrlBuilder
        {
            ServerMonitoringMode = MongoDB.Driver.Core.Servers.ServerMonitoringMode.Stream
        };
        // end-builder-server-monitoring-mode
    }

    public void Servers()
    {
        // start-settings-servers
        var settings = new MongoClientSettings
        {
            Servers = new List<MongoServerAddress>()
            {
                new ("localhost", 27017),
                new ("localhost", 27018)
            }
        };
        // end-settings-servers

        // start-builder-servers
        var builder = new MongoUrlBuilder
        {
            Servers = new List<MongoServerAddress>()
            {
                new ("localhost", 27017),
                new ("localhost", 27018)
            }
        };
        // end-builder-servers
    }

    public void SrvMaxHosts()
    {
        // start-settings-srv-max-hosts
        var settings = new MongoClientSettings
        {
            SrvMaxHosts = 5
        };
        // end-settings-srv-max-hosts

        // start-builder-srv-max-hosts
        var builder = new MongoUrlBuilder
        {
            SrvMaxHosts = 5
        };
        // end-builder-srv-max-hosts
    }

    public void Journal()
    {
        // start-builder-journal
        var builder = new MongoUrlBuilder
        {
            Journal = true 
        };
        // end-builder-journal
    }
    
    public void TlsDisableCertificateRevocationCheck()
    {
        // start-builder-tls-disable
        var builder = new MongoUrlBuilder
        {
            TlsDisableCertificateRevocationCheck = true
        };
        // end-builder-tls-disable
    }
    
    public void W()
    {
        // start-builder-w
        var builder = new MongoUrlBuilder
        {
            W = 2 
        };
        // end-builder-w
    }
    
    public void WTimeout()
    {
        // start-builder-w-timeout
        var builder = new MongoUrlBuilder
        {
            WTimeout = TimeSpan.FromSeconds(5)
        };
        // end-builder-w-timeout
    }
    
    public void UsernamePassword()
    {
        // start-builder-username-password
        var builder = new MongoUrlBuilder
        {
            Username = "user",
            Password = "password"
        };
        // end-builder-username-password
    }
    
    public void FSync()
    {
        // start-builder-fsync
        var builder = new MongoUrlBuilder
        {
            FSync = true 
        };
        // end-builder-fsync
    }
    
    public void DatabaseName()
    {
        // start-builder-database-name
        var builder = new MongoUrlBuilder
        {
            DatabaseName = "test_database"
        };
        // end-builder-database-name
    }
    
    public void SrvServiceName()
    {
        // start-settings-srv-service-name
        var settings = new MongoClientSettings
        {
            SrvServiceName = "yourServiceName"
        };
        // end-settings-srv-service-name

        // start-builder-srv-service-name
        var builder = new MongoUrlBuilder
        {
            SrvServiceName = "yourServiceName"
        };
        // end-builder-srv-service-name
    }

    public void LibraryInfo()
    {
        // start-settings-library-info
        var settings = new MongoClientSettings
        {
            LibraryInfo = new LibraryInfo("customLibraryName", "1.0.0")
        };
        // end-settings-library-info
    }
    
    public void TranslationOptions()
    {
        // start-settings-translation-options
        var settings = new MongoClientSettings
        {
            TranslationOptions = new ExpressionTranslationOptions()
            {
                CompatibilityLevel = ServerVersion.Server80,
                EnableClientSideProjections = true
            }
        };
        // end-settings-translation-options
    }

    public void LoggingSettings()
    {
        // start-settings-logging-settings
        var settings = new MongoClientSettings
        {
            LoggingSettings = new LoggingSettings(
                LoggerFactory.Create(l =>
                    l.SetMinimumLevel(LogLevel.Debug)))
        };
        // end-settings-logging-settings
    }

    public void ServerApi()
    {
        // start-settings-server-api
        var settings = new MongoClientSettings
        {
            ServerApi = new ServerApi(
                ServerApiVersion.V1,
                strict: true,
                deprecationErrors: true),
        };
        // end-settings-server-api
    }

    public void ReadEncoding()
    {
        // start-settings-read-encoding
        var settings = new MongoClientSettings
        {
            ReadEncoding = new UTF8Encoding(
                encoderShouldEmitUTF8Identifier: false,
                throwOnInvalidBytes: true)
        };
        // end-settings-read-encoding
    }

    public void WriteEncoding()
    {
        // start-settings-write-encoding
        var settings = new MongoClientSettings
        {
            WriteEncoding = new UTF8Encoding(
                encoderShouldEmitUTF8Identifier: false,
                throwOnInvalidBytes: true)
        };
        // end-settings-write-encoding
    }
    
    public void AutoEncryptionOptions()
    {
        // start-settings-auto-encryption-options
        var settings = new MongoClientSettings
        {
            AutoEncryptionOptions = new AutoEncryptionOptions(
                keyVaultNamespace: new CollectionNamespace(
                    databaseName: "keyvault",
                    collectionName: "datakeys"),
                kmsProviders: new Dictionary<string, IReadOnlyDictionary<string, object>> ()
                {
                    { "local", new Dictionary<string, object> () { { "key", "<base64-encoded-key>" } } }
                }
            ),
        };
        // end-settings-auto-encryption-options
    }

    public void ClusterConfigurator()
    {
        // start-settings-cluster-configurator
        var settings = new MongoClientSettings
        {
            ClusterConfigurator = builder =>
            {
                builder
                    .Subscribe<ClusterOpenedEvent>(e =>
                    {
                        Console.WriteLine($"Cluster opened: Cluster ID = {e.ClusterId}");
                    })
                    .Subscribe<ClusterDescriptionChangedEvent>(e =>
                    {
                        Console.WriteLine($"Cluster description changed: {e.NewDescription}");
                    });
            }
        };
        // end-settings-cluster-configurator
    }

    public void SslSettings()
    {
        // start-settings-ssl-settings
        var settings = new MongoClientSettings();
        settings.SslSettings = new SslSettings()
        {
            CheckCertificateRevocation = false,
            ClientCertificateSelectionCallback = new LocalCertificateSelectionCallback() { ... },
            ClientCertificates = new List<X509Certificate>() { ... },
            EnabledSslProtocols = SslProtocols.Tls13,
            ServerCertificateValidationCallback = new RemoteCertificateValidationCallback() { ... }
        };
        // end-settings-ssl-settings
    }

    public void IsFrozen()
    {
        // start-settings-is-frozen
        var settings = new MongoClientSettings();
        if (!settings.IsFrozen)
        {
            settings.RetryReads = false;
        }
        // end-settings-is-frozen
    }

    public void WriteConcern()
    {
        // start-settings-write-concern
        var settings = new MongoClientSettings();
        settings.WriteConcern = MongoDB.Driver.WriteConcern.Acknowledged;
        settings.WriteConcern = new WriteConcern(
            w: 1,
            wTimeout: new TimeSpan(0, 0, 0, 30, 0),
            fsync: true,
            journal: true
        );
        // end-settings-write-concern
    }
}