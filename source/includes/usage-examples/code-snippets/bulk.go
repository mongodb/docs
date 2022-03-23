package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environmental variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// begin bulk
	coll := client.Database("insertDB").Collection("haikus")
	models := []mongo.WriteModel{
		mongo.NewReplaceOneModel().SetFilter(bson.D{{"title", "Record of a Shriveled Datum"}}).
			SetReplacement(bson.D{{"title", "Dodging Greys"}, {"text", "When there're no matches, no longer need to panic. You can use upsert"}}),
		mongo.NewUpdateOneModel().SetFilter(bson.D{{"title", "Dodging Greys"}}).
			SetUpdate(bson.D{{"$set", bson.D{{"title", "Dodge The Greys"}}}}),
	}
	opts := options.BulkWrite().SetOrdered(true)

	results, err := coll.BulkWrite(context.TODO(), models, opts)
	// end bulk

	if err != nil {
		panic(err)
	}

	// When you run this file for the first time, it should print:
	// Number of documents replaced or modified: 2
	fmt.Printf("Number of documents replaced or modified: %d", results.ModifiedCount)
}
