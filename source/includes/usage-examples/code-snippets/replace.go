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

	// begin replace
	coll := client.Database("insertDB").Collection("haikus")
	filter := bson.D{{"title", "Record of a Shriveled Datum"}}
	replacement := bson.D{{"title", "Dodging Greys"}, {"text", "When there're no matches, no longer need to panic. You can use upsert"}}

	result, err := coll.ReplaceOne(context.TODO(), filter, replacement)
	if err != nil {
		panic(err)
	}
	// end replace

	// When you run this file for the first time, it should print:
	// Number of documents replaced: 1
	if result.MatchedCount != 0 {
		fmt.Println("Number of documents replaced: %d\n", result.ModifiedCount)
	}
}
