package main

import (
	"context"
	"crypto/tls"
	"time"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"go.mongodb.org/mongo-driver/v2/mongo/readconcern"
	"go.mongodb.org/mongo-driver/v2/mongo/readpref"
	"go.mongodb.org/mongo-driver/v2/mongo/writeconcern"
)

func ConnectionUriExample() {
	// start-connection-uri
	const uri = "mongodb+srv://localhost:27017/?connectTimeoutMS=60000&tls=true"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-connection-uri

	defer client.Disconnect(context.TODO())
}

func ClientOptionsExample() {
	// start-client-options
	opts := options.Client().
		SetConnectTimeout(60 * time.Second).
		SetTLSConfig(&tls.Config{})

	client, _ := mongo.Connect(opts)
	// end-client-options

	defer client.Disconnect(context.TODO())
}

func ReplicaSetNameURI() {
	// start-uri-replica-set-name
	const uri = "mongodb://localhost:27017/?replicaSet=yourReplicaSet"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-replica-set-name

	defer client.Disconnect(context.TODO())
}

func ReplicaSetNameOptions() {
	// start-settings-replica-set-name
	opts := options.Client().
		SetReplicaSet("yourReplicaSet")

	client, _ := mongo.Connect(opts)
	// end-settings-replica-set-name

	defer client.Disconnect(context.TODO())
}

func AutoEncryptionOptions() {
	// start-settings-auto-encryption-options
	kmsProviders := map[string]map[string]interface{}{
		"local": {
			"key": "<base64-encoded-key>",
		},
	}

	autoEncryptionOpts := options.AutoEncryption().
		SetKeyVaultNamespace("keyvault.datakeys").
		SetKmsProviders(kmsProviders)

	opts := options.Client().
		SetAutoEncryptionOptions(autoEncryptionOpts)
	// end-settings-auto-encryption-options

	client, _ := mongo.Connect(opts)
	defer client.Disconnect(context.TODO())
}

func DirectConnectionURI() {
	// start-uri-direct-connection
	const uri = "mongodb://localhost:27017/?directConnection=true"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-direct-connection

	defer client.Disconnect(context.TODO())
}

func DirectConnectionOptions() {
	// start-settings-direct-connection
	opts := options.Client().
		SetDirect(true)

	client, _ := mongo.Connect(opts)
	// end-settings-direct-connection

	defer client.Disconnect(context.TODO())
}

func UseTlsURI() {
	// start-uri-use-tls
	const uri = "mongodb://localhost:27017/?tls=true"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-use-tls

	defer client.Disconnect(context.TODO())
}

func UseTlsOptions() {
	// start-settings-use-tls
	opts := options.Client().
		SetTLSConfig(&tls.Config{})

	client, _ := mongo.Connect(opts)
	// end-settings-use-tls

	defer client.Disconnect(context.TODO())
}

func ConnectTimeoutURI() {
	// start-uri-connect-timeout
	const uri = "mongodb://localhost:27017/?connectTimeoutMS=60000"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-connect-timeout

	defer client.Disconnect(context.TODO())
}

func ConnectTimeoutOptions() {
	// start-settings-connect-timeout
	opts := options.Client().
		SetConnectTimeout(60 * time.Second)

	client, _ := mongo.Connect(opts)
	// end-settings-connect-timeout

	defer client.Disconnect(context.TODO())
}

func CompressorsURI() {
	// start-uri-compressors
	const uri = "mongodb://localhost:27017/?compressors=zlib,snappy"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-compressors

	defer client.Disconnect(context.TODO())
}

func CompressorsOptions() {
	// start-settings-compressors
	opts := options.Client().
		SetCompressors([]string{"zlib", "snappy"})

	client, _ := mongo.Connect(opts)
	// end-settings-compressors

	defer client.Disconnect(context.TODO())
}

func MaxConnectingURI() {
	// start-uri-max-connecting
	const uri = "mongodb://localhost:27017/?maxConnecting=3"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-max-connecting

	defer client.Disconnect(context.TODO())
}

func MaxConnectingOptions() {
	// start-settings-max-connecting
	opts := options.Client().
		SetMaxConnecting(3)

	client, _ := mongo.Connect(opts)
	// end-settings-max-connecting

	defer client.Disconnect(context.TODO())
}

