// Specifies struct tags on a struct by using the Go driver
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// Specifies a different name for the "WordCount" field when marshalling
// begin struct
type BlogPost struct {
	Title       string
	Author      string
	WordCount   int `bson:"word_count"`
	LastUpdated time.Time
	Tags        []string
}

// end struct

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}

	client, err := mongo.Connect(options.Client().ApplyURI(uri))

	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// begin create and insert
	coll := client.Database("sample_training").Collection("posts")

	post := BlogPost{
		Title:       "Annuals vs. Perennials?",
		Author:      "Sam Lee",
		WordCount:   682,
		LastUpdated: time.Now(),
		Tags:        []string{"seasons", "gardening", "flower"},
	}

	// Inserts a document describing a blog post into the collection
	_, err = coll.InsertOne(context.TODO(), post)
	if err != nil {
		panic(err)
	}
	// end create and insert

	filter := bson.D{{"author", "Sam Lee"}}

	// Retrieves the inserted document and prints it as bson.M to see the
	// alternate field name for "WordCount"
	var result bson.M
	err = coll.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			return
		}
		panic(err)
	}

	output, err := json.MarshalIndent(result, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("%s\n", output)
}
