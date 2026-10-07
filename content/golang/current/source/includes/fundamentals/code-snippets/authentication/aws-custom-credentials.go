awsConfig, err := config.LoadDefaultConfig(context.TODO())
if err != nil {
	panic(err)
}

awsSdkCredential := options.Credential{
	AuthMechanism:          "MONGODB-AWS",
	AWSCredentialsProvider: awsauth.NewCredentialsProvider(awsConfig.Credentials),
}

awsSdkClient, err := mongo.Connect(options.Client().SetAuth(awsSdkCredential))
if err != nil {
	panic(err)
}
_ = awsSdkClient
