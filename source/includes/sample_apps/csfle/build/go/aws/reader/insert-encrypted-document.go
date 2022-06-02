package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func Insert() error {

	// start-key-vault
	keyVaultNamespace := "encryption.__keyVault"
	// end-key-vault
	dbName := "medicalRecords"
	collName := "patients"

	// start-kmsproviders
	kmsProviders := map[string]map[string]interface{}{
		"aws": {
			"accessKeyId":     "<Your AWS Access Key ID>",
			"secretAccessKey": "<Your AWS Secret Access Key>",
		},
	}
	// end-kmsproviders

	// start-schema
	dek_id := "<Your Base64 DEK ID>"
	schema_template := `{
		"bsonType": "object",
		"encryptMetadata": {
			"keyId": [
				{
					"$binary": {
						"base64": "%s",
						"subType": "04"
					}
				}
			]
		},
		"properties": {
			"insurance": {
				"bsonType": "object",
				"properties": {
					"policyNumber": {
						"encrypt": {
							"bsonType": "int",
							"algorithm": "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic"
						}
					}
				}
			},
			"medicalRecords": {
				"encrypt": {
					"bsonType": "array",
					"algorithm": "AEAD_AES_256_CBC_HMAC_SHA_512-Random"
				}
			},
			"bloodType": {
				"encrypt": {
					"bsonType": "string",
					"algorithm": "AEAD_AES_256_CBC_HMAC_SHA_512-Random"
				}
			},
			"ssn": {
				"encrypt": {
					"bsonType": "int",
					"algorithm": "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic"
				}
			}
		}
	}`
	schema := fmt.Sprintf(schema_template, dek_id)
	var schemaDoc bson.Raw
	if err := bson.UnmarshalExtJSON([]byte(schema), true, &schemaDoc); err != nil {
		return fmt.Errorf("UnmarshalExtJSON error: %v", err)
	}
	schemaMap := map[string]interface{}{
		dbName + "." + collName: schemaDoc,
	}
	// end-schema

	uri := "<Your MongoDB URI>"

	// start-extra-options
	extraOptions := map[string]interface{}{
		"mongocryptdSpawnPath": "/usr/local/bin/mongocryptd",
	}
	// end-extra-options

	// start-client
	autoEncryptionOpts := options.AutoEncryption().
		SetKmsProviders(kmsProviders).
		SetKeyVaultNamespace(keyVaultNamespace).
		SetSchemaMap(schemaMap).
		SetExtraOptions(extraOptions)
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri).SetAutoEncryptionOptions(autoEncryptionOpts))
	if err != nil {
		return fmt.Errorf("Connect error for encrypted client: %v", err)
	}
	defer func() {
		_ = client.Disconnect(context.TODO())
	}()
	// end-client

	// start-insert
	test_patient := map[string]interface{}{
		"name":      "Jon Doe",
		"ssn":       241014209,
		"bloodType": "AB+",
		"medicalRecords": []map[string]interface{}{{
			"weight":        180,
			"bloodPressure": "120/80",
		}},
		"insurance": map[string]interface{}{
			"provider":     "MaestCare",
			"policyNumber": 123142,
		},
	}
	if _, err := client.Database(dbName).Collection(collName).InsertOne(context.TODO(), test_patient); err != nil {
		return fmt.Errorf("InsertOne error: %v", err)
	}
	// end-insert
	fmt.Println("Successfully Inserted Encrypted Document!")
	return nil
}
