autoEncryptionOpts := options.AutoEncryption().
	SetKmsProviders(kmsProviders).
	SetKeyVaultNamespace(KeyVaultNamespace).
	SetBypassAutoEncryption(true)
client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(URI).SetAutoEncryptionOptions(autoEncryptionOpts))
if err != nil {
	return fmt.Errorf("Connect error for encrypted client: %v", err)
}
defer func() {
	_ = client.Disconnect(context.TODO())
}()
