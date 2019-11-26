// begin x509 connection
package main

import (
	"context"
	"fmt"
	"log"
	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
	"go.mongodb.org/mongo-driver/bson"
)

func main() {
	ctx := context.TODO()
	certificateKeyFilePath := "/etc/certs/mongodb/client.pem"
	uri := "mongodb+srv://<cluster-url>/test?authSource=$external&tlsCertificateKeyFile=%s&retryWrites=true&w=majority&authMechanism=MONGODB-X509"
	uri = fmt.Sprintf(uri, certificateKeyFilePath)
	clientOpts := options.Client().ApplyURI(uri)

	client, err := mongo.Connect(ctx, clientOpts)
	if err != nil { log.Fatal(err) }
	defer client.Disconnect(ctx)

	collection := client.Database("testDB").Collection("testCol")
	docCount, err := collection.CountDocuments(ctx, bson.D{})
	if err != nil { log.Fatal(err) }
	fmt.Println(docCount)
}
// end x509 connection 