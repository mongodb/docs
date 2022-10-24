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
		Coordinates [2]float64
		Street      string
		Zipcode     string
	}

	type Grades struct {
		Date  primitive.DateTime
		Grade string `bson:"grade"`
		Score int    `bson:"score"`
	}

	type Restaurant struct {
		Address      Address  `bson:"address"`
		Borough      string   `bson:"borough"`
		Cuisine      string   `bson:"cuisine"`
		Grades       []Grades `bson:"grades"`
		Name         string   `bson:"name"`
		RestaurantId string   `bson:"restaurant_id"`
	}

	// begin findOne
	coll := client.Database("sample_restaurants").Collection("restaurants")
	filter := bson.D{{"name", "Bagels N Buns"}}

	var result Restaurant
	err = coll.FindOne(context.TODO(), filter).Decode(&result)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			// This error means your query did not match any documents.
			return
		}
		panic(err)
	}
	// end findOne

	output, err := json.MarshalIndent(result, "", "    ")
	if err != nil {
		panic(err)
	}
	fmt.Printf("%s\n", output)
}
