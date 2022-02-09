package main

import (
	"context"
	"fmt"
	"github.com/mongodb/mongo-go-driver/mongo"
        "github.com/mongodb/mongo-go-driver/bson"	
        "log"
)

func main() {

	client, err := mongo.Connect(context.TODO(), "mongodb://userreadwrite:abc123@localhost:27017/?authSource=admin")

	if err != nil {
		log.Fatal(err)
	}

        // Bind to DB
       
        db := client.Database("test") 
 
        // Start Collection
        coll := db.Collection("inventory")

        // End Collection


	result, err := coll.InsertOne(
		context.TODO(),
			bson.D{
         		{"item", "canvas"},
        		{"qty", 100},
        		{"tags", bson.A{"cotton"}},
        		{"size", bson.D{
        			{"h", 28},
        			{"w", 35.5},
        			{"uom", "cm"},
        		}},
        	})


      	fmt.Println("Inserted doc: ", result.InsertedID);               
               if err != nil {
                  log.Fatal("error")  
                  //log.Fatal(err)
               }

        if result.InsertedID !=nil {
                    fmt.Println("successful insert")
                }                              
                 	


        
}
