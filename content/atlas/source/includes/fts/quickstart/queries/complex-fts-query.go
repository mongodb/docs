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
	var err error
	// connect to the Atlas cluster
	ctx := context.Background()
	client, err := mongo.Connect(options.Client().SetTimeout(5 * time.Second).ApplyURI("<connection-string>"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(ctx)
	// set namespace
	collection := client.Database("sample_mflix").Collection("movies")
	// define pipeline
	searchStage := bson.D{{"$search", bson.M{
		"compound": bson.M{
			"must": bson.A{
				bson.M{
					"text": bson.D{
						{"path", "plot"}, {"query", "baseball"},
					},
				},
			},
			"mustNot": bson.A{
				bson.M{
					"text": bson.M{
						"path": "genres", "query": []string{"Comedy", "Romance"},
					},
				},
			},
		},
	}}}
	limitStage := bson.D{{"$limit", 3}}
	projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"plot", 1}, {"genres", 1}, {"_id", 0}}}}
	// run pipeline
	cursor, err := collection.Aggregate(ctx, mongo.Pipeline{searchStage, limitStage, projectStage})
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
