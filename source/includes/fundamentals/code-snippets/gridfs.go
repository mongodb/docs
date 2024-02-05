// Stores and retrieves large files by using the Go driver GridFS feature
package main

import (
	"context"
	"fmt"
	"io"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {
	// Create a new client and connect to the server
	client, err := mongo.Connect()

	if err != nil {
		panic(err)
	}
	defer client.Disconnect(context.TODO())

	// Creates a GridFS bucket
	db := client.Database("myDB")
	bucket := db.GridFSBucket()

	// begin OpenUploadStream example
	file, err := os.Open("home/documents/file.txt")
	if err != nil {
		panic(err)
	}

	// Defines options that specify configuration information for files
	// uploaded to the bucket
	uploadOpts := options.GridFSUpload().SetChunkSizeBytes(200000)

	// Writes a file to an output stream
	uploadStream, err := bucket.OpenUploadStream("file.txt", uploadOpts)
	if err != nil {
		panic(err)
	}
	fileContent, err := io.ReadAll(file)
	if err != nil {
		panic(err)
	}
	var bytes int
	if bytes, err = uploadStream.Write(fileContent); err != nil {
		panic(err)
	}
	fmt.Printf("New file uploaded with %d bytes written", bytes)
	// end OpenUploadStream example
}
