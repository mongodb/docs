package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	uri := os.Getenv("MONGODB_URI")
	if uri == "" {
		log.Panic(`'uri' is empty. Ensure you set the 'MONGODB_URI'
		environment variable, or set the value of 'uri' to your
		Atlas connection string.`)
	}
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		log.Panic(err)
	}

	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Panic(err)
		}
	}()

	coll := client.Database("sample_mflix").Collection("movies")
	title := "Back to the Future"

	var result bson.M
	err = coll.FindOne(context.TODO(), bson.D{{"title", title}}).Decode(&result)
	if err == mongo.ErrNoDocuments {
		fmt.Printf("No document was found with the title %s\n", title)
		return
	}
	if err != nil {
		log.Panic(err)
	}

	jsonData, err := json.MarshalIndent(result, "", "    ")
	if err != nil {
		log.Panic(err)
	}
	fmt.Printf("%s\n", jsonData)
}
