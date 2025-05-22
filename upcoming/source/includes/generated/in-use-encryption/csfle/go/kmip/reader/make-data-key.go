package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"log"

	"crypto/tls"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func MakeKey() error {

	// start-kmsproviders
	provider := "kmip"
	kmsProviders := map[string]map[string]interface{}{
		provider: {
			"endpoint": "<endpoint for your KMIP-compliant key provider>",
		},
	}
	// end-kmsproviders

	// start-datakeyopts
	masterKey := map[string]interface{}{} // an empty key object prompts your KMIP-compliant key provider to generate a new Customer Master Key
	// end-datakeyopts

	// start-create-index
	uri := "<Your MongoDB URI>"
	keyVaultClient, err := mongo.Connect(options.Client().ApplyURI(uri))
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

	// start-create-tls
	tlsConfig := make(map[string]*tls.Config)
	tlsOpts := map[string]interface{}{
		"tlsCertificateKeyFile": "<path to your client certificate file>",
		"tlsCAFile":             "<path to file containing your Certificate Authority certificate>",
	}
	kmipConfig, err := options.BuildTLSConfig(tlsOpts)
	tlsConfig["kmip"] = kmipConfig
	// end-create-tls

	// start-create-dek
	clientEncryptionOpts := options.ClientEncryption().SetKeyVaultNamespace(keyVaultNamespace).
		SetKmsProviders(kmsProviders).SetTLSConfig(tlsConfig)
	clientEnc, err := mongo.NewClientEncryption(keyVaultClient, clientEncryptionOpts)
	if err != nil {
		return fmt.Errorf("NewClientEncryption error %v", err)
	}
	defer func() {
		_ = clientEnc.Close(context.TODO())
	}()
	dataKeyOpts := options.DataKey().
		SetMasterKey(masterKey)

	dataKeyID, err := clientEnc.CreateDataKey(context.TODO(), provider, dataKeyOpts)
	if err != nil {
		return fmt.Errorf("create data key error %v", err)
	}

	fmt.Printf("DataKeyId [base64]: %s\n", base64.StdEncoding.EncodeToString(dataKeyID.Data))
	// end-create-dek
	return nil
}
