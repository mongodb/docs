package main

import (
	"context"
	"fmt"
	"os"
	"strings"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func Insert() error {
	// start-json-schema
	dekIdBytes, err := os.ReadFile(dekIdPath)
	if err != nil {
		return fmt.Errorf("read dek_id.txt error: %v", err)
	}
	dekId := strings.TrimSpace(string(dekIdBytes))
	schemaTemplate := `{
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
	schema := fmt.Sprintf(schemaTemplate, dekId)
	var schemaDoc bson.Raw
	if err := bson.UnmarshalExtJSON([]byte(schema), true, &schemaDoc); err != nil {
		return fmt.Errorf("UnmarshalExtJSON error: %v", err)
	}
	schemaMap := map[string]any{
		"medicalRecords.patients": schemaDoc,
	}
	// end-json-schema

	// start-create-client
	kmsProviders, err := getKmsProviders()
	if err != nil {
		return err
	}
	extraOptions := map[string]any{
		"cryptSharedLibPath": cryptSharedLibPath,
	}
	autoEncryptionOpts := options.AutoEncryption().
		SetKmsProviders(kmsProviders).
		SetKeyVaultNamespace(keyVaultNamespace).
		SetSchemaMap(schemaMap).
		SetExtraOptions(extraOptions)
	secureClient, err := mongo.Connect(
		options.Client().ApplyURI(connectionString).SetAutoEncryptionOptions(autoEncryptionOpts),
	)
	if err != nil {
		return fmt.Errorf("connect error for encrypted client: %v", err)
	}
	defer func() {
		_ = secureClient.Disconnect(context.TODO())
	}()
	regularClient, err := mongo.Connect(options.Client().ApplyURI(connectionString))
	if err != nil {
		return fmt.Errorf("connect error for regular client: %v", err)
	}
	defer func() {
		_ = regularClient.Disconnect(context.TODO())
	}()
	// end-create-client

	// start-insert-document
	secureCollection := secureClient.Database("medicalRecords").Collection("patients")
	if _, err := secureCollection.InsertOne(context.TODO(), map[string]any{
		"name":      "Jon Doe",
		"ssn":       241014209,
		"bloodType": "AB+",
		"medicalRecords": []map[string]any{{
			"weight":        180,
			"bloodPressure": "120/80",
		}},
		"insurance": map[string]any{
			"provider":     "MaestCare",
			"policyNumber": 123142,
		},
	}); err != nil {
		return fmt.Errorf("InsertOne error: %v", err)
	}
	// end-insert-document

	// start-find-document
	fmt.Println("Finding a document with the regular (non-encrypted) client:")
	var resultRegular bson.M
	regularCollection := regularClient.Database("medicalRecords").Collection("patients")
	err = regularCollection.FindOne(context.TODO(), bson.D{{Key: "name", Value: "Jon Doe"}}).Decode(&resultRegular)
	if err != nil {
		return fmt.Errorf("FindOne error (regular client): %v", err)
	}
	outputRegular, err := bson.MarshalExtJSONIndent(resultRegular, false, false, "", "    ")
	if err != nil {
		return fmt.Errorf("MarshalExtJSONIndent error: %v", err)
	}
	fmt.Printf("%s\n", outputRegular)

	fmt.Println("Finding a document with the encrypted client:")
	var resultSecure bson.M
	err = secureCollection.FindOne(context.TODO(), bson.D{{Key: "name", Value: "Jon Doe"}}).Decode(&resultSecure)
	if err != nil {
		return fmt.Errorf("FindOne error (encrypted client): %v", err)
	}
	outputSecure, err := bson.MarshalExtJSONIndent(resultSecure, false, false, "", "    ")
	if err != nil {
		return fmt.Errorf("MarshalExtJSONIndent error: %v", err)
	}
	fmt.Printf("%s\n", outputSecure)
	// end-find-document

	return nil
}
