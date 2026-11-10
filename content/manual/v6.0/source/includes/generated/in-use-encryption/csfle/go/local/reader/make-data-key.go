package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

import (
	"crypto/rand"
	"io/ioutil"
)

func localMasterKey() []byte {
	key := make([]byte, 96)
	if _, err := rand.Read(key); err != nil {
		log.Fatalf("Unable to create a random 96 byte data key: %v", err)
	}
	if err := ioutil.WriteFile("master-key.txt", key, 0644); err != nil {
		log.Fatalf("Unable to write key to file: %v", err)
	}
	return key
}

func MakeKey() error {

	localMasterKey()

	// start-kmsproviders
	key, err := ioutil.ReadFile("master-key.txt")
	if err != nil {
		log.Fatalf("Could not read the key from master-key.txt: %v", err)
	}
	provider := "local"
	kmsProviders := map[string]map[string]interface{}{"local": {"key": key}}
	// end-kmsproviders

	// start-datakeyopts
	// end-datakeyopts

	// start-create-index
	uri := "<Your MongoDB URI>"
	keyVaultClient, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		return fmt.Errorf("Connect error for regular client: %v", err)
	}
	defer func() {
		_ = keyVaultClient.Disconnect(context.TODO())
	}()

	keyVaultColl := "__keyVault"
	keyVaultDb := "encryption"
	keyVaultNamespace := keyVaultDb + "." + keyVaultColl
	keyVaultIndex := mongo.IndexModel{
		Keys: bson.D{{"keyAltNames", 1}},
		Options: options.Index().
			SetUnique(true).
			SetPartialFilterExpression(bson.D{
				{"keyAltNames", bson.D{
					{"$exists", true},
				}},
			}),
	}
	// Drop the Key Vault Collection in case you created this collection
	// in a previous run of this application.
	if err = keyVaultClient.Database(keyVaultDb).Collection(keyVaultColl).Drop(context.TODO()); err != nil {
		log.Fatalf("Collection.Drop error: %v", err)
	}
	// Drop the database storing your encrypted fields as all
	// the DEKs encrypting those fields were deleted in the preceding line.
	if err = keyVaultClient.Database("medicalRecords").Collection("patients").Drop(context.TODO()); err != nil {
		log.Fatalf("Collection.Drop error: %v", err)
	}
	_, err = keyVaultClient.Database(keyVaultDb).Collection(keyVaultColl).Indexes().CreateOne(context.TODO(), keyVaultIndex)
	if err != nil {
		panic(err)
	}
	// end-create-index

	// start-create-dek
	clientEncryptionOpts := options.ClientEncryption().SetKeyVaultNamespace(keyVaultNamespace).
		SetKmsProviders(kmsProviders)
	clientEnc, err := mongo.NewClientEncryption(keyVaultClient, clientEncryptionOpts)
	if err != nil {
		return fmt.Errorf("NewClientEncryption error %v", err)
	}
	defer func() {
		_ = clientEnc.Close(context.TODO())
	}()
	dataKeyOpts := options.DataKey()

	dataKeyID, err := clientEnc.CreateDataKey(context.TODO(), provider, dataKeyOpts)
	if err != nil {
		return fmt.Errorf("create data key error %v", err)
	}

	fmt.Printf("DataKeyId [base64]: %s\n", base64.StdEncoding.EncodeToString(dataKeyID.Data))
	// end-create-dek
	return nil
}
