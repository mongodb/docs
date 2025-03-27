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
						bson.D{{"text", bson.D{
							{"query", "Comedy"},
							{"path", bson.A{"genres"}},
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
						bson.D{{"text", bson.D{
							{"query", "Comedy"},
							{"path", bson.A{"genres"}},
						}}},
					}},
					{"score", bson.D{{"boost", bson.D{{"value", 0.5}}}}},
				}}},
			}},
		}},
	}}}
	limitStage := bson.D{{"$limit", 10}}
	projectStage := bson.D{{"$project", bson.D{{"title", 1}, {"plot", 1}, {"_id", 0}, {"genres", 1}, {"score", bson.D{{"$meta", "searchScore"}}}}}}
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
