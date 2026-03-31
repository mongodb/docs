package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

const (
	indexName = "vector_index"
)

func main() {
	// Replace with your MongoDB connection string.
	uri := "<connection-string>"

	// Create a context with a timeout for querying.
	ctx, cancel := context.WithTimeout(context.Background(), 2*time.Minute)
	defer cancel()

	// Connect to your deployment.
	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}
	defer func() {
		if err := client.Disconnect(context.Background()); err != nil {
			log.Printf("Error disconnecting client: %v", err)
		}
	}()

	// Access your database and collection.
	db := client.Database("sample_mflix")
	coll := db.Collection("movies")

	// Run a $vectorSearch query using the auto-embedding index.
	if err := runVectorSearchQuery(ctx, coll); err != nil {
		log.Fatalf("Failed to run $vectorSearch query: %v", err)
	}
}

func runVectorSearchQuery(ctx context.Context, coll *mongo.Collection) error {
	pipeline := mongo.Pipeline{
		{{
			"$vectorSearch", bson.D{
				{"index", indexName},
				{"path", "fullplot"},
				{"query", bson.D{
					{"text", "solo traveler discovering new cultures"},
				}},
				{"model", "voyage-4"},
				{"exact", true},
				{"limit", 10},
			},
		}},
		{{
			"$project", bson.D{
				{"_id", 0},
				{"title", 1},
				{"fullplot", 1},
				{"score", bson.D{{"$meta", "vectorSearchScore"}}},
			},
		}},
	}

	cursor, err := coll.Aggregate(ctx, pipeline)
	if err != nil {
		return fmt.Errorf("aggregate: %w", err)
	}
	defer cursor.Close(ctx)

	fmt.Println("Query results:")
	for cursor.Next(ctx) {
		var doc bson.M
		if err := cursor.Decode(&doc); err != nil {
			return fmt.Errorf("decode result: %w", err)
		}

		// Marshal each document to compact JSON (Extended JSON for Decimal128, etc.).
		data, err := json.Marshal(doc)
		if err != nil {
			return fmt.Errorf("marshal result to JSON: %w", err)
		}

		fmt.Println(string(data))
	}
	return cursor.Err()
}