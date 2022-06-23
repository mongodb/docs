package main

import (
	"context"
	"encoding/json"
	"fmt"

	// :state-start: local-test aws-test azure-test gcp-test
	"os"
	// :state-end:
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

// :state-start: local-reader local-test
// :uncomment-start:
//import (
//	"io/ioutil"
//	"log"
//)
// :uncomment-end:
// :state-end:

func Insert() error {

	// start-key-vault
	keyVaultColl := "__keyVault"
	keyVaultDb := "encryption"
	keyVaultNamespace := keyVaultDb + "." + keyVaultColl
	// end-key-vault
	dbName            := "medicalRecords"
	collName          := "patients"

	// start-kmsproviders
	// :state-start: local-test local-reader
	// :uncomment-start:
	//key, err := ioutil.ReadFile("master-key.txt")
	//if err != nil {
	//	log.Fatalf("Could not read the key from master-key.txt: %v", err)
	//}
	//kmsProviders := map[string]map[string]interface{} { "local":{ "key": key}}
	// :uncomment-end:
	// :state-end:
	// :state-uncomment-start: aws-reader
	//kmsProviders := map[string]map[string]interface{} {
	//	"aws":{
	//	  "accessKeyId": "<Your AWS Access Key ID>",
	//	  "secretAccessKey" : "<Your AWS Secret Access Key>",
	//	},
	//}
	// :state-uncomment-end:
	// :state-uncomment-start: aws-test
	//kmsProviders := map[string]map[string]interface{} {
	//	"aws":{
	//	  "accessKeyId": os.Getenv("AWS_ACCESS_KEY_ID"),
	//	  "secretAccessKey" : os.Getenv("AWS_SECRET_ACCESS_KEY"),
	//	},
	//}
	// :state-uncomment-end:
	// :state-uncomment-start: azure-reader
	//kmsProviders := map[string]map[string]interface{} {
	//	"azure":{
	//		"tenantId": "<Your Azure Tenant ID>",
	//		"clientId": "<Your Azure Client ID>",
	//		"clientSecret": "<Your Azure Client Secret>",
	//	},
	//}
	// :state-uncomment-end:
	// :state-uncomment-start: azure-test
	//kmsProviders := map[string]map[string]interface{} {
	//	"azure":{
	//		"tenantId": os.Getenv("AZURE_TENANT_ID"),
	//		"clientId": os.Getenv("AZURE_CLIENT_ID"),
	//		"clientSecret": os.Getenv("AZURE_CLIENT_SECRET"),
	//	},
	//}
	// :state-uncomment-end:
	// :state-uncomment-start: gcp-reader
	//kmsProviders := map[string]map[string]interface{} {
	//	"gcp": {
	//		"email": "<Your GCP Email>",
	//		"privateKey": "<Your GCP Private Key>",
	//	},
	//}
	// :state-uncomment-end:
	// :state-uncomment-start: gcp-test
	//kmsProviders := map[string]map[string]interface{} {
	//	"gcp": {
	//		"email": os.Getenv("GCP_EMAIL"),
	//		"privateKey": os.Getenv("GCP_PRIVATE_KEY"),
	//	},
	//}
	// :state-uncomment-end:
    // end-kmsproviders


	// :state-start: local-reader aws-reader gcp-reader azure-reader
	// :uncomment-start:
	//uri := "<Your MongoDB URI>"
	// :uncomment-end:
	// :state-end:
	// :state-start: local-test aws-test gcp-test azure-test
	uri := os.Getenv("MONGODB_URI")
	// :state-end:

	// start-schema
	regularClient, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		return fmt.Errorf("Connect error for regular client: %v", err)
	}
	defer func() {
		_ = regularClient.Disconnect(context.TODO())
	}()
	
	var foundDoc1 bson.M
	err = regularClient.Database(keyVaultDb).Collection(keyVaultColl).FindOne(context.TODO(), bson.D{{"keyAltNames", "demoDataKey1"}}).Decode(&foundDoc1)
	if err != nil {
		panic(err)
	}
	var dataKeyID1 = foundDoc1["_id"].(primitive.Binary)
	var foundDoc2 bson.M
	err = regularClient.Database(keyVaultDb).Collection(keyVaultColl).FindOne(context.TODO(), bson.D{{"keyAltNames", "demoDataKey2"}}).Decode(&foundDoc2)
	if err != nil {
		panic(err)
	}
	var dataKeyID2 = foundDoc2["_id"].(primitive.Binary)
	var foundDoc3 bson.M
	err = regularClient.Database(keyVaultDb).Collection(keyVaultColl).FindOne(context.TODO(), bson.D{{"keyAltNames", "demoDataKey3"}}).Decode(&foundDoc3)
	if err != nil {
		panic(err)
	}
	var dataKeyID3 = foundDoc3["_id"].(primitive.Binary)
	var foundDoc4 bson.M
	err = regularClient.Database(keyVaultDb).Collection(keyVaultColl).FindOne(context.TODO(), bson.D{{"keyAltNames", "demoDataKey4"}}).Decode(&foundDoc4)
	if err != nil {
		panic(err)
	}
	var dataKeyID4 = foundDoc4["_id"].(primitive.Binary)

	encryptedFieldsMap := bson.M{
		"medicalRecords.patients": bson.M{
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
	// end-schema

	// start-extra-options
	// :state-start: aws-reader azure-reader local-reader gcp-reader
	// :uncomment-start:
	//extraOptions := map[string]interface{}{
	//	"cryptSharedLibPath": "<Your Crypt Shared lib Path>",
	//}
	// :uncomment-end:
	// :state-end:
	// :state-start: aws-test azure-test local-test gcp-test
	extraOptions := map[string]interface{}{
		"cryptSharedLibPath": os.Getenv("SHARED_LIB_PATH"),
	}
	// :state-end:
	// end-extra-options
	
	// start-client
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
	// end-client


	// start-insert
	test_patient := map[string]interface{}{
		"firstName":      "Jon",
		"lastName": "Doe",
		"patientId":       12345678,
        "address": "157 Electric Ave.",
		"medications": []string {"Atorvastatin", "Levothyroxine"},
		"patientRecord": map[string]interface{}{
            "ssn": "987-65-4320",
			"billing": map[string]interface{}{
				"type": "Visa",
                "number": "4111111111111111",
			},
		},
	}
	if _, err := secureClient.Database(dbName).Collection(collName).InsertOne(context.TODO(), test_patient); err != nil {
		return fmt.Errorf("InsertOne error: %v", err)
	}
	// end-insert
	// start-find
	fmt.Println("Finding a document with regular (non-encrypted) client.")
	var resultRegular bson.M
	err = regularClient.Database(dbName).Collection(collName).FindOne(context.TODO(), bson.D{{"firstName", "Jon"}}).Decode(&resultRegular)
	if err != nil {
		panic(err)
	}
	outputRegular, err := json.MarshalIndent(resultRegular, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("%s\n", outputRegular)

	fmt.Println("Finding a document with encrypted client, searching on an encrypted field")
	var resultSecure bson.M
	err = secureClient.Database(dbName).Collection(collName).FindOne(context.TODO(), bson.D{bson.E{"patientRecord.ssn", "987-65-4320"}}).Decode(&resultSecure)
	if err != nil {
		panic(err)
	}
	outputSecure, err := json.MarshalIndent(resultSecure, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("%s\n", outputSecure)
	// end-find
	return nil
}

