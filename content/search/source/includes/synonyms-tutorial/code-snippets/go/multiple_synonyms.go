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

	// Get the transport_synonyms collection
	transportCollection := database.Collection("transport_synonyms")

	// Create and insert the first transport document - equivalent mapping
	doc1 := bson.D{
		{"mappingType", "equivalent"},
		{"synonyms", bson.A{"car", "vehicle", "automobile"}},
	}

	_, err = transportCollection.InsertOne(ctx, doc1)
	if err != nil {
		log.Fatal(err)
	}

	// Create and insert the second transport document - explicit mapping
	doc2 := bson.D{
		{"mappingType", "explicit"},
		{"input", bson.A{"boat"}},
		{"synonyms", bson.A{"boat", "vessel", "sail"}},
	}

	_, err = transportCollection.InsertOne(ctx, doc2)
	if err != nil {
		log.Fatal(err)
	}

	// Create the attire_synonyms collection
	err = database.CreateCollection(ctx, "attire_synonyms")
	if err != nil {
		// Collection may already exist, which is fine
		fmt.Printf("Note: %v\n", err)
	}

	// Get the attire_synonyms collection
	attireCollection := database.Collection("attire_synonyms")

	// Create and insert the first attire document - equivalent mapping
	doc3 := bson.D{
		{"mappingType", "equivalent"},
		{"synonyms", bson.A{"dress", "apparel", "attire"}},
	}

	_, err = attireCollection.InsertOne(ctx, doc3)
	if err != nil {
		log.Fatal(err)
	}

	// Create and insert the second attire document - explicit mapping
	doc4 := bson.D{
		{"mappingType", "explicit"},
		{"input", bson.A{"hat"}},
		{"synonyms", bson.A{"hat", "fedora", "headgear"}},
	}

	_, err = attireCollection.InsertOne(ctx, doc4)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Println("Synonyms collections successfully created and populated.")
}

