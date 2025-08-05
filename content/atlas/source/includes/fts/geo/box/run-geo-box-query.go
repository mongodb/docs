package main

import (
	"context"
	"fmt"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// define structure of listingsAndReviews collection
type Property struct {
	Name    string `bson:"name"`
	Address struct {
		Location struct {
			Type        string    `bson:"type"`
			Coordinates []float64 `bson:"coordinates"`
		} `bson:"location"`
		Street  string `bson:"street"`
		Country string `bson:"country"`
	} `bson:"address"`
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
			"path": "address.location",
			"box": bson.M{
				"bottomLeft": bson.M{
					"type":        "Point",
					"coordinates": []float64{112.467, -55.050},
				},
				"topRight": bson.M{
					"type":        "Point",
					"coordinates": []float64{168.000, -9.133},
				},
			},
		},
	}}}
	limitStage := bson.D{{Key: "$limit", Value: 3}}
	projectStage := bson.D{{Key: "$project", Value: bson.D{{Key: "_id", Value: 0}, {Key: "name", Value: 1}, {Key: "address", Value: 1}}}}
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
	for _, result := range results {
		fmt.Println(result)
	}
}
