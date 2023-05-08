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
													{"path", "teachers.classes.grade"},
													{"query", "12th"},
												},
											},
											bson.M{
												"text": bson.D{
													{"path", "teachers.classes.subject"},
													{"query", "science"},
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
								{"path", "teachers.last"},
								{"query", "Smith"},
							},
						},
					},
				},
			},
		},
	}}}

	projectStage := bson.D{{"$project", bson.D{{"teachers", 1}, {"score", bson.D{{"$meta", "searchScore"}}}}}}

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
