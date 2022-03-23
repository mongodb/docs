package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"
	"time"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

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

	// begin create and insert
	coll := client.Database("sample_training").Collection("posts")

	post := BlogPost{
		Title:       "Annuals vs. Perennials?",
		Author:      "Sam Lee",
		WordCount:   682,
		LastUpdated: time.Now(),
		Tags:        []string{"seasons", "gardening", "flower"},
	}

	_, err = coll.InsertOne(context.TODO(), post)
	if err != nil {
		panic(err)
	}
	// end create and insert

	filter := bson.D{{"author", "Sam Lee"}}

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
