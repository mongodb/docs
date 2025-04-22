package main

import (
	"context"
	"encoding/json"
	"fmt"

	"crypto/tls"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Insert() error {

	// start-key-vault
	keyVaultColl := "__keyVault"
	keyVaultDb := "encryption"
	keyVaultNamespace := keyVaultDb + "." + keyVaultColl
	// end-key-vault
	dbName := "medicalRecords"
	collName := "patients"

	// start-kmsproviders
	provider := "kmip"
	kmsProviders := map[string]map[string]interface{}{
		provider: {
			"endpoint": "<endpoint for your KMIP-compliant key provider>",
		},
	}
	// end-kmsproviders

	uri := "<Your MongoDB URI>"

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
	extraOptions := map[string]interface{}{
		"cryptSharedLibPath": "<Your Crypt Shared lib Path>",
	}
	// end-extra-options

	// start-create-tls
	tlsConfig := make(map[string]*tls.Config)
	tlsOpts := map[string]interface{}{
		"tlsCertificateKeyFile": "<path to your client certificate file>",
		"tlsCAFile":             "<path to file containing your Certificate Authority certificate>",
	}
	kmipConfig, err := options.BuildTLSConfig(tlsOpts)
	tlsConfig["kmip"] = kmipConfig
	// end-create-tls

	// start-client
	autoEncryptionOpts := options.AutoEncryption().
		SetKmsProviders(kmsProviders).
		SetKeyVaultNamespace(keyVaultNamespace).
		SetEncryptedFieldsMap(encryptedFieldsMap).
		SetExtraOptions(extraOptions).SetTLSConfig(tlsConfig)
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
		"firstName":   "Jon",
		"lastName":    "Doe",
		"patientId":   12345678,
		"address":     "157 Electric Ave.",
		"medications": []string{"Atorvastatin", "Levothyroxine"},
		"patientRecord": map[string]interface{}{
			"ssn": "987-65-4320",
			"billing": map[string]interface{}{
				"type":   "Visa",
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