func MaxConnectionIdleTimeURI() {
	// start-uri-max-connection-idle-time
	const uri = "mongodb://localhost:27017/?maxIdleTimeMS=8000"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-max-connection-idle-time

	defer client.Disconnect(context.TODO())
}

func MaxConnectionIdleTimeOptions() {
	// start-settings-max-connection-idle-time
	opts := options.Client().
		SetMaxConnIdleTime(8 * time.Second)

	client, _ := mongo.Connect(opts)
	// end-settings-max-connection-idle-time

	defer client.Disconnect(context.TODO())
}

func MaxConnectionPoolSizeURI() {
	// start-uri-max-connection-pool-size
	const uri = "mongodb://localhost:27017/?maxPoolSize=150"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-max-connection-pool-size

	defer client.Disconnect(context.TODO())
}

func MaxConnectionPoolSizeOptions() {
	// start-settings-max-connection-pool-size
	opts := options.Client().
		SetMaxPoolSize(150)

	client, _ := mongo.Connect(opts)
	// end-settings-max-connection-pool-size

	defer client.Disconnect(context.TODO())
}

func MinConnectionPoolSizeURI() {
	// start-uri-min-connection-pool-size
	const uri = "mongodb://localhost:27017/?minPoolSize=3"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-min-connection-pool-size

	defer client.Disconnect(context.TODO())
}

func MinConnectionPoolSizeOptions() {
	// start-settings-min-connection-pool-size
	opts := options.Client().
		SetMinPoolSize(3)

	client, _ := mongo.Connect(opts)
	// end-settings-min-connection-pool-size

	defer client.Disconnect(context.TODO())
}

func ReadConcernURI() {
	// start-uri-read-concern
	const uri = "mongodb://localhost:27017/?readConcernLevel=majority"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-read-concern

	defer client.Disconnect(context.TODO())
}

func ReadConcernOptions() {
	// start-settings-read-concern
	opts := options.Client().
		SetReadConcern(readconcern.Majority())

	client, _ := mongo.Connect(opts)
	// end-settings-read-concern

	defer client.Disconnect(context.TODO())
}

func ReadPreferenceURI() {
	// start-uri-read-preference
	const uri = "mongodb://localhost:27017/?readPreference=primaryPreferred"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-read-preference

	defer client.Disconnect(context.TODO())
}

func ReadPreferenceOptions() {
	// start-settings-read-preference
	opts := options.Client().
		SetReadPreference(readpref.PrimaryPreferred())

	client, _ := mongo.Connect(opts)
	// end-settings-read-preference

	defer client.Disconnect(context.TODO())
}

func CredentialURI() {
	// start-uri-credential
	const uri = "mongodb://user:password@localhost:27017/?authMechanism=PLAIN&authSource=admin"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-credential

	defer client.Disconnect(context.TODO())
}

func CredentialOptions() {
	// start-settings-credential
	credential := options.Credential{
		AuthMechanism: "PLAIN",
		AuthSource:    "admin",
		Username:      "user",
		Password:      "password",
	}
	opts := options.Client().SetAuth(credential)

	client, _ := mongo.Connect(opts)
	// end-settings-credential

	defer client.Disconnect(context.TODO())
}

func AuthMechanismPropertiesURI() {
	// start-uri-auth-mechanism-properties
	const uri = "mongodb://localhost:27017/?authMechanism=GSSAPI&authMechanismProperties=SERVICE_NAME:other,CANONICALIZE_HOST_NAME:true&authSource=db"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-auth-mechanism-properties

	defer client.Disconnect(context.TODO())
}

func AuthMechanismPropertiesOptions() {
	// start-settings-auth-mechanism-properties
	credential := options.Credential{
		AuthMechanism: "GSSAPI",
		AuthMechanismProperties: map[string]string{
			"SERVICE_NAME":           "other",
			"CANONICALIZE_HOST_NAME": "true",
		},
		AuthSource: "db",
	}
	opts := options.Client().SetAuth(credential)

	client, _ := mongo.Connect(opts)
	// end-settings-auth-mechanism-properties

	defer client.Disconnect(context.TODO())
}

func HeartbeatIntervalURI() {
	// start-uri-heartbeat-interval
	const uri = "mongodb://localhost:27017/?heartbeatFrequencyMS=5000"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-heartbeat-interval

	defer client.Disconnect(context.TODO())
}

