package main

import (
	"context"
	"fmt"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	uri := "mongodb+srv://foo:bar@cluster0.7stmv.mongodb.net/myFirstDatabase?retryWrites=true&w=majority"
	// uri := "mongodb+srv://<user>:<password>@<cluster-url>?retryWrites=true&writeConcern=majority"

	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	coll := client.Database("sample_guides").Collection("planets")

	// find code goes here
	// filter := bson.D{
	// 	{"$and",
	// 		bson.A{
	// 			bson.D{{"hasRings", false}},
	// 			bson.D{{"mainAtmosphere", "Ar"}},
	// 		},
	// 	},
	// }
	// 	filter := bson.D{
	// 		{"$and",
	// 			bson.A{
	// 				bson.D{{"surfaceTemperatureC.mean",
	// 					bson.D{{"$lt", 15}},
	// 				}},
	// 				bson.D{{"surfaceTemperatureC.min",
	// 					bson.D{{"$gt", -100}},
	// 				}},
	// 			},
	// 		},
	// 	}
	filter := bson.D{
		{"$or",
			bson.A{
				bson.D{{"orderFromSun",
					bson.D{{"$gt", 7}},
				}},
				bson.D{{"orderFromSun", bson.D{{"$lt", 2}}}},
			},
		},
	}
	cursor, err := coll.Find(context.TODO(), filter)
	if err != nil {
		panic(err)
	}

	// iterate code goes here
	for cursor.Next(context.TODO()) {
		var result bson.M
		if err := cursor.Decode(&result); err != nil {
			panic(err)
		}
		fmt.Println(result)
	}
	if err := cursor.Err(); err != nil {
		panic(err)
	}

}
