// Code examples for the Specify Connection Options page. Each region is
// included on the page via literalinclude with start/end markers.
// These examples intentionally do not connect to a deployment.

import { MongoClient } from 'mongodb';

const uri = 'mongodb://localhost:27017/';
const replicaSetUri = 'mongodb://localhost:27017/?replicaSet=rs0';

// start-uri-connect-options
const uriClient = new MongoClient(
  'mongodb://localhost:27017/?connectTimeoutMS=60000&tls=true'
);
// end-uri-connect-options

// start-client-connect-options
const optionsClient = new MongoClient(uri, {
  connectTimeoutMS: 60000,
  tls: true,
});
// end-client-connect-options

// start-uri-direct-connection
const directConnectionUriClient = new MongoClient(
  'mongodb://localhost:27017/?directConnection=true'
);
// end-uri-direct-connection

// start-client-direct-connection
const directConnectionClient = new MongoClient(uri, {
  directConnection: true,
});
// end-client-direct-connection

// start-uri-replica-set
const replicaSetUriClient = new MongoClient(
  'mongodb://localhost:27017/?replicaSet=rs0'
);
// end-uri-replica-set

// start-client-replica-set
const replicaSetClient = new MongoClient(uri, {
  replicaSet: 'rs0',
});
// end-client-replica-set

// start-uri-tls
const tlsUriClient = new MongoClient('mongodb://localhost:27017/?tls=true');
// end-uri-tls

// start-client-tls
const tlsClient = new MongoClient(uri, {
  tls: true,
});
// end-client-tls

// start-uri-tls-ca-file
const tlsCaFileUriClient = new MongoClient(
  'mongodb://localhost:27017/?tls=true&tlsCAFile=/path/to/ca.pem'
);
// end-uri-tls-ca-file

// start-client-tls-ca-file
const tlsCaFileClient = new MongoClient(uri, {
  tls: true,
  tlsCAFile: '/path/to/ca.pem',
});
// end-client-tls-ca-file

// start-uri-tls-cert-key-file
const tlsCertKeyFileUriClient = new MongoClient(
  'mongodb://localhost:27017/?tls=true&tlsCertificateKeyFile=/path/to/client.pem'
);
// end-uri-tls-cert-key-file

// start-client-tls-cert-key-file
const tlsCertKeyFileClient = new MongoClient(uri, {
  tls: true,
  tlsCertificateKeyFile: '/path/to/client.pem',
});
// end-client-tls-cert-key-file

// start-uri-tls-cert-key-password
const tlsCertKeyPasswordUriClient = new MongoClient(
  'mongodb://localhost:27017/?tls=true&tlsCertificateKeyFile=/path/to/client.pem&tlsCertificateKeyFilePassword=iperLuv60'
);
// end-uri-tls-cert-key-password

// start-client-tls-cert-key-password
const tlsCertKeyPasswordClient = new MongoClient(uri, {
  tls: true,
  tlsCertificateKeyFile: '/path/to/client.pem',
  tlsCertificateKeyFilePassword: 'iperLuv60',
});
// end-client-tls-cert-key-password

// start-uri-tls-allow-invalid-certs
const tlsAllowInvalidCertsUriClient = new MongoClient(
  'mongodb://localhost:27017/?tls=true&tlsAllowInvalidCertificates=true'
);
// end-uri-tls-allow-invalid-certs

// start-client-tls-allow-invalid-certs
const tlsAllowInvalidCertsClient = new MongoClient(uri, {
  tls: true,
  tlsAllowInvalidCertificates: true,
});
// end-client-tls-allow-invalid-certs

// start-uri-tls-allow-invalid-hostnames
const tlsAllowInvalidHostnamesUriClient = new MongoClient(
  'mongodb://localhost:27017/?tls=true&tlsAllowInvalidHostnames=true'
);
// end-uri-tls-allow-invalid-hostnames

// start-client-tls-allow-invalid-hostnames
const tlsAllowInvalidHostnamesClient = new MongoClient(uri, {
  tls: true,
  tlsAllowInvalidHostnames: true,
});
// end-client-tls-allow-invalid-hostnames

