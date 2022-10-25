package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"github.com/joho/godotenv"
	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/bson/primitive"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environmental variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}

	client, err := mongo.Connect(context.TODO(), options.Client().ApplyURI(uri))
	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()

	type Address struct {
		Building    string
		Coordinates [2]float64 `bson:"coord"`
		Street      string
		Zipcode     string
	}

	type Grades struct {
		Date  primitive.DateTime
		Grade string
		Score int
	}

	// start-restaurant-struct
	type Restaurant struct {
		ID           primitive.ObjectID `bson:"_id"`
		Name         string
		RestaurantId string `bson:"restaurant_id"`
		Cuisine      string
		Address      Address
		Borough      string
		Grades       []Grades
	}
	// end-restaurant-struct

	// begin find
	coll := client.Database("sample_restaurants").Collection("restaurants")
	filter := bson.D{{"cuisine", "Italian"}}

	cursor, err := coll.Find(context.TODO(), filter)
	if err != nil {
		panic(err)
	}
	// end find

	var results []Restaurant
	if err = cursor.All(context.TODO(), &results); err != nil {
		panic(err)
	}

	for _, result := range results {
		cursor.Decode(&result)
		output, err := json.MarshalIndent(result, "", "    ")
		if err != nil {
			panic(err)
		}
		fmt.Printf("%s\n", output)
	}
}
