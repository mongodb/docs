package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	ctx := context.Background()
	uri := os.Getenv("MONGODB_URI")

	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatalf("Failed to connect to MongoDB: %v", err)
	}
	defer client.Disconnect(ctx)

	coll := client.Database("sample_mflix").Collection("embedded_movies")

	// start-auto-embedding-query
	// Creates the $vectorSearch stage that queries the
	// auto-embedding index named "auto_embedding_index"
	vectorSearchStage := bson.D{
		{"$vectorSearch", bson.D{
			{"index", "auto_embedding_index"},
			{"path", "plot"},
			{"query", bson.D{{"text", "time travel"}}},
			{"model", "voyage-4"},
			{"numCandidates", 150},
			{"limit", 10},
		}},
	}

	// Projects only the title and plot fields
	projectStage := bson.D{
		{"$project", bson.D{
			{"_id", 0},
			{"title", 1},
			{"plot", 1},
		}},
	}

	// Runs the aggregation pipeline
	cursor, err := coll.Aggregate(ctx, mongo.Pipeline{vectorSearchStage, projectStage})
	if err != nil {
		log.Fatalf("failed to retrieve data from the server: %v", err)
	}
	defer cursor.Close(ctx)

	type ProjectedMovieResult struct {
		Title string `bson:"title"`
		Plot  string `bson:"plot"`
	}

	var results []ProjectedMovieResult
	if err := cursor.All(ctx, &results); err != nil {
		log.Fatalf("failed to unmarshal retrieved docs: %v", err)
	}

	for _, result := range results {
		fmt.Printf("Title: %v\nPlot: %v\n---\n\n", result.Title, result.Plot)
	}
	// end-auto-embedding-query
}
