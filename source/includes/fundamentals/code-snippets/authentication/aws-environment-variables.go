envVariablesCredential := options.Credential{
	AuthMechanism: "MONGODB-AWS",
}
envVariablesClient, err := mongo.Connect(
	context.TODO(),
	options.Client().SetAuth(envVariablesCredential))
if err != nil {
	panic(err)
}
_ = envVariablesClient