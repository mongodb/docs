package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func MakeKey() error {

	// start-kmsproviders
	provider := "azure"
	kmsProviders := map[string]map[string]interface{}{
		provider: {
			"tenantId":     "<Your Azure Tenant ID>",
			"clientId":     "<Your Azure Client ID>",
			"clientSecret": "<Your Azure Client Secret>",
		},
	}
	// end-kmsproviders

	// start-datakeyopts
	masterKey := map[string]interface{}{
		"keyVaultEndpoint": "<Your Azure Key Vault Endpoint>",
		"keyName":          "<Your Azure Key Name>",
	}
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

	keyVaultDb := "encryption"
	keyVaultColl := "__keyVault"
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
	dataKeyOpts1 := options.DataKey().
		SetMasterKey(masterKey).
		SetKeyAltNames([]string{"demoDataKey1"})
	dataKeyID1, err := clientEnc.CreateDataKey(context.TODO(), provider, dataKeyOpts1)
	if err != nil {
		return fmt.Errorf("create data key error %v", err)
	}
	dataKeyOpts2 := options.DataKey().
		SetMasterKey(masterKey).
		SetKeyAltNames([]string{"demoDataKey2"})
	dataKeyID2, err := clientEnc.CreateDataKey(context.TODO(), provider, dataKeyOpts2)
	if err != nil {
		return fmt.Errorf("create data key error %v", err)
	}
	dataKeyOpts3 := options.DataKey().
		SetMasterKey(masterKey).
		SetKeyAltNames([]string{"demoDataKey3"})
	dataKeyID3, err := clientEnc.CreateDataKey(context.TODO(), provider, dataKeyOpts3)
	if err != nil {
		return fmt.Errorf("create data key error %v", err)
	}
	dataKeyOpts4 := options.DataKey().
		SetMasterKey(masterKey).
		SetKeyAltNames([]string{"demoDataKey4"})
	dataKeyID4, err := clientEnc.CreateDataKey(context.TODO(), provider, dataKeyOpts4)
	if err != nil {
		return fmt.Errorf("create data key error %v", err)
	}
	// end-create-dek

	// start-create-enc-collection
	dbName := "medicalRecords"
	collName := "patients"
	encNamespace := (dbName + "." + collName)

	encryptedFieldsMap := bson.M{
		encNamespace: bson.M{
			"fields": []bson.M{
				{
					"path":     "patientId",
					"bsonType": "int",
					"keyId":    dataKeyID1,
					"queries": []bson.M{
						{
							"queryType": "equality",
						},
					},
				},
				{
					"path":     "medications",
					"bsonType": "array",
					"keyId":    dataKeyID2,
				},
				{
					"path":     "patientRecord.ssn",
					"bsonType": "string",
					"keyId":    dataKeyID3,
					"queries": []bson.M{
						{
							"queryType": "equality",
						},
					},
				},
				{
					"path":     "patientRecord.billing",
					"bsonType": "object",
					"keyId":    dataKeyID4,
				},
			},
		},
	}
	extraOptions := map[string]interface{}{
		"cryptSharedLibPath": "<Your Crypt Shared lib Path>",
	}

	autoEncryptionOpts := options.AutoEncryption().
		SetKmsProviders(kmsProviders).
		SetKeyVaultNamespace(keyVaultNamespace).
		SetEncryptedFieldsMap(encryptedFieldsMap).
		SetExtraOptions(extraOptions)
	secureClient, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri).SetAutoEncryptionOptions(autoEncryptionOpts))
	if err != nil {
		return fmt.Errorf("Connect error for encrypted client: %v", err)
	}
	defer func() {
		_ = secureClient.Disconnect(context.TODO())
	}()
	// Drop the encrypted collection in case you created this collection
	// in a previous run of this application.
	if err = secureClient.Database(dbName).Collection(collName).Drop(context.TODO()); err != nil {
		log.Fatalf("Collection.Drop error: %v", err)
	}
	err = secureClient.Database(dbName).CreateCollection(context.TODO(), collName)
	if err != nil {
		return fmt.Errorf("Error creating collection: %v", err)
	}
	// end-create-enc-collection
	fmt.Println("Created Encrypted Collection")

	return nil
}
