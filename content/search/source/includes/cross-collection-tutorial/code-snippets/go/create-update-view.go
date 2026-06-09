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
	// Create the aggregation pipeline
	matchStage := bson.D{bson.E{Key: "$match", Value: bson.D{bson.E{Key: "purchaseMethod", Value: "Phone"}}}}
	unwindStage := bson.D{bson.E{Key: "$unwind", Value: bson.D{bson.E{Key: "path", Value: "$items"}}}}
	groupStage := bson.D{bson.E{Key: "$group", Value: bson.D{
		bson.E{Key: "_id", Value: bson.D{
			bson.E{Key: "$dateToString", Value: bson.D{
				bson.E{Key: "format", Value: "%Y-%m"},
				bson.E{Key: "date", Value: "$saleDate"},
			}},
		}},
		bson.E{Key: "sales_quantity", Value: bson.D{bson.E{Key: "$sum", Value: "$items.quantity"}}},
		bson.E{Key: "sales_price", Value: bson.D{bson.E{Key: "$sum", Value: "$items.price"}}},
	}}}
	setStage := bson.D{bson.E{Key: "$set", Value: bson.D{bson.E{Key: "sales_price", Value: bson.D{bson.E{Key: "$toDouble", Value: "$sales_price"}}}}}}
	mergeStage := bson.D{bson.E{Key: "$merge", Value: bson.D{
		bson.E{Key: "into", Value: "monthlyPhoneTransactions"},
		bson.E{Key: "whenMatched", Value: "replace"},
	}}}

	pipeline := mongo.Pipeline{matchStage, unwindStage, groupStage, setStage, mergeStage}

	// Run the aggregation
	cursor, err := collection.Aggregate(ctx, pipeline)
	if err != nil {
		return err
	}
	defer cursor.Close(ctx)
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
