package main

import (
	"context"
	"encoding/base64"
	"fmt"

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
	dataKeyOpts := options.DataKey()
	dataKeyID, err := clientEnc.CreateDataKey(context.TODO(), provider, dataKeyOpts)
	if err != nil {
		return fmt.Errorf("create data key error %v", err)
	}

	fmt.Printf("DataKeyId [base64]: %s\n", base64.StdEncoding.EncodeToString(dataKeyID.Data))
	// end-create-dek
	return nil
}
