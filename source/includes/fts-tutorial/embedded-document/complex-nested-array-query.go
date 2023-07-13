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
	collection := client.Database("local_school_district").Collection("schools")

	// define pipeline stages
	searchStage := bson.D{{"$search", bson.M{
		"index": "embedded-documents-tutorial",
		"embeddedDocument": bson.D{
			{"path", "clubs.sports"},
			{"operator",
				bson.D{
					{"queryString",
						bson.D{
							{"defaultPath", "clubs.sports.club_name"},
							{"query", "dodgeball OR frisbee"},
						},
					},
				},
			},
		},
	}}}

	projectStage := bson.D{{"$project", bson.D{{"name", 1}, {"clubs.sports", 1}, {"score", bson.D{{"$meta", "searchScore"}}}}}}

	// run pipeline
	cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage, projectStage})
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
