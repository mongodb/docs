//	:replace-start: {
//	  "terms": {
//	    "utils.GetConnectionString()": "os.Getenv(\"MONGODB_URI\")",
//	    "bson.D{{Key: \"keyAltNames\", Value: \"my-key\"}}": "bson.D{{Key: \"<filter field>\", Value: \"<filter value>\"}}",
//	    "SetProvider(\"local\")": "SetProvider(\"<KMS provider>\")",
//	    "masterKey := bson.D{}": "masterKey := bson.D{{Key: \"<dataKeyOpts Key>\", Value: \"<dataKeyOpts Value>\"}}"
//	  }
//	}
//
// Demonstrates how to rotate data encryption keys by using
// ClientEncryption.RewrapManyDataKey with the Go driver
package encryption

import (
	"context"
	"log"

	"driver-examples/utils"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// RewrapManyDataKey rewraps the data encryption keys that match a filter by
// using the specified KMS provider and master key. The driver only supports
// explicit encryption when it is built with the cse build tag, which requires
// libmongocrypt.
func RewrapManyDataKey(kmsProviders map[string]map[string]any, keyVaultNamespace string) *mongo.RewrapManyDataKeyResult {
	// :snippet-start: rewrap-data-key
	ctx := context.Background()

	uri := utils.GetConnectionString()
	if uri == "" {
		log.Fatal("Set your 'MONGODB_URI' environment variable")
	}

	keyVaultClient, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatalf("failed to connect to the server: %v", err)
	}
	defer func() { _ = keyVaultClient.Disconnect(ctx) }()

	clientEncryptionOpts := options.ClientEncryption().
		SetKeyVaultNamespace(keyVaultNamespace).
		SetKmsProviders(kmsProviders)
	clientEncryption, err := mongo.NewClientEncryption(keyVaultClient, clientEncryptionOpts)
	if err != nil {
		log.Fatalf("failed to create ClientEncryption: %v", err)
	}
	defer func() { _ = clientEncryption.Close(ctx) }()

	filter := bson.D{{Key: "keyAltNames", Value: "my-key"}}

	masterKey := bson.D{}
	rewrapOpts := options.RewrapManyDataKey().
		SetProvider("local").
		SetMasterKey(masterKey)

	result, err := clientEncryption.RewrapManyDataKey(ctx, filter, rewrapOpts)
	if err != nil {
		log.Fatalf("failed to rewrap data keys: %v", err)
	}
	// :snippet-end:

	return result
}

// :replace-end:
