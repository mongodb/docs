package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
	"go.mongodb.org/mongo-driver/v2/mongo/readpref"
)

func main() {
	// Create a context with timeout
	ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
	defer cancel()

	// Connect to MongoDB
	uri := "<connection-string>"
	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}
	defer func() {
		if err = client.Disconnect(ctx); err != nil {
			log.Fatal(err)
		}
	}()

	// Check the connection
	err = client.Ping(ctx, readpref.Primary())
	if err != nil {
		log.Fatal(err)
	}

	// Get the sample_mflix database
	database := client.Database("sample_mflix")

	// Create the transport_synonyms collection
	err = database.CreateCollection(ctx, "transport_synonyms")
	if err != nil {
		// Collection may already exist, which is fine
		fmt.Printf("Note: %v\n", err)
	}

	// Get the collection
	collection := database.Collection("transport_synonyms")

	// Create and insert the first document - equivalent mapping
	doc1 := bson.D{
		{"mappingType", "equivalent"},
		{"synonyms", bson.A{"car", "vehicle", "automobile"}},
	}

	_, err = collection.InsertOne(ctx, doc1)
	if err != nil {
		log.Fatal(err)
	}

	// Create and insert the second document - explicit mapping
	doc2 := bson.D{
		{"mappingType", "explicit"},
		{"input", bson.A{"boat"}},
		{"synonyms", bson.A{"boat", "vessel", "sail"}},
	}

	_, err = collection.InsertOne(ctx, doc2)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Synonyms collections successfully created and populated.")
}