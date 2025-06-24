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
type Order struct {
	CustomerID string        `bson:"customer_id,omitempty"`
	OrderDate  bson.DateTime `bson:"orderdate"`
	Value      int           `bson:"value"`
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

	// start-insert-orders
	orders := aggDB.Collection("orders")
	orders.DeleteMany(context.TODO(), bson.D{})

	_, err = orders.InsertMany(context.TODO(), []interface{}{
		Order{
			CustomerID: "elise_smith@myemail.com",
			OrderDate:  bson.NewDateTimeFromTime(time.Date(2020, 5, 30, 8, 35, 53, 0, time.UTC)),
			Value:      231,
		},
		Order{
			CustomerID: "elise_smith@myemail.com",
			OrderDate:  bson.NewDateTimeFromTime(time.Date(2020, 1, 13, 9, 32, 7, 0, time.UTC)),
			Value:      99,
		},
		Order{
			CustomerID: "oranieri@warmmail.com",
			OrderDate:  bson.NewDateTimeFromTime(time.Date(2020, 1, 01, 8, 25, 37, 0, time.UTC)),
			Value:      63,
		},
		Order{
			CustomerID: "tj@wheresmyemail.com",
			OrderDate:  bson.NewDateTimeFromTime(time.Date(2019, 5, 28, 19, 13, 32, 0, time.UTC)),
			Value:      2,
		},
		Order{
			CustomerID: "tj@wheresmyemail.com",
			OrderDate:  bson.NewDateTimeFromTime(time.Date(2020, 11, 23, 22, 56, 53, 0, time.UTC)),
			Value:      187,
		},
		Order{
			CustomerID: "tj@wheresmyemail.com",
			OrderDate:  bson.NewDateTimeFromTime(time.Date(2020, 8, 18, 23, 4, 48, 0, time.UTC)),
			Value:      4,
		},
		Order{
			CustomerID: "elise_smith@myemail.com",
			OrderDate:  bson.NewDateTimeFromTime(time.Date(2020, 12, 26, 8, 55, 46, 0, time.UTC)),
			Value:      4,
		},
		Order{
			CustomerID: "tj@wheresmyemail.com",
			OrderDate:  bson.NewDateTimeFromTime(time.Date(2021, 2, 29, 7, 49, 32, 0, time.UTC)),
			Value:      1024,
		},
		Order{
			CustomerID: "elise_smith@myemail.com",
			OrderDate:  bson.NewDateTimeFromTime(time.Date(2020, 10, 3, 13, 49, 44, 0, time.UTC)),
			Value:      102,
		},
	})
	if err != nil {
		log.Fatal(err)
	}
	// end-insert-orders

	// start-match
	matchStage := bson.D{{Key: "$match", Value: bson.D{
		{Key: "orderdate", Value: bson.D{
			{Key: "$gte", Value: time.Date(2020, 1, 1, 0, 0, 0, 0, time.UTC)},
			{Key: "$lt", Value: time.Date(2021, 1, 1, 0, 0, 0, 0, time.UTC)},
		}},
	}}}
	// end-match

	// start-sort1
	sortStage1 := bson.D{{Key: "$sort", Value: bson.D{
		{Key: "orderdate", Value: 1},
	}}}
	// end-sort1

	// start-group
	groupStage := bson.D{{Key: "$group", Value: bson.D{
		{Key: "_id", Value: "$customer_id"},
		{Key: "first_purchase_date", Value: bson.D{{Key: "$first", Value: "$orderdate"}}},
		{Key: "total_value", Value: bson.D{{Key: "$sum", Value: "$value"}}},
		{Key: "total_orders", Value: bson.D{{Key: "$sum", Value: 1}}},
		{Key: "orders", Value: bson.D{{Key: "$push", Value: bson.D{
			{Key: "orderdate", Value: "$orderdate"},
			{Key: "value", Value: "$value"},
		}}}},
	}}}
	// end-group

	// start-set
	setStage := bson.D{{Key: "$set", Value: bson.D{
		{Key: "customer_id", Value: "$_id"},
	}}}
	// end-set

	// start-sort2
	sortStage2 := bson.D{{Key: "$sort", Value: bson.D{
		{Key: "first_purchase_date", Value: 1},
	}}}
	// end-sort2

	// start-unset
	unsetStage := bson.D{{Key: "$unset", Value: bson.A{"_id"}}}
	// end-unset

	// start-run-agg
	pipeline := mongo.Pipeline{matchStage, sortStage1, groupStage, setStage, sortStage2, unsetStage}
	cursor, err := orders.Aggregate(context.TODO(), pipeline)
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
