package main

import (
	"context"
	"fmt"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

const (
	KeyVaultNamespace = "encryption.__keyVault"
	DbName            = "medicalRecords"
	CollName          = "patients"
	KeyAltName        = "demo-data-key"
)

var URI string = os.Getenv("MONGODB_URI")

func main() {
	err := godotenv.Load()
	provider := "aws"
	kmsProviders := map[string]map[string]interface{}{
		provider: {
			"accessKeyId":     os.Getenv("AWS_ACCESS_KEY_ID"),
			"secretAccessKey": os.Getenv("AWS_SECRET_ACCESS_KEY"),
		},
	}
	masterKey := map[string]interface{}{
		"key":    os.Getenv("AWS_KEY_ARN"),
		"region": os.Getenv("AWS_KEY_REGION"),
	}

	// start_mongoclient
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(URI))
	if err != nil {
		panic(fmt.Errorf("Client connect error %v", err))
	}
	// end_mongoclient

	// start_client_enc
	coll := client.Database(DbName).Collection(CollName)
	clientEncryptionOpts := options.ClientEncryption().SetKeyVaultNamespace(KeyVaultNamespace).SetKmsProviders(kmsProviders)
	clientEnc, err := mongo.NewClientEncryption(client, clientEncryptionOpts)
	if err != nil {
		panic(fmt.Errorf("NewClientEncryption error %v", err))
	}
	defer func() {
		_ = clientEnc.Close(context.TODO())
	}()
	// end_client_enc

	dataKeyOpts := options.DataKey().
		SetMasterKey(masterKey).
		SetKeyAltNames([]string{KeyAltName})
	dataKeyID, err := clientEnc.CreateDataKey(context.TODO(), provider, dataKeyOpts)
	if err != nil {
		panic(fmt.Errorf("create data key error %v", err))
	}

	// start_enc_and_insert
	nameRawValueType, nameRawValueData, err := bson.MarshalValue("Greg")
	if err != nil {
		panic(err)
	}
	nameRawValue := bson.RawValue{Type: nameRawValueType, Value: nameRawValueData}
	nameEncryptionOpts := options.Encrypt().
		SetAlgorithm("AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic").
		SetKeyID(dataKeyID)
	nameEncryptedField, err := clientEnc.Encrypt(
		context.TODO(),
		nameRawValue,
		nameEncryptionOpts)
	if err != nil {
		panic(err)
	}
	foodsRawValueType, foodsRawValueData, err := bson.MarshalValue(bson.A{"Grapes", "Cheese"})
	if err != nil {
		panic(err)
	}
	foodsRawValue := bson.RawValue{Type: foodsRawValueType, Value: foodsRawValueData}
	encryptionOpts := options.Encrypt().
		SetAlgorithm("AEAD_AES_256_CBC_HMAC_SHA_512-Random").
		SetKeyID(dataKeyID)
	foodsEncryptedField, err := clientEnc.Encrypt(
		context.TODO(),
		foodsRawValue,
		encryptionOpts)
	if err != nil {
		panic(err)
	}

	_, err = coll.InsertOne(
		context.TODO(),
		bson.D{{"name", nameEncryptedField}, {"foods", foodsEncryptedField}, {"age", 83}})
	if err != nil {
		panic(err)
	}
	// end_enc_and_insert

	// start_find_decrypt
	nameQueryRawValueType, nameQueryRawValueData, err := bson.MarshalValue("Greg")
	if err != nil {
		panic(err)
	}
	nameQueryRawValue := bson.RawValue{Type: nameQueryRawValueType, Value: nameQueryRawValueData}
	nameQueryEncryptionOpts := options.Encrypt().
		SetAlgorithm("AEAD_AES_256_CBC_HMAC_SHA_512-Deterministic").
		SetKeyID(dataKeyID)
	nameQueryEncryptedField, err := clientEnc.Encrypt(
		context.TODO(),
		nameQueryRawValue,
		nameQueryEncryptionOpts)
	if err != nil {
		panic(err)
	}
	var result bson.M
	err = coll.FindOne(
		context.TODO(),
		bson.D{{"name", nameQueryEncryptedField}}).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return
		}
		panic(err)
	}
	fmt.Printf("Encrypted Document: %s\n", result)
	nameDecrypted, err := clientEnc.Decrypt(
		context.TODO(),
		result["name"].(primitive.Binary))
	foodsDecrypted, err := clientEnc.Decrypt(
		context.TODO(),
		result["foods"].(primitive.Binary))
	result["foods"] = foodsDecrypted
	result["name"] = nameDecrypted
	fmt.Printf("Decrypted Document: %s\n", result)
	// end_find_decrypt
	return
}
