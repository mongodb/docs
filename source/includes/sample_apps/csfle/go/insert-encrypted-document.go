package main

import (
	"context"
	"encoding/json"
	"fmt"

	// :state-start: local-test aws-test azure-test gcp-test
	"os"
	// :state-end:
	"go.mongodb.org/mongo-driver/bson"
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
	keyVaultNamespace := "encryption.__keyVault"
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


	// start-schema
	// :state-start: local-reader aws-reader azure-reader gcp-reader
    // :uncomment-start:
	//dek_id := "<Your Base64 DEK ID>"
	//schema_template := `{
	//	"bsonType": "object",
	//	"encryptMetadata": {
	//		"keyId": [
	//			{
	//				"$binary": {
	//					"base64": "%s",
	//					"subType": "04"
	//				}
	//			}
	//		]
	//	},
	//	"properties": {
	//		"insurance": {
	//			"bsonType": "object",
	//			"properties": {
	//				"policyNumber": {
	//					"encrypt": {
	//						"bsonType": "int",
	//						"algorithm": "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic"
	//					}
	//				}
	//			}
	//		},
	//		"medicalRecords": {
	//			"encrypt": {
	//				"bsonType": "array",
	//				"algorithm": "AEAD_AES_256_CBC_HMAC_SHA_512-Random"
	//			}
	//		},
	//		"bloodType": {
	//			"encrypt": {
	//				"bsonType": "string",
	//				"algorithm": "AEAD_AES_256_CBC_HMAC_SHA_512-Random"
	//			}
	//		},
	//		"ssn": {
	//			"encrypt": {
	//				"bsonType": "int",
	//				"algorithm": "AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic"
	//			}
	//		}
	//	}
	//}`
	//schema := fmt.Sprintf(schema_template, dek_id)
	// :uncomment-end:
	// :state-end:
	// :state-start: local-test aws-test azure-test gcp-test
	dek_id := "<Your Base64 DEK ID>"
	schema_template := `{
		"bsonType": "object",
		"encryptMetadata": {
			"keyId": "/key-id"
		},
		"properties": {
			"insurance": {
				"bsonType": "object",
				"properties": {
					"policyNumber": {
						"encrypt": {
							"bsonType": "int",
							"algorithm": "AEAD_AES_256_CBC_HMAC_SHA_512-Random"
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
					"algorithm": "AEAD_AES_256_CBC_HMAC_SHA_512-Random"
				}
			}
		}
	}`
	schema := fmt.Sprintf(schema_template, dek_id)
	// :state-end:
	var schemaDoc bson.Raw
	if err := bson.UnmarshalExtJSON([]byte(schema), true, &schemaDoc); err != nil {
		return fmt.Errorf("UnmarshalExtJSON error: %v", err)
	}
	schemaMap := map[string]interface{}{
		dbName + "." + collName: schemaDoc,
	}
	// end-schema

	// :state-start: local-reader aws-reader gcp-reader azure-reader
	// :uncomment-start:
	//uri := "<Your MongoDB URI>"
	// :uncomment-end:
	// :state-end:
	// :state-start: local-test aws-test gcp-test azure-test
	uri := os.Getenv("MONGODB_URI")
	// :state-end:

	// start-extra-options
	// :state-start: aws-reader azure-reader local-reader gcp-reader
	// :uncomment-start:
	//extraOptions := map[string]interface{}{
	//	"mongocryptdSpawnPath": "/usr/local/bin/mongocryptd",
	//}
	// :uncomment-end:
	// :state-end:
	// :state-start: aws-test azure-test local-test gcp-test
	extraOptions := map[string]interface{}{
		"mongocryptdSpawnPath": os.Getenv("MONGCRYPTD_PATH"),
	}
	// :state-end:
	// end-extra-options
	regularClient, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
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
		"name":      "Jon Doe",
		"ssn":       241014209,
		"bloodType": "AB+",
		// :state-start: local-test aws-test azure-test gcp-test
		"key-id": "demo-data-key",
		// :state-end:
		"medicalRecords": []map[string]interface{} {{
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

	fmt.Println("Finding a document with encrypted client, searching on an encrypted field")
	var resultSecure bson.M
	// :state-start: local-test aws-test azure-test gcp-test
	err = secureClient.Database(dbName).Collection(collName).FindOne(context.TODO(), bson.D{{"name", "Jon Doe"}}).Decode(&resultSecure)
	// :state-end:
	// :state-start: local-reader aws-reader azure-reader gcp-reader
	// :uncomment-start:
	//err = secureClient.Database(dbName).Collection(collName).FindOne(context.TODO(), bson.D{{"ssn", "241014209"}}).Decode(&resultSecure)
	// :uncomment-end:
	// :state-end:
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

