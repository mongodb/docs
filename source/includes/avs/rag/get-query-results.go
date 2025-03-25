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

type TextWithScore struct {
	PageContent string  `bson:"pageContent"`
	Score       float64 `bson:"score"`
}

func GetQueryResults(query string) []TextWithScore {
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

	// Specify the database and collection
	coll := client.Database("rag_db").Collection("test")

	queryEmbedding := GetEmbeddings([]string{query})

	vectorSearchStage := bson.D{
		{"$vectorSearch", bson.D{
			{"index", "vector_index"},
			{"path", "embedding"},
			{"queryVector", queryEmbedding[0]},
			{"exact", true},
			{"limit", 5},
		}}}

	projectStage := bson.D{
		{"$project", bson.D{
			{"_id", 0},
			{"pageContent", 1},
			{"score", bson.D{{"$meta", "vectorSearchScore"}}},
		}}}

	cursor, err := coll.Aggregate(ctx, mongo.Pipeline{vectorSearchStage, projectStage})

	if err != nil {
		log.Fatalf("failed to execute the aggregation pipeline: %v", err)
	}
	var results []TextWithScore
	if err = cursor.All(context.TODO(), &results); err != nil {
		log.Fatalf("failed to connect unmarshal retrieved documents: %v", err)
	}
	return results
}