// start-uri-tls-insecure
const tlsInsecureUriClient = new MongoClient(
  'mongodb://localhost:27017/?tls=true&tlsInsecure=true'
);
// end-uri-tls-insecure

// start-client-tls-insecure
const tlsInsecureClient = new MongoClient(uri, {
  tls: true,
  tlsInsecure: true,
});
// end-client-tls-insecure

// start-uri-connect-timeout
const connectTimeoutUriClient = new MongoClient(
  'mongodb://localhost:27017/?connectTimeoutMS=60000'
);
// end-uri-connect-timeout

// start-client-connect-timeout
const connectTimeoutClient = new MongoClient(uri, {
  connectTimeoutMS: 60000,
});
// end-client-connect-timeout

// start-uri-socket-timeout
const socketTimeoutUriClient = new MongoClient(
  'mongodb://localhost:27017/?socketTimeoutMS=60000'
);
// end-uri-socket-timeout

// start-client-socket-timeout
const socketTimeoutClient = new MongoClient(uri, {
  socketTimeoutMS: 60000,
});
// end-client-socket-timeout

// start-uri-server-selection-timeout
const serverSelectionTimeoutUriClient = new MongoClient(
  'mongodb://localhost:27017/?serverSelectionTimeoutMS=10000'
);
// end-uri-server-selection-timeout

// start-client-server-selection-timeout
const serverSelectionTimeoutClient = new MongoClient(uri, {
  serverSelectionTimeoutMS: 10000,
});
// end-client-server-selection-timeout

// start-uri-compressors
const compressorsUriClient = new MongoClient(
  'mongodb://localhost:27017/?compressors=snappy,zlib,zstd'
);
// end-uri-compressors

// start-client-compressors
const compressorsClient = new MongoClient(uri, {
  compressors: ['snappy', 'zlib', 'zstd'],
});
// end-client-compressors

// start-uri-zlib-level
const zlibLevelUriClient = new MongoClient(
  'mongodb://localhost:27017/?compressors=zlib&zlibCompressionLevel=6'
);
// end-uri-zlib-level

// start-client-zlib-level
const zlibLevelClient = new MongoClient(uri, {
  compressors: ['zlib'],
  zlibCompressionLevel: 6,
});
// end-client-zlib-level

// start-uri-max-pool-size
const maxPoolSizeUriClient = new MongoClient(
  'mongodb://localhost:27017/?maxPoolSize=150'
);
// end-uri-max-pool-size

// start-client-max-pool-size
const maxPoolSizeClient = new MongoClient(uri, {
  maxPoolSize: 150,
});
// end-client-max-pool-size

// start-uri-min-pool-size
const minPoolSizeUriClient = new MongoClient(
  'mongodb://localhost:27017/?minPoolSize=10'
);
// end-uri-min-pool-size

// start-client-min-pool-size
const minPoolSizeClient = new MongoClient(uri, {
  minPoolSize: 10,
});
// end-client-min-pool-size

// start-uri-max-idle-time
const maxIdleTimeUriClient = new MongoClient(
  'mongodb://localhost:27017/?maxIdleTimeMS=30000'
);
// end-uri-max-idle-time

// start-client-max-idle-time
const maxIdleTimeClient = new MongoClient(uri, {
  maxIdleTimeMS: 30000,
});
// end-client-max-idle-time

// start-uri-max-connecting
const maxConnectingUriClient = new MongoClient(
  'mongodb://localhost:27017/?maxConnecting=5'
);
// end-uri-max-connecting

// start-client-max-connecting
const maxConnectingClient = new MongoClient(uri, {
  maxConnecting: 5,
});
// end-client-max-connecting

// start-uri-wait-queue-timeout
const waitQueueTimeoutUriClient = new MongoClient(
  'mongodb://localhost:27017/?waitQueueTimeoutMS=2000'
);
// end-uri-wait-queue-timeout

// start-client-wait-queue-timeout
const waitQueueTimeoutClient = new MongoClient(uri, {
  waitQueueTimeoutMS: 2000,
});
// end-client-wait-queue-timeout

// start-uri-write-concern
const writeConcernUriClient = new MongoClient(
  'mongodb://localhost:27017/?w=majority&journal=true&wtimeoutMS=1000'
);
// end-uri-write-concern

