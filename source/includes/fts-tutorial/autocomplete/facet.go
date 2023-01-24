package main

import (
	"context"
	"fmt"

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
	searchMetaStage := bson.D{{"$searchMeta", bson.M{
		"facet": bson.M{
			"operator": bson.M{
				"autocomplete": bson.M{
					"path": "title", "query": "Gravity",
				},
			},
			"facets": bson.M{
				"titleFacet": bson.M{
					"path": "title", "type": "string",
				},
			},
		},
	}}}

	// run pipeline
	cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchMetaStage})
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
