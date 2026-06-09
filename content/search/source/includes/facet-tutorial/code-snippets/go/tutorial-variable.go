package main

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	// Connects to your Atlas cluster
	client, err := mongo.Connect(options.Client().ApplyURI("<connection-string>"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	// Sets the namespace
	collection := client.Database("sample_mflix").Collection("movies")

	// Defines the pipeline stages
	searchStage := bson.D{{Key: "$search", Value: bson.M{
		"index": "facet-tutorial",
		"facet": bson.M{
			"operator": bson.M{
				"near": bson.M{
					"path":   "released",
					"origin": time.Date(1921, time.November, 1, 0, 0, 0, 0, time.UTC),
					"pivot":  7776000000},
			},
			"facets": bson.M{
				"genresFacet": bson.M{
					"path": "genres",
					"type": "string"},
				"yearFacet": bson.M{
					"path":       "year",
					"type":       "number",
					"boundaries": bson.A{1910, 1920, 1930, 1940}},
			},
		},
	}}}

	facetStage := bson.D{{Key: "$facet", Value: bson.D{
		{Key: "meta", Value: bson.A{
			bson.D{{Key: "$replaceWith", Value: "$$SEARCH_META"}},
			bson.D{{Key: "$limit", Value: 1}},
		}},
	}}}
	setStage := bson.D{{Key: "$set", Value: bson.D{
		{Key: "meta", Value: bson.D{
			{Key: "$arrayElemAt", Value: bson.A{"$meta", 0}},
		}},
	}}}

	// Runs the pipeline
	cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage, facetStage, setStage})
	if err != nil {
		panic(err)
	}

	// Prints the results
	var results []bson.D
	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}
	for _, result := range results {
		fmt.Println(result)
	}
}
