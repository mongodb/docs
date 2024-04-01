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
	searchStage := bson.D{{"$searchMeta", bson.M{
		"index": "embedded-documents-tutorial",
		"facet": bson.M{
			"operator": bson.M{
				"text": bson.M{
					"path":  "name",
					"query": "High"},
			},
			"facets": bson.M{
				"gradeFacet": bson.M{
					"path": "teachers.classes.grade",
					"type": "string"},
			}}}}}

	// run pipeline
	cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage})
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