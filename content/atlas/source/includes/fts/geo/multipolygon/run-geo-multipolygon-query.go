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
	Name    string `bson:"name" json:"name"`
	Address struct {
		Location struct {
			Type        string    `bson:"type" json:"type"`
			Coordinates []float64 `bson:"coordinates" json:"coordinates"`
		} `bson:"location" json:"location"`
		Street  string `bson:"street" json:"street"`
		Country string `bson:"country" json:"country"`
	} `bson:"address" json:"address"`
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
			"geometry": bson.M{
				"type": "MultiPolygon",
				"coordinates": []interface{}{
					[]interface{}{
						[]interface{}{
							[]float64{-157.8412413882, 21.2882235819},
							[]float64{-157.8607925468, 21.2962046205},
							[]float64{-157.8646640634, 21.3077019651},
							[]float64{-157.862776699, 21.320776283},
							[]float64{-157.8341758705, 21.3133826738},
							[]float64{-157.8349985678, 21.3000822569},
							[]float64{-157.8412413882, 21.2882235819},
						},
					},
					[]interface{}{
						[]interface{}{
							[]float64{-157.852898124, 21.301208833},
							[]float64{-157.8580050499, 21.3050871833},
							[]float64{-157.8587346108, 21.3098050385},
							[]float64{-157.8508811028, 21.3119240258},
							[]float64{-157.8454308541, 21.30396767},
							[]float64{-157.852898124, 21.301208833},
						},
					},
				},
			},
			"path": "address.location",
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
	
	// Convert results to JSON and print
	jsonResults, err := json.MarshalIndent(results, "", "  ")
	if err != nil {
		panic(err)
	}
	fmt.Println(string(jsonResults))
}
