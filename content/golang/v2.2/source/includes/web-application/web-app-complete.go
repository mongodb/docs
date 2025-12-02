package main

import (
	"context"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"go.mongodb.org/mongo-driver/v2/bson"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

// Replace with your MongoDB connection string
const uri = "YOUR-CONNECTION-STRING-HERE"

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

	// Registers movie endpoints
	r.GET("/movies", func(c *gin.Context) {
		getMovies(c, client)
	})
	r.GET("/movies/:id", func(c *gin.Context) {
		getMovieByID(c, client)
	})
	r.POST("/movies/aggregations", func(c *gin.Context) {
		aggregateMovies(c, client)
	})

	if err := r.Run(); err != nil {
		log.Fatal("Failed to start server:", err)
	}
}

// GET /movies - Retrieves all movies
func getMovies(c *gin.Context, client *mongo.Client) {
	// Find all movies in the collection
	cursor, err := client.Database("sample_mflix").Collection("movies").Find(c.Request.Context(), bson.D{})
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer cursor.Close(c.Request.Context())

	// Decodes all results
	var movies []bson.D
	if err = cursor.All(c.Request.Context(), &movies); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Returns the movies
	c.JSON(http.StatusOK, movies)
}

// GET /movies/:id - Retrieves a movie by ID
func getMovieByID(c *gin.Context, client *mongo.Client) {
	// Gets the movie ID from the URL parameter as a string
	idStr := c.Param("id")

	// Converts string ID to MongoDB ObjectID
	id, err := bson.ObjectIDFromHex(idStr)
	if err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid movie ID format"})
		return
	}

	// Finds the movie by ObjectID
	var movie bson.D
	err = client.Database("sample_mflix").Collection("movies").FindOne(c.Request.Context(), bson.D{{"_id", id}}).Decode(&movie)
	if err != nil {
		if err == mongo.ErrNoDocuments {
			c.JSON(http.StatusNotFound, gin.H{"error": "Movie not found"})
			return
		}
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Returns the movie
	c.JSON(http.StatusOK, movie)
}

// POST /movies/aggregations - Runs aggregation pipeline
func aggregateMovies(c *gin.Context, client *mongo.Client) {
	// Gets aggregation pipeline from request body
	var pipeline interface{}
	if err := c.ShouldBindJSON(&pipeline); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid aggregation pipeline"})
		return
	}

	// Executes the aggregation pipeline
	cursor, err := client.Database("sample_mflix").Collection("movies").Aggregate(c.Request.Context(), pipeline)
	if err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}
	defer cursor.Close(c.Request.Context())

	// Decodes the results
	var result []bson.D
	if err = cursor.All(c.Request.Context(), &result); err != nil {
		c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
		return
	}

	// Returns the aggregation result
	c.JSON(http.StatusOK, result)
}
