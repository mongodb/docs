package main

import (
	"context"
	"encoding/json"
	"fmt"

	"crypto/tls"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func Insert() error {

	// start-key-vault
	keyVaultNamespace := "encryption.__keyVault"
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
		"cryptSharedLibPath": "<Full path to your Automatic Encryption Shared Library>",
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

	regularClient, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		return fmt.Errorf("Connect error for regular client: %v", err)
	}
	defer func() {
		_ = regularClient.Disconnect(context.TODO())
	}()
	// start-client
	autoEncryptionOpts := options.AutoEncryption().
		SetKmsProviders(kmsProviders).
		SetKeyVaultNamespace(keyVaultNamespace).
		SetSchemaMap(schemaMap).
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
	if _, err := secureClient.Database(dbName).Collection(collName).InsertOne(context.TODO(), test_patient); err != nil {
		return fmt.Errorf("InsertOne error: %v", err)
	}
	// end-insert
	// start-find
	fmt.Println("Finding a document with regular (non-encrypted) client.")
	var resultRegular bson.M
	err = regularClient.Database(dbName).Collection(collName).FindOne(context.TODO(), bson.D{{"name", "Jon Doe"}}).Decode(&resultRegular)
	if err != nil {
		panic(err)
	}
	outputRegular, err := json.MarshalIndent(resultRegular, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("%s\n", outputRegular)

	fmt.Println("Finding a document with encrypted client")
	var resultSecure bson.M
	err = secureClient.Database(dbName).Collection(collName).FindOne(context.TODO(), bson.D{{"name", "Jon Doe"}}).Decode(&resultSecure)
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
