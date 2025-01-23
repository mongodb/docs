// Creates a time series collection to record temperature data
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"
	"os"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://docs.mongodb.com/drivers/go/current/usage-examples/")
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

	client.Database("db").Collection("temperature").Drop(context.TODO())

	// begin create ts coll
	db := client.Database("db")

	// Creates a time series collection that stores "temperature" values over time
	tso := options.TimeSeries().SetTimeField("temperature")
	opts := options.CreateCollection().SetTimeSeriesOptions(tso)

	db.CreateCollection(context.TODO(), "march2022", opts)
	// end create ts coll

	// Runs a command to list information about collections in the
	// database
	// begin check ts coll
	command := bson.D{{"listCollections", 1}}
	var result bson.M

	commandErr := db.RunCommand(context.TODO(), command).Decode(&result)
	if commandErr != nil {
		panic(commandErr)
	}

	// Prints information about the database's collections and views
	output, outputErr := json.MarshalIndent(result, "", "    ")
	if outputErr != nil {
		panic(outputErr)
	}
	fmt.Printf("%s\n", output)
	// end check ts coll
}
