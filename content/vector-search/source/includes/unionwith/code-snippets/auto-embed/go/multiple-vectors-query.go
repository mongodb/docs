package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	ctx := context.Background()

	// Replace the placeholder with your connection string
	const uri = "<connectionString>"

	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatalf("failed to connect to the server: %v", err)
	}
	defer func() { _ = client.Disconnect(ctx) }()

	coll := client.Database("sample_mflix").Collection("embedded_movies")

	pipeline := mongo.Pipeline{
		bson.D{{Key: "$rankFusion", Value: bson.D{
			{Key: "input", Value: bson.D{
				{Key: "pipelines", Value: bson.D{
					{Key: "vectorPipeline1", Value: bson.A{
						bson.D{{Key: "$vectorSearch", Value: bson.D{
							{Key: "index", Value: "multiple-auto-embed-search"},
							{Key: "path", Value: "fullplot"},
							{Key: "query", Value: bson.D{Key: "text", Value: "light-hearted comedy with ghosts"}},
							{Key: "numCandidates", Value: 2000},
							{Key: "limit", Value: 50},
						}}},
					}},
					{Key: "vectorPipeline2", Value: bson.A{
						bson.D{{Key: "$vectorSearch", Value: bson.D{
							{Key: "index", Value: "multiple-auto-embed-search"},
							{Key: "path", Value: "fullplot"},
							{Key: "query", Value: bson.D{Key: "text", Value: "slapstick humor with paranormal events"}},
							{Key: "numCandidates", Value: 2000},
							{Key: "limit", Value: 50},
						}}},
					}},
				}},
			}},
			{Key: "combination", Value: bson.D{
				{Key: "weights", Value: bson.D{
					{Key: "vectorPipeline1", Value: 0.5},
					{Key: "vectorPipeline2", Value: 0.5},
				}},
			}},
			{Key: "scoreDetails", Value: true},
		}}},
		bson.D{{Key: "$project", Value: bson.D{
			{Key: "_id", Value: 1},
			{Key: "title", Value: 1},
			{Key: "fullplot", Value: 1},
			{Key: "scoreDetails", Value: bson.D{{Key: "$meta", Value: "scoreDetails"}}},
		}}},
		bson.D{{Key: "$limit", Value: 20}},
	}

	cursor, err := coll.Aggregate(ctx, pipeline)
	if err != nil {
		log.Fatalf("failed to run aggregation: %v", err)
	}
	defer cursor.Close(ctx)

	var results []bson.M
	if err := cursor.All(ctx, &results); err != nil {
		log.Fatalf("failed to decode results: %v", err)
	}
	for _, doc := range results {
		fmt.Println(doc)
	}
}
