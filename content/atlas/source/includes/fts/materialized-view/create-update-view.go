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

func updateMonthlyPhoneTransactions(ctx context.Context, client *mongo.Client, collection *mongo.Collection) error {
	monthlyPhoneTransactions := client.Database("sample_supplies").Collection("monthlyPhoneTransactions")

	// Create the aggregation pipeline
	matchStage := bson.D{{Key: "$match", Value: bson.D{{Key: "purchaseMethod", Value: "Phone"}}}}
	unwindStage := bson.D{{Key: "$unwind", Value: bson.D{{Key: "path", Value: "$items"}}}}
	groupStage := bson.D{{Key: "$group", Value: bson.D{
		{Key: "_id", Value: bson.D{
			{Key: "$dateToString", Value: bson.D{
				{Key: "format", Value: "%Y-%m"},
				{Key: "date", Value: "$saleDate"},
			}},
		}},
		{Key: "sales_quantity", Value: bson.D{{Key: "$sum", Value: "$items.quantity"}}},
		{Key: "sales_price", Value: bson.D{{Key: "$sum", Value: "$items.price"}}},
	}}}
	setStage := bson.D{{Key: "$set", Value: bson.D{{Key: "sales_price", Value: bson.D{{Key: "$toDouble", Value: "$sales_price"}}}}}}

	pipeline := mongo.Pipeline{matchStage, unwindStage, groupStage, setStage}

	// Execute the aggregation
	cursor, err := collection.Aggregate(ctx, pipeline)
	if err != nil {
		return err
	}
	defer cursor.Close(ctx)

	// Process and save the results to monthlyPhoneTransactions
	for cursor.Next(ctx) {
		var doc bson.M
		if err := cursor.Decode(&doc); err != nil {
			return err
		}

		// For each result, upsert into the materialized view
		filter := bson.M{"_id": doc["_id"]}
		opts := options.Replace().SetUpsert(true)

		_, err := monthlyPhoneTransactions.ReplaceOne(ctx, filter, doc, opts)
		if err != nil {
			return err
		}
	}

	if err := cursor.Err(); err != nil {
		return err
	}

	return nil
}

func main() {
	// Create a context
	ctx := context.Background()

	// Connect to MongoDB
	uri := "<connection-string>"
	client, err := mongo.Connect(options.Client().ApplyURI(uri))
	if err != nil {
		log.Fatal(err)
	}

	// Ensure the client will be properly disconnected when main exits
	defer func() {
		if err := client.Disconnect(ctx); err != nil {
			log.Fatal(err)
		}
	}()

	// Ping the MongoDB server to verify the connection
	if err := client.Ping(ctx, nil); err != nil {
		log.Fatal(err)
	}

	sales := client.Database("sample_supplies").Collection("sales")
	purchaseOrders := client.Database("sample_supplies").Collection("purchaseOrders")

	// Update immediately on startup
	if err := updateMonthlyPhoneTransactions(ctx, client, sales); err != nil {
		log.Fatal(err)
	}
	if err := updateMonthlyPhoneTransactions(ctx, client, purchaseOrders); err != nil {
		log.Fatal(err)
	}
	fmt.Println("Initial update completed. Materialized view is ready.")

	// Example of a simple scheduler that updates monthly
	dayOfMonth := 1 // Update on the 1st of each month

	for {
		now := time.Now()

		if now.Day() == dayOfMonth && now.Hour() == 0 && now.Minute() == 0 {
			// Create a new context for each update
			updateCtx, cancel := context.WithTimeout(ctx, 30*time.Minute)

			// It's midnight on the 1st of the month - update the view
			if err := updateMonthlyPhoneTransactions(updateCtx, client, sales); err != nil {
				log.Println("Error updating from sales:", err)
			}
			if err := updateMonthlyPhoneTransactions(updateCtx, client, purchaseOrders); err != nil {
				log.Println("Error updating from purchase orders:", err)
			}

			// Cancel the context when done
			cancel()

			fmt.Printf("Scheduled update completed at %s\n", now.Format(time.RFC1123))

			// Sleep for an hour to avoid multiple updates
			time.Sleep(1 * time.Hour)
		} else {
			// Check again in a minute
			time.Sleep(1 * time.Minute)
		}
	}
}
