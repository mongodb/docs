package main

import (
	"context"
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// start-structs
type Person struct {
	PersonID    string        `bson:"person_id"`
	Firstname   string        `bson:"firstname"`
	Lastname    string        `bson:"lastname"`
	Gender      string        `bson:"gender,omitempty"`
	DateOfBirth bson.DateTime `bson:"dateofbirth"`
	Vocation    string        `bson:"vocation"`
	Address     Address       `bson:"address"`
}

type Address struct {
	Number int
	Street string
	City   string
}

// end-structs

func main() {
	const uri = "<connection string>"

	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}

	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			log.Fatal(err)
		}
	}()

	aggDB := client.Database("agg_tutorials_db")

	// start-insert-persons
	persons := aggDB.Collection("persons")
	persons.DeleteMany(context.TODO(), bson.D{})

	_, err = persons.InsertMany(context.TODO(), []interface{}{
		Person{
			PersonID:    "6392529400",
			Firstname:   "Elise",
			Lastname:    "Smith",
			DateOfBirth: bson.NewDateTimeFromTime(time.Date(1972, 1, 13, 9, 32, 7, 0, time.UTC)),
			Vocation:    "ENGINEER",
			Address:     Address{Number: 5625, Street: "Tipa Circle", City: "Wojzinmoj"},
		},
		Person{
			PersonID:    "1723338115",
			Firstname:   "Olive",
			Lastname:    "Ranieri",
			Gender:      "FEMALE",
			DateOfBirth: bson.NewDateTimeFromTime(time.Date(1985, 5, 12, 23, 14, 30, 0, time.UTC)),
			Vocation:    "ENGINEER",
			Address:     Address{Number: 9303, Street: "Mele Circle", City: "Tobihbo"},
		},
		Person{
			PersonID:    "8732762874",
			Firstname:   "Toni",
			Lastname:    "Jones",
			DateOfBirth: bson.NewDateTimeFromTime(time.Date(1991, 11, 23, 16, 53, 56, 0, time.UTC)),
			Vocation:    "POLITICIAN",
			Address:     Address{Number: 1, Street: "High Street", City: "Upper Abbeywoodington"},
		},
		Person{
			PersonID:    "7363629563",
			Firstname:   "Bert",
			Lastname:    "Gooding",
			DateOfBirth: bson.NewDateTimeFromTime(time.Date(1941, 4, 7, 22, 11, 52, 0, time.UTC)),
			Vocation:    "FLORIST",
			Address:     Address{Number: 13, Street: "Upper Bold Road", City: "Redringtonville"},
		},
		Person{
			PersonID:    "1029648329",
			Firstname:   "Sophie",
			Lastname:    "Celements",
			DateOfBirth: bson.NewDateTimeFromTime(time.Date(1959, 7, 6, 17, 35, 45, 0, time.UTC)),
			Vocation:    "ENGINEER",
			Address:     Address{Number: 5, Street: "Innings Close", City: "Basilbridge"},
		},
		Person{
			PersonID:    "7363626383",
			Firstname:   "Carl",
			Lastname:    "Simmons",
			DateOfBirth: bson.NewDateTimeFromTime(time.Date(1998, 12, 26, 13, 13, 55, 0, time.UTC)),
			Vocation:    "ENGINEER",
			Address:     Address{Number: 187, Street: "Hillside Road", City: "Kenningford"},
		},
	})
	if err != nil {
		log.Fatal(err)
	}
	// end-insert-persons

	// start-match
	matchStage := bson.D{{Key: "$match", Value: bson.D{{Key: "vocation", Value: "ENGINEER"}}}}
	// end-match

	// start-sort
	sortStage := bson.D{{Key: "$sort", Value: bson.D{{Key: "dateofbirth", Value: -1}}}}
	// end-sort

	// start-limit
	limitStage := bson.D{{Key: "$limit", Value: 3}}
	// end-limit

	// start-unset
	unsetStage := bson.D{{Key: "$unset", Value: bson.A{"_id", "address"}}}
	// end-unset

	// start-run-agg
	pipeline := mongo.Pipeline{matchStage, sortStage, limitStage, unsetStage}
	cursor, err := persons.Aggregate(context.TODO(), pipeline)
	// end-run-agg

	if err != nil {
		log.Fatal(err)
	}

	defer func() {
		if err := cursor.Close(context.TODO()); err != nil {
			log.Fatalf("failed to close cursor: %v", err)
		}
	}()

	var results []bson.D
	if err = cursor.All(context.TODO(), &results); err != nil {
		log.Fatalf("failed to decode results: %v", err)
	}
	for _, result := range results {
		res, _ := bson.MarshalExtJSON(result, false, false)
		fmt.Println(string(res))
	}
}
