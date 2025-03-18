package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// define structure of movies collection
type MovieCollection struct {
	title string `bson:"Title,omitempty"`
	plot  string `bson:"Plot,omitempty"`
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
	// define variable
	var objectIDFromHex = func(hex string) bson.ObjectID {
		objectID, err := bson.ObjectIDFromHex(hex)
		if err != nil {
			log.Fatal(err)
		}
		return objectID
	}
	// define pipeline
	searchStage := bson.D{{"$search", bson.D{
		{"index", "compound-query-custom-score-tutorial"},
		{"compound", bson.D{
			{"should", bson.A{
				bson.D{{"compound", bson.D{
					{"must", bson.A{
						bson.D{{"text", bson.D{
							{"query", "ghost"},
							{"path", bson.A{"plot", "title"}},
						}}},
					}},
					{"mustNot", bson.A{
						bson.D{{"in", bson.D{
							{"value", bson.A{objectIDFromHex("573a13cdf29313caabd83c08"), objectIDFromHex("573a13cef29313caabd873a2")}},
							{"path", "_id"},
						}}},
					}},
				}}},
				bson.D{{"compound", bson.D{
					{"must", bson.A{
						bson.D{{"text", bson.D{
							{"query", "ghost"},
							{"path", bson.A{"plot", "title"}},
						}}},
					}},
					{"filter", bson.A{
						bson.D{{"in", bson.D{
							{"value", bson.A{objectIDFromHex("573a13cdf29313caabd83c08"), objectIDFromHex("573a13cef29313caabd873a2")}},
							{"path", "_id"},
						}}},
					}},
					{"score", bson.D{{"boost", bson.D{{"value", 0.5}}}}},
				}}},
			}},
		}},
	}}}

	limitStage := bson.D{{"$limit", 10}}
	projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"plot", 1}, {"_id", 0}, {"score", bson.D{{"$meta", "searchScore"}}}}}}
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
