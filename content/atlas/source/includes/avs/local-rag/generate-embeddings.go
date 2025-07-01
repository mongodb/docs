package main

import (
	"context"
	"local-rag-mongodb/common" // Module that contains the models and GetEmbeddings function
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	ctx := context.Background()

	if err := godotenv.Load(); err != nil {
		log.Fatal("no .env file found")
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
		{Key: "$and",
			Value: bson.A{
				bson.D{
					{Key: "$and",
						Value: bson.A{
							bson.D{{Key: "summary", Value: bson.D{{Key: "$exists", Value: true}}}},
							bson.D{{Key: "summary", Value: bson.D{{Key: "$ne", Value: ""}}}},
						},
					}},
				bson.D{{Key: "embeddings", Value: bson.D{{Key: "$exists", Value: false}}}},
			}},
	}

	findOptions := options.Find().SetLimit(250)

	cursor, err := coll.Find(ctx, filter, findOptions)
	if err != nil {
		log.Fatalf("failed to retrieve data from the server: %v", err)
	}

	var listings []common.Listing
	if err = cursor.All(ctx, &listings); err != nil {
		log.Fatalf("failed to unmarshal retrieved docs to model objects: %v", err)
	}

	var summaries []string
	for _, listing := range listings {
		summaries = append(summaries, listing.Summary)
	}

	log.Println("Generating embeddings.")
	embeddings := common.GetEmbeddings(summaries)

	updateDocuments := make([]mongo.WriteModel, len(listings))
	for i := range updateDocuments {
		updateDocuments[i] = mongo.NewUpdateOneModel().
			SetFilter(bson.D{{Key: "_id", Value: listings[i].ID}}).
			SetUpdate(bson.D{{Key: "$set", Value: bson.D{{Key: "embeddings", Value: embeddings[i]}}}})
	}

	bulkWriteOptions := options.BulkWrite().SetOrdered(false)

	result, err := coll.BulkWrite(ctx, updateDocuments, bulkWriteOptions)
	if err != nil {
		log.Fatalf("failed to update documents: %v", err)
	}

	log.Printf("%d documents updated successfully.", result.MatchedCount)
}
