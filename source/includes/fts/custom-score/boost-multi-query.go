package main

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// define structure of movies collection
type MovieCollection struct {
	title string `bson:"Title,omitempty"`
}

func main() {
	var err error
	// connect to the Atlas cluster and set a maximum operation time
	ctx := context.Background()
	opts := options.Client().
		SetTimeout(5 * time.Second).
		ApplyURI("<connection-string>")

	client, err := mongo.Connect(opts)
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(ctx)
	// set namespace
	collection := client.Database("sample_mflix").Collection("movies")
	// define pipeline
	searchStage := bson.D{{"$search", bson.M{
		"index": "compound-query-custom-score-tutorial",
		"compound": bson.M{
			"must": bson.A{
				bson.M{
					"text": bson.M{
						"path": "genres", "query": "comedy", "score": bson.M{
							"boost": bson.D{{"value", 9}},
						},
					},
				},
				bson.M{
					"text": bson.M{
						"path": "title", "query": "snow", "score": bson.M{
							"boost": bson.D{{"value", 5}},
						},
					},
				},
			},
			"should": bson.M{
				"range": bson.M{
					"path": "year", "gte": 2013, "lte": 2015, "score": bson.M{
						"boost": bson.D{{"value", 3}},
					},
				},
			},
		},
	}}}
	limitStage := bson.D{{"$limit", 10}}
	projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"year", 1}, {"genres", 1}, {"_id", 0}, {"score", bson.D{{"$meta", "searchScore"}}}}}}
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
