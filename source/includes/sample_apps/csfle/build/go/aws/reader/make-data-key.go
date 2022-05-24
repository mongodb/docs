package main

import (
	"context"
	"encoding/base64"
	"fmt"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func MakeKey() error {
	err := godotenv.Load()

	// start-kmsproviders
	provider := "aws"
	kmsProviders := map[string]map[string]interface{}{
		provider: {
			"accessKeyId":     "<Your AWS Access Key ID>",
			"secretAccessKey": "<Your AWS Secret Access Key>",
		},
	}
	// end-kmsproviders

	// start-datakeyopts
	masterKey := map[string]interface{}{
		"key":    "<Your AWS Key ARN>",
		"region": "<Your AWS Key Region>",
	}
	// end-datakeyopts

	// start-create-dek
	uri := "<Your MongoDB URI>"
	keyVaultNamespace := "encryption.__keyVault"
	clientEncryptionOpts := options.ClientEncryption().SetKeyVaultNamespace(keyVaultNamespace).SetKmsProviders(kmsProviders)
	keyVaultClient, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		return fmt.Errorf("Client encryption connect error %v", err)
	}
	clientEnc, err := mongo.NewClientEncryption(keyVaultClient, clientEncryptionOpts)
	if err != nil {
		return fmt.Errorf("NewClientEncryption error %v", err)
	}
	defer func() {
		_ = clientEnc.Close(context.TODO())
	}()

	dataKeyOpts := options.DataKey().
		SetMasterKey(masterKey)
	dataKeyID, err := clientEnc.CreateDataKey(context.TODO(), provider, dataKeyOpts)
	if err != nil {
		return fmt.Errorf("create data key error %v", err)
	}

	fmt.Printf("DataKeyId [base64]: %s\n", base64.StdEncoding.EncodeToString(dataKeyID.Data))
	// end-create-dek
	return nil
}
