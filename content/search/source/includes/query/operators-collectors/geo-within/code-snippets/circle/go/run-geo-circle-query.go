package main

import (
	"context"
	"encoding/json"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// define structure of listingsAndReviews collection
type Property struct {
	Name         string `bson:"name" json:"name"`
	PropertyType string `bson:"property_type" json:"property_type"`
	Address      struct {
		Location struct {
			Type        string    `bson:"type" json:"type"`
			Coordinates []float64 `bson:"coordinates" json:"coordinates"`
		} `bson:"location" json:"location"`
		Street  string `bson:"street" json:"street"`
		Country string `bson:"country" json:"country"`
	} `bson:"address" json:"address"`
	Score float64 `bson:"score" json:"score"`
}

func main() {
	var err error
	// connect to the Atlas cluster
	ctx := context.Background()
	client, err := mongo.Connect(options.Client().SetTimeout(5*time.Second).ApplyURI("<connection-string>"))
	if err != nil {
		panic(err)
	}
	defer client.Disconnect(ctx)
	// set namespace
	collection := client.Database("sample_airbnb").Collection("listingsAndReviews")
	// define pipeline
	searchStage := bson.D{{Key: "$search", Value: bson.M{
		"geoWithin": bson.M{
			"circle": bson.M{
				"center": bson.M{
					"type":        "Point",
					"coordinates": []float64{-73.54, 45.54},
				},
				"radius": 1600,
			},
			"path": "address.location",
		},
	}}}
	limitStage := bson.D{{Key: "$limit", Value: 3}}
	projectStage := bson.D{{Key: "$project", Value: bson.D{
		{Key: "_id", Value: 0},
		{Key: "name", Value: 1},
		{Key: "address", Value: 1},
		{Key: "property_type", Value: 1},
		{Key: "score", Value: bson.D{{Key: "$meta", Value: "searchScore"}}},
	}}}
	// run pipeline
	cursor, err := collection.Aggregate(ctx, mongo.Pipeline{searchStage, limitStage, projectStage})
	if err != nil {
		panic(err)
	}
	// print results
	var results []Property
	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}
	
	// Convert results to JSON and print
	jsonResults, err := json.MarshalIndent(results, "", "  ")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(jsonResults))
}
