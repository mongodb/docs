//	:replace-start: {
//	  "terms": {
//	    "package local_rag": "package main",
//	    "utils.GetConnectionString()": "os.Getenv(\"MONGODB_URI\")",
//	    "[]Listing": "[]common.Listing",
//	    "GetEmbeddings(summaries)": "common.GetEmbeddings(summaries)",
//	    "EmbeddingsField": "\"embeddings\""
//	  }
//	}
//
// :snippet-start: generate-embeddings
package local_rag

import (
	"context"
	"fmt" // :remove:
	//:uncomment-start:
	//"local-rag-mongodb/common" // Module that contains the models and GetEmbeddings function
	//:uncomment-end:
	"log"
	//:uncomment-start:
	//"os"
	//:uncomment-end:
	"driver-examples/utils" //:remove:

	//:uncomment-start:
	//"github.com/joho/godotenv"
	//:uncomment-end:
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// :uncomment-start:
// func main() {
// :uncomment-end:
func GenerateEmbeddings() string { // :remove:
	ctx := context.Background()

	// :remove-start:
	// The tests load environment variables through the suite's utils package,
	// which reads the .env file at the root of the Go suite.
	// :remove-end:
	// :uncomment-start:
	// if err := godotenv.Load(); err != nil {
	// 	log.Fatal("no .env file found")
	// }
	// :uncomment-end:

	// Connect to your MongoDB cluster
	uri := utils.GetConnectionString()
	if uri == "" {
		log.Fatal("set your 'MONGODB_URI' environment variable.")
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
				bson.D{{Key: EmbeddingsField, Value: bson.D{{Key: "$exists", Value: false}}}},
			}},
	}

	findOptions := options.Find().SetLimit(250)

	cursor, err := coll.Find(ctx, filter, findOptions)
	if err != nil {
		log.Fatalf("failed to retrieve data from the server: %v", err)
	}

	var listings []Listing
	if err = cursor.All(ctx, &listings); err != nil {
		log.Fatalf("failed to unmarshal retrieved docs to model objects: %v", err)
	}

	var summaries []string
	for _, listing := range listings {
		summaries = append(summaries, listing.Summary)
	}

	log.Println("Generating embeddings.")
	embeddings := GetEmbeddings(summaries)

	updateDocuments := make([]mongo.WriteModel, len(listings))
	for i := range updateDocuments {
		updateDocuments[i] = mongo.NewUpdateOneModel().
			SetFilter(bson.D{{Key: "_id", Value: listings[i].ID}}).
			SetUpdate(bson.D{{Key: "$set", Value: bson.D{{Key: EmbeddingsField, Value: embeddings[i]}}}})
	}

	bulkWriteOptions := options.BulkWrite().SetOrdered(false)

	result, err := coll.BulkWrite(ctx, updateDocuments, bulkWriteOptions)
	if err != nil {
		log.Fatalf("failed to update documents: %v", err)
	}

	log.Printf("%d documents updated successfully.", result.MatchedCount)
	// :remove-start:
	return fmt.Sprintf("%d documents updated successfully.", result.MatchedCount)
	// :remove-end:
}

// :snippet-end:
// :replace-end:
