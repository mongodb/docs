package main

import (
	"context"
	"log"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// Replace with your MongoDB connection string
const uri = "<connection-string>"

func main() {
	// Connects to MongoDB
	serverAPI := options.ServerAPI(options.ServerAPIVersion1)
	opts := options.Client().ApplyURI(uri).SetServerAPIOptions(serverAPI)

	client, err := mongo.Connect(opts)
	if err != nil {
		log.Fatal("Could not connect to MongoDB:", err)
	}

	// Ensures the client disconnects when main exits
	defer func() {
		if err := client.Disconnect(context.TODO()); err != nil {
			log.Fatal("Error disconnecting from MongoDB:", err)
		}
	}()

	// Pings the database to verify connection
	if err := client.Ping(context.TODO(), nil); err != nil {
		log.Fatal("Could not ping MongoDB:", err)
	}

	r := gin.Default()
	r.GET("/", func(c *gin.Context) {
		c.JSON(200, gin.H{
			"message": "Hello World",
		})
	})

	if err := r.Run(); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}
