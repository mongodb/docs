package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

import (
	"crypto/rand"
	"io/ioutil"
	"log"
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

	// start-create-dek
	uri := "<Your MongoDB URI>"
	keyVaultNamespace := "encryption.__keyVault"
	clientEncryptionOpts := options.ClientEncryption().SetKeyVaultNamespace(keyVaultNamespace).SetKmsProviders(kmsProviders)
	keyVaultClient, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		return fmt.Errorf("Client connect error %v", err)
	}
	clientEnc, err := mongo.NewClientEncryption(keyVaultClient, clientEncryptionOpts)
	if err != nil {
		return fmt.Errorf("NewClientEncryption error %v", err)
	}
	defer func() {
		_ = clientEnc.Close(context.TODO())
	}()
	dataKeyOpts1 := options.DataKey().
		SetKeyAltNames([]string{"demoDataKey1"})
	dataKeyID1, err := clientEnc.CreateDataKey(context.TODO(), provider, dataKeyOpts1)
	if err != nil {
		return fmt.Errorf("create data key error %v", err)
	}
	dataKeyOpts2 := options.DataKey().
		SetKeyAltNames([]string{"demoDataKey2"})
	dataKeyID2, err := clientEnc.CreateDataKey(context.TODO(), provider, dataKeyOpts2)
	if err != nil {
		return fmt.Errorf("create data key error %v", err)
	}
	dataKeyOpts3 := options.DataKey().
		SetKeyAltNames([]string{"demoDataKey3"})
	dataKeyID3, err := clientEnc.CreateDataKey(context.TODO(), provider, dataKeyOpts3)
	if err != nil {
		return fmt.Errorf("create data key error %v", err)
	}
	dataKeyOpts4 := options.DataKey().
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
	err = secureClient.Database(dbName).CreateCollection(context.TODO(), collName)
	if err != nil {
		return fmt.Errorf("Error creating collection: %v", err)
	}
	// end-create-enc-collection
	print("Created Encrypted Collection")

	return nil
}
