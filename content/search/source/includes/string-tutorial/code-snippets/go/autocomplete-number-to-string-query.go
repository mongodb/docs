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
	collection := client.Database("sample_airbnb").Collection("airbnb_mat_view")
	// define pipeline
	searchStage := bson.D{{"$search", bson.M{
		"index": "date-number-fields-tutorial",
		"compound": bson.M{
			"should": bson.A{
				bson.M{
					"autocomplete": bson.M{
						"path": "maximumNumberOfNights", "query": "3",
					},
				},
				bson.M{
					"autocomplete": bson.M{
						"path": "accommodatesNumber", "query": "2",
					},
				},
			},
		},
	}}}
	limitStage := bson.D{{"$limit", 5}}
	projectStage := bson.D{{"$project", bson.D{{"_id", 0}}}}
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
