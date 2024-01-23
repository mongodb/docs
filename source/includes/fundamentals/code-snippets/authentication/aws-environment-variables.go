envVariablesCredential := options.Credential{
	AuthMechanism: "MONGODB-AWS",
}

envVariablesClient, err := mongo.Connect(options.Client().SetAuth(envVariablesCredential))
if err != nil {
	panic(err)
}
_ = envVariablesClient