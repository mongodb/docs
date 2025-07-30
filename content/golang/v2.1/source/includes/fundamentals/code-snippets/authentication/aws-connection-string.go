var accessKeyID, secretAccessKey string
awsCredential := options.Credential{
	AuthMechanism: "MONGODB-AWS",
	AuthSource:    "<authenticationDb>",
	Username:      "<accessKeyID>",
	Password:      "<secretAccessKey>",
}

awsIAMClient, err := mongo.Connect(options.Client().SetAuth(awsCredential))
if err != nil {
	panic(err)
}
_ = awsIAMClient