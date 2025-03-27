package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	// connect to your Atlas cluster
	client, err := mongo.Connect(options.Client().ApplyURI("<connection-string>"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	// set namespace
	collection := client.Database("sample_airbnb").Collection("listingsAndReviews")

	// define polygon
	polygon := [][][]float64{{
		{-161.323242, 22.512557},
		{-152.446289, 22.065278},
		{-156.09375, 17.811456},
		{-161.323242, 22.512557},
	}}

	// define pipeline
	searchStage := bson.D{{"$search", bson.M{
		"index": "geo-json-tutorial",
		"compound": bson.M{
			"must": bson.M{
				"geoWithin": bson.M{
					"geometry": bson.M{
						"type":        "Polygon",
						"coordinates": polygon,
					},
					"path": "address.location",
				},
			},
			"should": bson.M{
				"text": bson.M{
					"path":  "property_type",
					"query": "Condominium",
				}},
		},
	},
	}}
	limitStage := bson.D{{"$limit", 10}}
	projectStage := bson.D{{"$project", bson.D{{"name", 1}, {"address", 1}, {"property_type", 1}, {"_id", 0}, {"score", bson.D{{"$meta", "searchScore"}}}}}}

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
