// Enable TLS on a connection by using the Go driver
package main

import (
	"context"
	"crypto/tls"
	"crypto/x509"
	"os"

	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {

	caFile := "<path to CA certificate>"
	certFile := "<path to public client certificate>"
	keyFile := "<path to private client key>"

	// Loads CA certificate file
	caCert, err := os.ReadFile(caFile)
	if err != nil {
		panic(err)
	}
	caCertPool := x509.NewCertPool()
	if ok := caCertPool.AppendCertsFromPEM(caCert); !ok {
		panic("Error: CA file must be in PEM format")
	}

	// Loads client certificate files
	cert, err := tls.LoadX509KeyPair(certFile, keyFile)
	if err != nil {
		panic(err)
	}

	// Instantiates a Config instance
	tlsConfig := &tls.Config{
		RootCAs:      caCertPool,
		Certificates: []tls.Certificate{cert},
	}

	uri := "<connection string>"

	// Sets TLS options in options instance
	opts := options.Client().ApplyURI(uri).SetTLSConfig(tlsConfig)

	// Connects to MongoDB with TLS enabled
	client, err := mongo.Connect(opts)
	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
}
