package common

import (
	"context"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type Document struct {
	Summary    string  `bson:"summary"`
	ListingURL string  `bson:"listing_url"`
	Score      float64 `bson:"score"`
}

func RetrieveDocuments(query string) []Document {
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

	var array []string
	array = append(array, query)
	queryEmbedding := GetEmbeddings(array)

	vectorSearchStage := bson.D{
		{"$vectorSearch", bson.D{
			{"index", "vector_index"},
			{"path", "embeddings"},
			{"queryVector", queryEmbedding[0]},
			{"exact", true},
			{"limit", 5},
		}}}

	projectStage := bson.D{
		{"$project", bson.D{
			{"_id", 0},
			{"summary", 1},
			{"listing_url", 1},
			{"score", bson.D{{"$meta", "vectorSearchScore"}}},
		}}}

	cursor, err := coll.Aggregate(ctx, mongo.Pipeline{vectorSearchStage, projectStage})

	if err != nil {
		log.Fatalf("failed to retrieve data from the server: %v", err)
	}
	var results []Document
	if err = cursor.All(ctx, &results); err != nil {
		log.Fatalf("failed to unmarshal retrieved docs to model objects: %v", err)
	}

	return results
}
