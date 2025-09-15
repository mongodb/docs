clientEncryptionOpts := options.ClientEncryption().SetKeyVaultNamespace(KeyVaultNamespace).SetKmsProviders(kmsProviders)
keyVaultClient, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(URI))
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
masterKey := map[string]interface{}{
	"<Your dataKeyOpts Key>": "<Your dataKeyOpts Value>",
}
dataKeyOpts := options.DataKey().
	SetMasterKey(masterKey).
	SetKeyAltNames([]string{"<Your Key Alt Name>"})
dataKeyID, err := clientEnc.CreateDataKey(context.TODO(), provider, dataKeyOpts)
if err != nil {
	return fmt.Errorf("create data key error %v", err)
}
