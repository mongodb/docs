package main

import (
	"context"
	"crypto/tls"
	"crypto/x509"
	"os"

	"go.mongodb.org/mongo-driver/mongo"
	"go.mongodb.org/mongo-driver/mongo/options"
)

func main() {

	caFile := "<path to CA certificate>"
	certFile := "<path to public client certificate>"
	keyFile := "<path to private client key>"

	// Load CA certificate file
	caCert, err := os.ReadFile(caFile)
	if err != nil {
		panic(err)
	}
	caCertPool := x509.NewCertPool()
	if ok := caCertPool.AppendCertsFromPEM(caCert); !ok {
		panic("Error: CA file must be in PEM format")
	}

	// Load client certificate files
	cert, err := tls.LoadX509KeyPair(certFile, keyFile)
	if err != nil {
		panic(err)
	}

	// Instantiate a Config
	tlsConfig := &tls.Config{
		RootCAs:      caCertPool,
		Certificates: []tls.Certificate{cert},
	}

	uri := "<connection string>"
	opts := options.Client().ApplyURI(uri).SetTLSConfig(tlsConfig)
	client, err := mongo.Connect(context.TODO(), opts)
	if err != nil {
		panic(err)
	}
	defer func() {
		if err = client.Disconnect(context.TODO()); err != nil {
			panic(err)
		}
	}()
}
