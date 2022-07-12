package main

import (
	"context"
	"encoding/base64"
	"fmt"
	"log"

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
//	"crypto/rand"
//	"io/ioutil"
//)
// :uncomment-end:
// :state-end:

// :state-start: local-test local-reader
// :uncomment-start:
//func localMasterKey() []byte {
//	key := make([]byte, 96)
//	if _, err := rand.Read(key); err != nil {
//		log.Fatalf("Unable to create a random 96 byte data key: %v", err)
//	}
//	if err := ioutil.WriteFile("master-key.txt", key, 0644); err != nil {
//		log.Fatalf("Unable to write key to file: %v", err)
//	}
//	return key
//}
// :uncomment-end:
// :state-end:

func MakeKey() error {

	// :state-start: local-test local-reader
	localMasterKey()
	// :state-end:

	// start-kmsproviders
	// :state-start: local-test local-reader
	// :uncomment-start:
	//key, err := ioutil.ReadFile("master-key.txt")
	//if err != nil {
	//	log.Fatalf("Could not read the key from master-key.txt: %v", err)
	//}
	//provider := "local"
	//kmsProviders := map[string]map[string]interface{} { "local":{ "key": key}}
	// :uncomment-end:
	// :state-end:
	// :state-uncomment-start: aws-reader
	//provider := "aws"
	//kmsProviders := map[string]map[string]interface{} {
	//	provider:{
	//	  "accessKeyId": "<Your AWS Access Key ID>",
	//	  "secretAccessKey" : "<Your AWS Secret Access Key>",
	//	},
	//}
	// :state-uncomment-end:
	// :state-uncomment-start: aws-test
	//provider := "aws"
	//kmsProviders := map[string]map[string]interface{} {
	//	provider:{
	//	  "accessKeyId": os.Getenv("AWS_ACCESS_KEY_ID"),
	//	  "secretAccessKey" : os.Getenv("AWS_SECRET_ACCESS_KEY"),
	//	},
	//}
	// :state-uncomment-end:
	// :state-uncomment-start: azure-reader
	//provider := "azure"
	//kmsProviders := map[string]map[string]interface{} {
	//	provider:{
	//		"tenantId": "<Your Azure Tenant ID>",
	//		"clientId": "<Your Azure Client ID>",
	//		"clientSecret": "<Your Azure Client Secret>",
	//	},
	//}
	// :state-uncomment-end:
	// :state-uncomment-start: azure-test
	//provider := "azure"
	//kmsProviders := map[string]map[string]interface{} {
	//	provider:{
	//		"tenantId": os.Getenv("AZURE_TENANT_ID"),
	//		"clientId": os.Getenv("AZURE_CLIENT_ID"),
	//		"clientSecret": os.Getenv("AZURE_CLIENT_SECRET"),
	//	},
	//}
	// :state-uncomment-end:
	// :state-uncomment-start: gcp-reader
	//provider := "gcp"
	//kmsProviders := map[string]map[string]interface{} {
	//	provider: {
	//		"email": "<Your GCP Email>",
	//		"privateKey": "<Your GCP Private Key>",
	//	},
	//}
	// :state-uncomment-end:
	// :state-uncomment-start: gcp-test
	//provider := "gcp"
	//kmsProviders := map[string]map[string]interface{} {
	//	provider: {
	//		"email": os.Getenv("GCP_EMAIL"),
	//		"privateKey": os.Getenv("GCP_PRIVATE_KEY"),
	//	},
	//}
	// :state-uncomment-end:
	// end-kmsproviders

	// start-datakeyopts
	// :state-start: local-reader local-test
	// :state-end:
	// :state-uncomment-start: aws-reader
	//masterKey := map[string]interface{} {
	//	"key": "<Your AWS Key ARN>",
	//	"region": "<Your AWS Key Region>",
	//}
	// :state-uncomment-end:
	// :state-uncomment-start: aws-test
	//masterKey := map[string]interface{} {
	//	"key": os.Getenv("AWS_KEY_ARN"),
	//	"region": os.Getenv("AWS_KEY_REGION"),
	//}
	// :state-uncomment-end:
	// :state-uncomment-start: azure-reader
	//masterKey := map[string]interface{} {
	//	"keyVaultEndpoint": "<Your Azure Key Vault Endpoint>",
	//	"keyName": "<Your Azure Key Name>",
	//}
	// :state-uncomment-end:
	// :state-uncomment-start: azure-test
	//masterKey := map[string]interface{} {
	//	"keyVaultEndpoint": os.Getenv("AZURE_KEY_VAULT_ENDPOINT"),
	//	"keyName": os.Getenv("AZURE_KEY_NAME"),
	//}
	// :state-uncomment-end:
	// :state-uncomment-start: gcp-reader
	//masterKey := map[string]interface{} {
	//		"projectId": "<Your GCP Project ID>",
	//		"location":  "<Your GCP Location>",
	//		"keyRing":   "<Your GCP Key Ring>",
	//		"keyName":   "<Your GCP Key Name>",
	//}	
	// :state-uncomment-end:
	// :state-uncomment-start: gcp-test
	//masterKey := map[string]interface{} {
	//		"projectId": os.Getenv("GCP_PROJECT_ID"),
	//		"location":  os.Getenv("GCP_LOCATION"),
	//		"keyRing":   os.Getenv("GCP_KEY_RING"),
	//		"keyName":   os.Getenv("GCP_KEY_NAME"),
	//}	
	// :state-uncomment-end:
	// end-datakeyopts

	// start-create-index
	// :state-start: local-reader aws-reader gcp-reader azure-reader
	// :uncomment-start:
	//uri := "<Your MongoDB URI>"
	// :uncomment-end:
	// :state-end:
	// :state-start: local-test aws-test gcp-test azure-test
	uri := os.Getenv("MONGODB_URI")
	// :state-end:
	keyVaultClient, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
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

	// start-create-dek
	clientEncryptionOpts := options.ClientEncryption().SetKeyVaultNamespace(keyVaultNamespace).SetKmsProviders(kmsProviders)
	clientEnc, err := mongo.NewClientEncryption(keyVaultClient, clientEncryptionOpts)
	if err != nil {
		return fmt.Errorf("NewClientEncryption error %v", err)
	}
	defer func() {
		_ = clientEnc.Close(context.TODO())
	}()
	// :state-start: local-test aws-test gcp-test azure-test aws-reader azure-reader gcp-reader
	dataKeyOpts := options.DataKey().
	// :state-end:
	// :state-uncomment-start: local-reader
	//dataKeyOpts := options.DataKey()
	// :state-uncomment-end:
	// :state-start: aws-test gcp-test azure-test
	// :uncomment-start:
	//SetMasterKey(masterKey).
	// :uncomment-end:
	// :state-end:
	// :state-start: aws-reader gcp-reader azure-reader
	// :uncomment-start:
	//SetMasterKey(masterKey)
	// :uncomment-end:
	// :state-end:
	// :state-start: local-test aws-test azure-test gcp-test
	SetKeyAltNames([]string{"demo-data-key"})
	// :state-end:

	dataKeyID, err := clientEnc.CreateDataKey(context.TODO(), provider, dataKeyOpts)
	if err != nil {
		return fmt.Errorf("create data key error %v", err)
	}

	fmt.Printf("DataKeyId [base64]: %s\n",base64.StdEncoding.EncodeToString(dataKeyID.Data))
	// end-create-dek
	return nil
}

