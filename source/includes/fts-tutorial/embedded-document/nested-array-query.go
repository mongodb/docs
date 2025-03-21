package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	// Connects to your Atlas cluster
	client, err := mongo.Connect(options.Client().ApplyURI("<connection-string>"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	// Sets the namespace
	collection := client.Database("local_school_district").Collection("schools")

	// Defines the pipeline stages
	searchStage := bson.D{{Key: "$search", Value: bson.M{
		"index": "embedded-documents-tutorial",
		"embeddedDocument": bson.M{
			"path": "teachers",
			"operator": bson.M{
				"compound": bson.M{
					"must": bson.A{
						bson.M{
							"embeddedDocument": bson.M{
								"path": "teachers.classes",
								"operator": bson.M{
									"compound": bson.M{
										"must": bson.A{
											bson.M{
												"text": bson.D{
													{Key: "path", Value: "teachers.classes.grade"},
													{Key: "query", Value: "12th"},
												},
											},
											bson.M{
												"text": bson.D{
													{Key: "path", Value: "teachers.classes.subject"},
													{Key: "query", Value: "science"},
												},
											},
										},
									},
								},
							},
						},
					},
					"should": bson.A{
						bson.M{
							"text": bson.D{
								{Key: "path", Value: "teachers.last"},
								{Key: "query", Value: "Smith"},
							},
						},
					},
				},
			},
		},
		"highlight": bson.D{{Key: "path", Value: "teachers.classes.subject"}},
	}}}

	projectStage := bson.D{
		{Key: "$project", Value: bson.D{
			{Key: "teachers", Value: 1},
			{Key: "score", Value: bson.D{{Key: "$meta", Value: "searchScore"}}},
			{Key: "highlights", Value: bson.D{{Key: "$meta", Value: "searchHighlights"}}},
		}},
	}

	// Runs the pipeline
	cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage, projectStage})
	if err != nil {
		panic(err)
	}

	// Prints the results
	var results []bson.D
	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}
	for _, result := range results {
		fmt.Println(result)
	}
}
