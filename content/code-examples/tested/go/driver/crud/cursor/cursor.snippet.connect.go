var uri string
if uri = os.Getenv("MONGODB_URI"); uri == "" {
	log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/")
}

client, err := mongo.Connect(options.Client().ApplyURI(uri))

if err != nil {
	panic(err)
}
defer func() {
	if err := client.Disconnect(context.TODO()); err != nil {
		panic(err)
	}
}()

coll := client.Database("db").Collection("sample_data")
