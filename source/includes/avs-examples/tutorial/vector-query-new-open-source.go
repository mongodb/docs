package main

import (
	"context"
	"fmt"
	"log"
	"my-embeddings-project/common"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type TextAndScore struct {
	Text  string  `bson:"text"`
	Score float32 `bson:"score"`
}

func main() {
	ctx := context.Background()

	// Connect to your Atlas cluster
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
	coll := client.Database("sample_db").Collection("embeddings")

	query := "ocean tragedy"
	queryEmbedding := common.GetEmbeddings([]string{query})

	pipeline := mongo.Pipeline{
		bson.D{
			{"$vectorSearch", bson.D{
				{"queryVector", queryEmbedding[0]},
				{"index", "vector_index"},
				{"path", "embedding"},
				{"exact", true},
				{"limit", 5},
			}},
		},
		bson.D{
			{"$project", bson.D{
				{"_id", 0},
				{"text", 1},
				{"score", bson.D{
					{"$meta", "vectorSearchScore"},
				}},
			}},
		},
	}

	// Run the pipeline
	cursor, err := coll.Aggregate(ctx, pipeline)
	if err != nil {
		log.Fatalf("failed to run aggregation: %v", err)
	}
	defer func() { _ = cursor.Close(ctx) }()

	var matchingDocs []TextAndScore
	if err = cursor.All(ctx, &matchingDocs); err != nil {
		log.Fatalf("failed to unmarshal results to TextAndScore objects: %v", err)
	}
	for _, doc := range matchingDocs {
		fmt.Printf("Text: %v\nScore: %v\n", doc.Text, doc.Score)
	}
}
