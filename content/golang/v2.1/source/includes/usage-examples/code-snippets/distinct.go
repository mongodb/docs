// Retrieves distinct values of a field by using the Go driver
package main

import (
	"context"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

type Restaurant struct {
	ID           bson.ObjectID `bson:"_id"`
	Name         string
	RestaurantId string `bson:"restaurant_id"`
	Cuisine      string
	Address      interface{}
	Borough      string
	Grades       interface{}
}

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

	// Filters the collection for documents where the value of cuisine is "Tapas"
	coll := client.Database("sample_restaurants").Collection("restaurants")
	filter := bson.D{{"cuisine", "Tapas"}}

	// Retrieves the distinct values of the "borough" field in documents
	// that match the filter
	var arr []string
	err = coll.Distinct(context.TODO(), "borough", filter).Decode(&arr)
	if err != nil {
		panic(err)
	}

	// Prints the distinct "borough" values
	for _, result := range arr {
		fmt.Println(result)
	}

	// When you run this file, it should print:
	// Brooklyn
	// Manhattan
	// Queens
}
