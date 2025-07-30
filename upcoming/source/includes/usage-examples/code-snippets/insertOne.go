// Inserts a single document describing a restaurant by using the Go driver
package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// start-restaurant-struct
type Restaurant struct {
	Name         string
	RestaurantId string        `bson:"restaurant_id,omitempty"`
	Cuisine      string        `bson:"cuisine,omitempty"`
	Address      interface{}   `bson:"address,omitempty"`
	Borough      string        `bson:"borough,omitempty"`
	Grades       []interface{} `bson:"grades,omitempty"`
}

// end-restaurant-struct

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}

	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	// Inserts a sample document describing a restaurant into the collection
	// begin insertOne
	coll := client.Database("sample_restaurants").Collection("restaurants")
	newRestaurant := Restaurant{Name: "8282", Cuisine: "Korean"}

	result, err := coll.InsertOne(context.TODO(), newRestaurant)
	if err != nil {
		panic(err)
	}
	// end insertOne

	// Prints the ID of the inserted document
	fmt.Printf("Document inserted with ID: %s\n", result.InsertedID)

	// When you run this file, it should print:
	// Document inserted with ID: ObjectID("...")
}
