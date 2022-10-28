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
		"compound": bson.M{
			"filter": bson.M{
				"near": bson.M{
					"path":   "released",
					"origin": time.Date(2012, time.June, 25, 0, 0, 0, 0, time.UTC),
					"pivot":  5,
				},
			},
			"should": bson.A{
				bson.M{
					"wildcard": bson.D{
						{"path", "title"},
						{"query", "Prance*"},
						{"score", bson.M{"constant": bson.M{"value": 99}}},
						{"allowAnalyzedField", true},
					}},
				bson.M{
					"wildcard": bson.D{
						{"path", "title"},
						{"query", "Prince*"},
						{"score", bson.M{"constant": bson.M{"value": 95}}},
						{"allowAnalyzedField", true},
					}},
			},
		},
		"returnStoredSource": true}}}

	limitStage := bson.D{{"$limit", 5}}
	projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"_id", 0}, {"score", bson.D{{"$meta", "searchScore"}}}}}}

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
