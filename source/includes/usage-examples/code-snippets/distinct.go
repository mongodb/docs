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

	// begin distinct
	coll := client.Database("sample_mflix").Collection("movies")
	filter := bson.D{{"directors", "Natalie Portman"}}

	results, err := coll.Distinct(context.TODO(), "title", filter)
	if err != nil {
		panic(err)
	}	
	// end distinct

	// When you run this file, it should print:
	// A Tale of Love and Darkness
	// New York, I Love You
	for _, result := range results {
		fmt.Println(result)
	}
}
