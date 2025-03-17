package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	// connect to your Atlas cluster
	client, err := mongo.Connect(options.Client().ApplyURI("<connection-string>"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	// set namespace
	collection := client.Database("sample_mflix").Collection("movies")

	// define pipeline stages
	searchStage := bson.D{
		{"$search", bson.D{
			{"index", "autocomplete-tutorial"},
			{"compound", bson.D{
				{"should", bson.A{
					bson.D{
						{"autocomplete", bson.D{{"query", "pri"}, {"path", "title"}}},
					},
					bson.D{
						{"autocomplete", bson.D{{"query", "pri"}, {"path", "plot"}}},
					},
				}},
				{"minimumShouldMatch", 1},
			}},
		}},
	}
	limitStage := bson.D{{"$limit", 5}}
	projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"plot", 1}, {"_id", 0}}}}
	// run pipeline
	cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage, limitStage, projectStage})
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
