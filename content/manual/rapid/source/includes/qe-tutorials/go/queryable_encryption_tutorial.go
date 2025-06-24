package main

import (
	"context"
	"encoding/json"
	"fmt"
	"os"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {

	LoadEnv()

	// start-setup-application-variables
	kmsProviderName := "<KMS provider name>"

	uri := os.Getenv("MONGODB_URI") // Your connection URI

	keyVaultDatabaseName := "encryption"
	keyVaultCollectionName := "__keyVault"
	keyVaultNamespace := keyVaultDatabaseName + "." + keyVaultCollectionName

	encryptedDatabaseName := "medicalRecords"
	encryptedCollectionName := "patients"
	// end-setup-application-variables

	kmsProviderCredentials := GetKmsProviderCredentials(kmsProviderName)

	customerMasterKey := GetCustomerMasterKeyCredentials(kmsProviderName)

	autoEncryptionOptions := GetAutoEncryptionOptions(
		kmsProviderName,
		keyVaultNamespace,
		kmsProviderCredentials,
	)

	// start-create-client
	opts := options.Client().
		ApplyURI(uri).
		SetAutoEncryptionOptions(autoEncryptionOptions)
	encryptedClient, err := mongo.Connect(opts)

	if err != nil {
		panic(fmt.Sprintf("Unable to connect to MongoDB: %v\n", err))
	}
	defer func() {
		_ = encryptedClient.Disconnect(context.TODO())
	}()
	// end-create-client

	keyVaultCollection := encryptedClient.Database(keyVaultDatabaseName).Collection(keyVaultCollectionName)
	if err := keyVaultCollection.Drop(context.TODO()); err != nil {
		panic(fmt.Sprintf("Unable to drop collection: %v", err))
	}

	encryptedCollection := encryptedClient.Database(encryptedDatabaseName).Collection(encryptedCollectionName)
	if err := encryptedCollection.Drop(context.TODO()); err != nil {
		panic(fmt.Sprintf("Unable to drop collection: %v", err))
	}

	// start-encrypted-fields-map
	encryptedFieldsMap := bson.M{
		"fields": []bson.M{
			bson.M{
				"keyId":    nil,
				"path":     "patientRecord.ssn",
				"bsonType": "string",
				"queries": []bson.M{
					{
						"queryType": "equality",
					},
				},
			},
			bson.M{
				"keyId":    nil,
				"path":     "patientRecord.billing",
				"bsonType": "object",
			},
		},
	}
	// end-encrypted-fields-map

	clientEncryption := GetClientEncryption(
		encryptedClient,
		kmsProviderName,
		kmsProviderCredentials,
		keyVaultNamespace,
	)

	// start-create-encrypted-collection
	createCollectionOptions := options.CreateCollection().SetEncryptedFields(encryptedFieldsMap)
	_, _, err =
		clientEncryption.CreateEncryptedCollection(
			context.TODO(),
			encryptedClient.Database(encryptedDatabaseName),
			encryptedCollectionName,
			createCollectionOptions,
			kmsProviderName,
			customerMasterKey,
		)
		// end-create-encrypted-collection
	if err != nil {
		panic(fmt.Sprintf("Unable to create encrypted collection: %s", err))
	}

	// start-insert-document
	patientDocument := &PatientDocument{
		PatientName: "Jon Doe",
		PatientID:   12345678,
		PatientRecord: PatientRecord{
			SSN: "987-65-4320",
			Billing: PaymentInfo{
				Type:   "Visa",
				Number: "4111111111111111",
			},
			BillAmount: 1500,
		},
	}

	coll := encryptedClient.Database(encryptedDatabaseName).Collection(encryptedCollectionName)

	_, err = coll.InsertOne(context.TODO(), patientDocument)
	if err != nil {
		panic(fmt.Sprintf("Unable to insert the patientDocument: %s", err))
	}
	// end-insert-document

	// start-find-document
	var findResult PatientDocument
	err = coll.FindOne(
		context.TODO(),
		bson.M{"patientRecord.ssn": "987-65-4320"},
	).Decode(&findResult)
	// end-find-document
	if err != nil {
		fmt.Print("Unable to find the document\n")
	} else {
		output, _ := json.MarshalIndent(findResult, "", "    ")
		fmt.Printf("%s\n", output)
	}
}
