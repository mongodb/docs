package main

import (
	"fmt"
	"log"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

// begin-person-struct
type Person struct {
	ID       bson.ObjectID `bson:"_id"`
	Name     string
	Age      int
	Birthday bson.DateTime
	Address  Address
	Hobbies  []string
}

type Address struct {
	Street string
	City   string
	State  string
}

// end-person-struct

func main() {

	// begin-unmarshal
	var extJsonString = "{\"_id\":{\"$oid\":\"578f6fa2df35c7fbdbaed8c5\"},\"name\":\"Liana Ruiz\",\"age\":46,\"birthday\":{\"$date\":\"1988-01-15T00:00:00Z\"},\"address\":{\"street\":\"500 Slippery Rock Road\",\"city\":\"Round Rock\",\"state\":\"AR\"},\"hobbies\":[\"cycling\", \"baking\"]}"

	var p Person
	err := bson.UnmarshalExtJSON([]byte(extJsonString), false, &p)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Go Struct Representation:\n%+v\n", p)
	// end-unmarshal

	// begin-marshal
	var person = Person{
		ID:       bson.NewObjectID(),
		Name:     "Matteo Carisi",
		Age:      49,
		Birthday: bson.NewDateTimeFromTime(time.Date(1975, 10, 30, 0, 0, 0, 0, time.UTC)),
		Address:  Address{Street: "14a Corner Court", City: "Springfield", State: "IL"},
		Hobbies:  []string{"cooking", "birdwatching"},
	}

	newExtJsonString, err := bson.MarshalExtJSON(person, false, true)
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("Extended JSON Representation:\n%s\n", newExtJsonString)
	// end-marshal

	// begin-marshal-fmt
	formattedString, err := bson.MarshalExtJSONIndent(person, false, true, "", "  ")
	if err != nil {
		log.Fatal(err)
	}

	fmt.Printf("%s\n", formattedString)
	// end-marshal-fmt

}
