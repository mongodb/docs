package main

import (
	"context"
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

	// begin runCommand
	db := client.Database("sample_restaurants")
	command := bson.D{{"dbStats", 1}}

	var result bson.D
	commandErr := db.RunCommand(context.TODO(), command).Decode(&result)
	// end runCommand

	if commandErr != nil {
		panic(commandErr)
	}

	// When you run this file, it should print:
	// [{db sample_restaurants} {collections 2} {views 0} {objects 25554} {avgObjSize 548.4101901854896} {dataSize 14014074} {storageSize 8257536} {totalFreeStorageSize 0} {numExtents 0} {indexes 2} {indexSize 286720} {fileSize 0} {nsSizeMB 0} {ok 1}]
	fmt.Println(result)
}