// start-client-write-concern
const writeConcernClient = new MongoClient(uri, {
  writeConcern: { w: 'majority', journal: true, wtimeoutMS: 1000 },
});
// end-client-write-concern

// start-uri-read-concern-level
const readConcernLevelUriClient = new MongoClient(
  'mongodb://localhost:27017/?readConcernLevel=majority'
);
// end-uri-read-concern-level

// start-client-read-concern-level
const readConcernLevelClient = new MongoClient(uri, {
  readConcernLevel: 'majority',
});
// end-client-read-concern-level

// start-uri-read-preference
const readPreferenceUriClient = new MongoClient(
  'mongodb://localhost:27017/?readPreference=secondaryPreferred'
);
// end-uri-read-preference

// start-client-read-preference
const readPreferenceClient = new MongoClient(uri, {
  readPreference: 'secondaryPreferred',
});
// end-client-read-preference

// start-uri-read-preference-tags
const readPreferenceTagsUriClient = new MongoClient(
  replicaSetUri +
    '&readPreference=secondaryPreferred&readPreferenceTags=dc:ny,rack:1'
);
// end-uri-read-preference-tags

// start-client-read-preference-tags
const readPreferenceTagsClient = new MongoClient(replicaSetUri, {
  readPreference: 'secondaryPreferred',
  readPreferenceTags: [{ dc: 'ny', rack: '1' }],
});
// end-client-read-preference-tags

// start-uri-max-staleness-seconds
const maxStalenessUriClient = new MongoClient(
  replicaSetUri + '&readPreference=secondaryPreferred&maxStalenessSeconds=120'
);
// end-uri-max-staleness-seconds

// start-client-max-staleness-seconds
const maxStalenessClient = new MongoClient(replicaSetUri, {
  readPreference: 'secondaryPreferred',
  maxStalenessSeconds: 120,
});
// end-client-max-staleness-seconds

// start-uri-local-threshold
const localThresholdUriClient = new MongoClient(
  'mongodb://localhost:27017/?localThresholdMS=30'
);
// end-uri-local-threshold

// start-client-local-threshold
const localThresholdClient = new MongoClient(uri, {
  localThresholdMS: 30,
});
// end-client-local-threshold

// start-uri-auth-mechanism
const authMechanismUriClient = new MongoClient(
  'mongodb://user:password@localhost:27017/?authSource=admin&authMechanism=SCRAM-SHA-256'
);
// end-uri-auth-mechanism

// start-client-auth-mechanism
const authMechanismClient = new MongoClient(
  'mongodb://user:password@localhost:27017/',
  {
    authSource: 'admin',
    authMechanism: 'SCRAM-SHA-256',
  }
);
// end-client-auth-mechanism

// start-uri-auth-mechanism-properties
const authMechanismPropertiesUriClient = new MongoClient(
  'mongodb://<Kerberos principal>@localhost:27017/?authMechanism=GSSAPI&authMechanismProperties=SERVICE_NAME:<service name>'
);
// end-uri-auth-mechanism-properties

// start-client-auth-mechanism-properties
const authMechanismPropertiesClient = new MongoClient(
  'mongodb://<Kerberos principal>@localhost:27017/',
  {
    authMechanism: 'GSSAPI',
    authMechanismProperties: {
      SERVICE_NAME: '<service name>',
    },
  }
);
// end-client-auth-mechanism-properties

// start-uri-auth-source
const authSourceUriClient = new MongoClient(
  'mongodb://user:password@localhost:27017/?authSource=admin'
);
// end-uri-auth-source

// start-client-auth-source
const authSourceClient = new MongoClient(
  'mongodb://user:password@localhost:27017/',
  {
    authSource: 'admin',
  }
);
// end-client-auth-source

// start-uri-heartbeat-frequency
const heartbeatFrequencyUriClient = new MongoClient(
  'mongodb://localhost:27017/?heartbeatFrequencyMS=10000'
);
// end-uri-heartbeat-frequency

// start-client-heartbeat-frequency
const heartbeatFrequencyClient = new MongoClient(uri, {
  heartbeatFrequencyMS: 10000,
});
// end-client-heartbeat-frequency

