package main

import (
	"context"
	"log"
	"my-embeddings-project/common"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	ctx := context.Background()

	if err := godotenv.Load(); err != nil {
		log.Println("no .env file found")
	}

	// Connect to your Atlas cluster
	uri := os.Getenv("ATLAS_CONNECTION_STRING")
	if uri == "" {
		log.Fatal("set your 'ATLAS_CONNECTION_STRING' environment variable.")
	}
	clientOptions := options.Client().ApplyURI(uri)
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		log.Fatalf("failed to connect to the server: %v", err)
	}
	defer func() { _ = client.Disconnect(ctx) }()

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

	opts := options.Find().SetLimit(50)

	cursor, err := coll.Find(ctx, filter, opts)
	if err != nil {
		log.Fatalf("failed to retrieve documents: %v", err)
	}

	var listings []common.Listing
	if err = cursor.All(ctx, &listings); err != nil {
		log.Fatalf("failed to unmarshal retrieved documents to Listing object: %v", err)
	}

	var summaries []string
	for _, listing := range listings {
		summaries = append(summaries, listing.Summary)
	}

	log.Println("Generating embeddings.")
	embeddings := common.GetEmbeddings(summaries)

	docsToUpdate := make([]mongo.WriteModel, len(listings))
	for i := range listings {
		docsToUpdate[i] = mongo.NewUpdateOneModel().
			SetFilter(bson.D{{"_id", listings[i].ID}}).
			SetUpdate(bson.D{{"$set", bson.D{{"embeddings", embeddings[i]}}}})
	}
	bulkWriteOptions := options.BulkWrite().SetOrdered(false)

	result, err := coll.BulkWrite(context.Background(), docsToUpdate, bulkWriteOptions)
	if err != nil {
		log.Fatalf("failed to write embeddings to existing documents: %v", err)
	}
	log.Printf("Successfully added embeddings to %v documents", result.ModifiedCount)
}
