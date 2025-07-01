package main

import (
	"context"
	"fmt"
	"local-rag-mongodb/common" // Directory that contains the GetEmbeddings function
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	ctx := context.Background()

	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	// Connect to your Atlas cluster
	uri := os.Getenv("ATLAS_CONNECTION_STRING")
	if uri == "" {
		log.Fatal("Set your 'ATLAS_CONNECTION_STRING' environment variable.")
	}
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(ctx, clientOptions)
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(ctx)

	// Set the namespace
	coll := client.Database("sample_airbnb").Collection("listingsAndReviews")

	filter := bson.D{
		{"$and",
			bson.A{
				bson.D{
					{"$and",
						bson.A{
							bson.D{{"summary", bson.D{{"$exists", true}}}},
							bson.D{{"summary", bson.D{{"$ne", ""}}}},
						},
					}},
				bson.D{{"embeddings", bson.D{{"$exists", false}}}},
			}},
	}

	opts := options.Find().SetLimit(250)

	cursor, err := coll.Find(ctx, filter, opts)
	if err != nil {
		panic(err)
	}

	var listings []common.Listing
	if err = cursor.All(ctx, &listings); err != nil {
		panic(err)
	}

	var summaries []string
	for _, listing := range listings {
		summaries = append(summaries, listing.Summary)
	}

	fmt.Println("Generating embeddings.")
	embeddings := common.GetEmbeddings(summaries)

	var docsMatchedCount int
	var docsUpdatedCount int
	for i, listing := range listings {
		filter := bson.D{{"_id", listing.ID}}
		update := bson.D{{"$set", bson.D{{"embeddings", embeddings[i]}}}}
		result, err := coll.UpdateOne(context.TODO(), filter, update)
		if err != nil {
			panic(err)
		}
		if result.MatchedCount == 1 {
			docsMatchedCount += 1
		}
		if result.ModifiedCount == 1 {
			docsUpdatedCount += 1
		}
	}

	fmt.Printf("Documents matched: %v\n", docsMatchedCount)
	fmt.Printf("Documents updated: %v\n", docsUpdatedCount)
}
