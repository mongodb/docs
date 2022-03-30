package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/bson"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environmental variable. See\n\t https://docs.mongodb.com/drivers/go/current/usage-examples/")
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

	client.Database("spring_weather").Collection("temperature").Drop(context.TODO())

	// begin create ts coll
	db := client.Database("spring_weather")
	tso := options.TimeSeries().SetTimeField("temperature")
	opts := options.CreateCollection().SetTimeSeriesOptions(tso)

	db.CreateCollection(context.TODO(), "march2022", opts)
	// end create ts coll

	// begin check ts coll
	command := bson.D{{"listCollections", 1}}
	var result bson.M
	
	commandErr := db.RunCommand(context.TODO(), command).Decode(&result)
	if commandErr != nil {
		panic(commandErr)
	}

	output, outputErr := json.MarshalIndent(result, "", "    ")
	if outputErr != nil {
		panic(outputErr)
	}
	fmt.Printf("%s\n", output)
	// end check ts coll
}