func HeartbeatIntervalOptions() {
	// start-settings-heartbeat-interval
	opts := options.Client().
		SetHeartbeatInterval(5 * time.Second)

	client, _ := mongo.Connect(opts)
	// end-settings-heartbeat-interval

	defer client.Disconnect(context.TODO())
}

func LocalThresholdURI() {
	// start-uri-local-threshold
	const uri = "mongodb://localhost:27017/?localThresholdMS=20000"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-local-threshold

	defer client.Disconnect(context.TODO())
}

func LocalThresholdOptions() {
	// start-settings-local-threshold
	opts := options.Client().
		SetLocalThreshold(20 * time.Millisecond)

	client, _ := mongo.Connect(opts)
	// end-settings-local-threshold

	defer client.Disconnect(context.TODO())
}

func ServerSelectionTimeoutURI() {
	// start-uri-server-selection-timeout
	const uri = "mongodb://localhost:27017/?serverSelectionTimeoutMS=40000"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-server-selection-timeout

	defer client.Disconnect(context.TODO())
}

func ServerSelectionTimeoutOptions() {
	// start-settings-server-selection-timeout
	opts := options.Client().
		SetServerSelectionTimeout(40 * time.Second)

	client, _ := mongo.Connect(opts)
	// end-settings-server-selection-timeout

	defer client.Disconnect(context.TODO())
}

func ApplicationNameURI() {
	// start-uri-application-name
	const uri = "mongodb://localhost:27017/?appName=yourAppName"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-application-name

	defer client.Disconnect(context.TODO())
}

func ApplicationNameOptions() {
	// start-settings-application-name
	opts := options.Client().
		SetAppName("yourAppName")

	client, _ := mongo.Connect(opts)
	// end-settings-application-name

	defer client.Disconnect(context.TODO())
}

func RetryReadsURI() {
	// start-uri-retry-reads
	const uri = "mongodb://localhost:27017/?retryReads=false"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-retry-reads

	defer client.Disconnect(context.TODO())
}

func RetryReadsOptions() {
	// start-settings-retry-reads
	opts := options.Client().
		SetRetryReads(false)

	client, _ := mongo.Connect(opts)
	// end-settings-retry-reads

	defer client.Disconnect(context.TODO())
}

func RetryWritesURI() {
	// start-uri-retry-writes
	const uri = "mongodb://localhost:27017/?retryWrites=false"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-retry-writes

	defer client.Disconnect(context.TODO())
}

func RetryWritesOptions() {
	// start-settings-retry-writes
	opts := options.Client().
		SetRetryWrites(false)

	client, _ := mongo.Connect(opts)
	// end-settings-retry-writes

	defer client.Disconnect(context.TODO())
}

func HostsURI() {
	// start-uri-hosts
	const uri = "mongodb://localhost:27017,localhost:27018"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-hosts

	defer client.Disconnect(context.TODO())
}

func HostsOptions() {
	// start-settings-hosts
	opts := options.Client().
		SetHosts([]string{"localhost:27017", "localhost:27018"})

	client, _ := mongo.Connect(opts)
	// end-settings-hosts

	defer client.Disconnect(context.TODO())
}

func SrvMaxHostsURI() {
	// start-uri-srv-max-hosts
	const uri = "mongodb+srv://localhost/?srvMaxHosts=5"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-srv-max-hosts

	defer client.Disconnect(context.TODO())
}

func SrvMaxHostsOptions() {
	// start-settings-srv-max-hosts
	opts := options.Client().
		SetSRVMaxHosts(5)

	client, _ := mongo.Connect(opts)
	// end-settings-srv-max-hosts

	defer client.Disconnect(context.TODO())
}

func SrvServiceNameURI() {
	// start-uri-srv-service-name
	const uri = "mongodb+srv://localhost/?srvServiceName=yourServiceName"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-srv-service-name

	defer client.Disconnect(context.TODO())
}

func SrvServiceNameOptions() {
	// start-settings-srv-service-name
	opts := options.Client().
		SetSRVServiceName("yourServiceName")

	client, _ := mongo.Connect(opts)
	// end-settings-srv-service-name

	defer client.Disconnect(context.TODO())
}

func WriteConcernURI() {
	// start-uri-write-concern
	const uri = "mongodb://localhost:27017/?w=2"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-write-concern

	defer client.Disconnect(context.TODO())
}

