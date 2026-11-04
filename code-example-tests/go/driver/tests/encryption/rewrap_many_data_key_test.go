package encryption

import (
	"bytes"
	"context"
	"crypto/rand"
	"testing"

	"driver-examples/examples/encryption"
	"driver-examples/utils"
	"driver-examples/utils/compare"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"go.mongodb.org/mongo-driver/v2/x/mongo/driver/mongocrypt"
)

const (
	keyVaultDB         = "encryption"
	keyVaultCollection = "__keyVault"
	dataKeyAltName     = "my-key"
)

type dataKey struct {
	ID          bson.Binary `bson:"_id"`
	KeyMaterial bson.Binary `bson:"keyMaterial"`
}

func TestRewrapManyDataKey(t *testing.T) {
	// The driver only includes explicit encryption when it is built with the
	// cse build tag and libmongocrypt. Without them, ClientEncryption panics,
	// so skip the test instead of failing the rest of the suite.
	if mongocrypt.Version() == "" {
		t.Skip("requires the cse build tag and libmongocrypt")
	}

	uri := utils.GetConnectionString()
	if uri == "" {
		t.Fatal("set your 'CONNECTION_STRING' environment variable")
	}

	ctx := context.Background()
	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		t.Fatalf("failed to connect to the server: %v", err)
	}
	defer func() { _ = client.Disconnect(ctx) }()

	db := client.Database(keyVaultDB)
	_ = db.Drop(ctx)
	defer func() { _ = db.Drop(ctx) }()

	localMasterKey := make([]byte, 96)
	if _, err := rand.Read(localMasterKey); err != nil {
		t.Fatalf("failed to generate the local master key: %v", err)
	}
	kmsProviders := map[string]map[string]any{"local": {"key": localMasterKey}}
	keyVaultNamespace := keyVaultDB + "." + keyVaultCollection

	clientEncryption, err := mongo.NewClientEncryption(client, options.ClientEncryption().
		SetKeyVaultNamespace(keyVaultNamespace).
		SetKmsProviders(kmsProviders))
	if err != nil {
		t.Fatalf("failed to create ClientEncryption: %v", err)
	}
	defer func() { _ = clientEncryption.Close(ctx) }()

	_, err = clientEncryption.CreateDataKey(ctx, "local",
		options.DataKey().SetKeyAltNames([]string{dataKeyAltName}))
	if err != nil {
		t.Fatalf("failed to create the data key: %v", err)
	}

	original := getDataKey(t, db)

	result := encryption.RewrapManyDataKey(kmsProviders, keyVaultNamespace)

	rewrapped := getDataKey(t, db)

	compare.ExpectThat(t, result.MatchedCount).ShouldMatch(1)
	compare.ExpectThat(t, bytes.Equal(rewrapped.ID.Data, original.ID.Data)).ShouldMatch(true)
	compare.ExpectThat(t, bytes.Equal(rewrapped.KeyMaterial.Data, original.KeyMaterial.Data)).ShouldMatch(false)
}

func getDataKey(t *testing.T, db *mongo.Database) dataKey {
	t.Helper()
	var key dataKey
	err := db.Collection(keyVaultCollection).
		FindOne(context.Background(), bson.D{{Key: "keyAltNames", Value: dataKeyAltName}}).
		Decode(&key)
	if err != nil {
		t.Fatalf("failed to find the data key: %v", err)
	}
	return key
}