// start-uri-server-monitoring-mode
const serverMonitoringModeUriClient = new MongoClient(
  'mongodb://localhost:27017/?serverMonitoringMode=poll'
);
// end-uri-server-monitoring-mode

// start-client-server-monitoring-mode
const serverMonitoringModeClient = new MongoClient(uri, {
  serverMonitoringMode: 'poll',
});
// end-client-server-monitoring-mode

// start-uri-retry-reads
const retryReadsUriClient = new MongoClient(
  'mongodb://localhost:27017/?retryReads=false'
);
// end-uri-retry-reads

// start-client-retry-reads
const retryReadsClient = new MongoClient(uri, {
  retryReads: false,
});
// end-client-retry-reads

// start-uri-retry-writes
const retryWritesUriClient = new MongoClient(
  'mongodb://localhost:27017/?retryWrites=false'
);
// end-uri-retry-writes

// start-client-retry-writes
const retryWritesClient = new MongoClient(uri, {
  retryWrites: false,
});
// end-client-retry-writes

// start-uri-app-name
const appNameUriClient = new MongoClient(
  'mongodb://localhost:27017/?appName=docsExample'
);
// end-uri-app-name

// start-client-app-name
const appNameClient = new MongoClient(uri, {
  appName: 'docsExample',
});
// end-client-app-name

// start-uri-load-balanced
const loadBalancedUriClient = new MongoClient(
  'mongodb://localhost:27017/?loadBalanced=true'
);
// end-uri-load-balanced

// start-uri-srv-max-hosts
const srvMaxHostsUriClient = new MongoClient(
  'mongodb+srv://cluster.example.mongodb.net/?srvMaxHosts=10'
);
// end-uri-srv-max-hosts

// start-client-srv-max-hosts
const srvMaxHostsClient = new MongoClient(
  'mongodb+srv://cluster.example.mongodb.net/',
  {
    srvMaxHosts: 10,
  }
);
// end-client-srv-max-hosts

// start-uri-srv-service-name
const srvServiceNameUriClient = new MongoClient(
  'mongodb+srv://cluster.example.mongodb.net/?srvServiceName=docsExample'
);
// end-uri-srv-service-name

// start-client-srv-service-name
const srvServiceNameClient = new MongoClient(
  'mongodb+srv://cluster.example.mongodb.net/',
  {
    srvServiceName: 'docsExample',
  }
);
// end-client-srv-service-name

// start-uri-auto-select-family
const autoSelectFamilyUriClient = new MongoClient(
  'mongodb://localhost:27017/?autoSelectFamily=false'
);
// end-uri-auto-select-family

// start-client-auto-select-family
const autoSelectFamilyClient = new MongoClient(uri, {
  autoSelectFamily: false,
});
// end-client-auto-select-family

// start-uri-auto-select-family-attempt-timeout
const autoSelectFamilyAttemptTimeoutUriClient = new MongoClient(
  'mongodb://localhost:27017/?autoSelectFamilyAttemptTimeout=300'
);
// end-uri-auto-select-family-attempt-timeout

// start-client-auto-select-family-attempt-timeout
const autoSelectFamilyAttemptTimeoutClient = new MongoClient(uri, {
  autoSelectFamilyAttemptTimeout: 300,
});
// end-client-auto-select-family-attempt-timeout

// start-uri-utf8-validation
const utf8ValidationUriClient = new MongoClient(
  'mongodb://localhost:27017/?enableUtf8Validation=false'
);
// end-uri-utf8-validation

// start-client-utf8-validation
const utf8ValidationClient = new MongoClient(uri, {
  enableUtf8Validation: false,
});
// end-client-utf8-validation

// start-uri-proxy
const proxyUriClient = new MongoClient(
  'mongodb://localhost:27017/?proxyHost=proxy.example.com&proxyPort=4040&proxyUsername=proxyUser&proxyPassword=docsExample'
);
// end-uri-proxy

// start-client-proxy
const proxyClient = new MongoClient(uri, {
  proxyHost: 'proxy.example.com',
  proxyPort: 4040,
  proxyUsername: 'proxyUser',
  proxyPassword: 'docsExample',
});
// end-client-proxy
