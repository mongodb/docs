// run-geo-box-metadata-query.go

package main

import (
	"context"
	"fmt"
	"log"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// establish connection and set namespace
	client, err := mongo.Connect(context.TODO(),
		options.Client().ApplyURI("<connection-string>"))
	if err != nil {
		log.Fatal(err)
	}
	defer client.Disconnect(context.TODO())
	
	collection := client.Database("sample_airbnb").Collection("listingsAndReviews")

	// define query
	searchStage := bson.D{{"$searchMeta", bson.D{
		{"facet", bson.D{
			{"operator", bson.D{
				{"geoWithin", bson.D{
					{"path", "address.location"},
					{"box", bson.D{
						{"bottomLeft", bson.D{
							{"type", "Point"},
							{"coordinates", bson.A{112.467, -55.050}},
						}},
						{"topRight", bson.D{
							{"type", "Point"},
							{"coordinates", bson.A{168.000, -9.133}},
						}},
					}},
				}},
			}},
			{"facets", bson.D{
				{"propertyTypeFacet", bson.D{
					{"type", "string"},
					{"path", "property_type"},
				}},
			}},
		}},
	}}}

	// run query and print results
	cursor, err := collection.Aggregate(context.TODO(), mongo.Pipeline{searchStage})
	if err != nil {
		log.Fatal(err)
	}
	defer cursor.Close(context.TODO())
	
	for cursor.Next(context.TODO()) {
		var result bson.M
		if err := cursor.Decode(&result); err != nil {
			log.Fatal(err)
		}
		fmt.Println(result)
	}
}
