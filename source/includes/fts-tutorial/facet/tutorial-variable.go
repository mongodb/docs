package main

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// connect to your Atlas cluster
	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI("<connection-string>"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	// set namespace
	collection := client.Database("sample_mflix").Collection("movies")

	// define pipeline stages
	searchStage := bson.D{{"$search", bson.M{
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

	facetStage:= bson.D{{"$facet", bson.D{
        {"meta", bson.A{
            bson.D{{"$replaceWith", "$$SEARCH_META"}},
            bson.D{{"$limit", 1}},
        }},
    }}}
	setStage:= bson.D{{"$set", bson.D{
        {"meta", bson.D{
            {"$arrayElemAt", bson.A{"$meta",  0}},
        }},
    }}}

	// run pipeline
	cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage, facetStage, setStage})
	if err != nil {
		panic(err)
	}

	// print results
	var results []bson.D
	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}
	for _, result := range results {
		fmt.Println(result)
	}
}