func WriteConcernOptions() {
	// start-settings-write-concern
	wc := &writeconcern.WriteConcern{
		W: 2,
	}
	opts := options.Client().SetWriteConcern(wc)

	client, _ := mongo.Connect(opts)
	// end-settings-write-concern

	defer client.Disconnect(context.TODO())
}

func LoadBalancedURI() {
	// start-uri-load-balanced
	const uri = "mongodb://localhost:27017/?loadBalanced=true"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-load-balanced

	defer client.Disconnect(context.TODO())
}

func LoadBalancedOptions() {
	// start-settings-load-balanced
	opts := options.Client().
		SetLoadBalanced(true)

	client, _ := mongo.Connect(opts)
	// end-settings-load-balanced

	defer client.Disconnect(context.TODO())
}

func EnableOverloadRetargetingURI() {
	// start-uri-enable-overload-retargeting
	const uri = "mongodb://localhost:27017/?enableOverloadRetargeting=true"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-enable-overload-retargeting

	defer client.Disconnect(context.TODO())
}

func EnableOverloadRetargetingOptions() {
	// start-settings-enable-overload-retargeting
	opts := options.Client().
		SetEnableOverloadRetargeting(true)

	client, _ := mongo.Connect(opts)
	// end-settings-enable-overload-retargeting

	defer client.Disconnect(context.TODO())
}

func MaxAdaptiveRetriesURI() {
	// start-uri-max-adaptive-retries
	const uri = "mongodb://localhost:27017/?maxAdaptiveRetries=3"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-max-adaptive-retries

	defer client.Disconnect(context.TODO())
}

func MaxAdaptiveRetriesOptions() {
	// start-settings-max-adaptive-retries
	opts := options.Client().
		SetMaxAdaptiveRetries(3)

	client, _ := mongo.Connect(opts)
	// end-settings-max-adaptive-retries

	defer client.Disconnect(context.TODO())
}

func ServerMonitoringModeURI() {
	// start-uri-server-monitoring-mode
	const uri = "mongodb://localhost:27017/?serverMonitoringMode=poll"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-server-monitoring-mode

	defer client.Disconnect(context.TODO())
}

func ServerMonitoringModeOptions() {
	// start-settings-server-monitoring-mode
	opts := options.Client().
		SetServerMonitoringMode("poll")

	client, _ := mongo.Connect(opts)
	// end-settings-server-monitoring-mode

	defer client.Disconnect(context.TODO())
}

func TimeoutURI() {
	// start-uri-timeout
	const uri = "mongodb://localhost:27017/?timeoutMS=30000"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-timeout

	defer client.Disconnect(context.TODO())
}

func TimeoutOptions() {
	// start-settings-timeout
	opts := options.Client().
		SetTimeout(30 * time.Second)

	client, _ := mongo.Connect(opts)
	// end-settings-timeout

	defer client.Disconnect(context.TODO())
}

func ZlibLevelURI() {
	// start-uri-zlib-level
	const uri = "mongodb://localhost:27017/?compressors=zlib&zlibCompressionLevel=6"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-zlib-level

	defer client.Disconnect(context.TODO())
}

func ZlibLevelOptions() {
	// start-settings-zlib-level
	opts := options.Client().
		SetCompressors([]string{"zlib"}).
		SetZlibLevel(6)

	client, _ := mongo.Connect(opts)
	// end-settings-zlib-level

	defer client.Disconnect(context.TODO())
}

func ZstdLevelURI() {
	// start-uri-zstd-level
	const uri = "mongodb://localhost:27017/?compressors=zstd&zstdCompressionLevel=6"
	client, _ := mongo.Connect(options.Client().ApplyURI(uri))
	// end-uri-zstd-level

	defer client.Disconnect(context.TODO())
}

func ZstdLevelOptions() {
	// start-settings-zstd-level
	opts := options.Client().
		SetCompressors([]string{"zstd"}).
		SetZstdLevel(8)

	client, _ := mongo.Connect(opts)
	// end-settings-zstd-level

	defer client.Disconnect(context.TODO())
}

func ServerAPI() {
	// start-settings-server-api
	opts := options.Client().
		SetServerAPIOptions(options.ServerAPI(options.ServerAPIVersion1))

	client, _ := mongo.Connect(opts)
	// end-settings-server-api

	defer client.Disconnect(context.TODO())
}
