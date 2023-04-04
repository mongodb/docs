var accessKeyID, secretAccessKey, sessionToken string
assumeRoleCredential := options.Credential{
	AuthMechanism: "MONGODB-AWS",
	AuthSource:    "<authenticationDb>",
	Username:      "<accessKeyID>",
	Password:      "<secretAccessKey>",
	AuthMechanismProperties: map[string]string{
		"AWS_SESSION_TOKEN": "<sessionToken>",
	},
}
assumeRoleClient, err := mongo.Connect(context.TODO(),
	options.Client().SetAuth(assumeRoleCredential))