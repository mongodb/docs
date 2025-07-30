// Configures loggers by using the Go driver
package main

import (
	"bytes"
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"sync"

	"github.com/bombsimon/logrusr/v4"
	"github.com/joho/godotenv"
	"github.com/sirupsen/logrus"
	"go.mongodb.org/mongo-driver/v2/mongo"
	"go.mongodb.org/mongo-driver/v2/mongo/options"
)

func main() {
	if err := godotenv.Load(); err != nil {
		log.Println("No .env file found")
	}

	var uri string
	if uri = os.Getenv("MONGODB_URI"); uri == "" {
		log.Fatal("You must set your 'MONGODB_URI' environment variable. See\n\t https://www.mongodb.com/docs/drivers/go/current/usage-examples/#environment-variable")
	}
	//standardLogging(uri)
	//customLogging(uri)
	thirdPartyLogging(uri)
}

func standardLogging(uri string) {
	// Sets options when configuring the standard logger
	// start-standard-logger
	loggerOptions := options.
		Logger().
		SetMaxDocumentLength(25).
		SetComponentLevel(options.LogComponentCommand, options.LogLevelDebug)

	// Creates options that include the logger specification
	clientOptions := options.
		Client().
		ApplyURI(uri).
		SetLoggerOptions(loggerOptions)
	// end-standard-logger
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		panic(err)
	}

	defer client.Disconnect(context.TODO())

	// start-insert
	type Item struct {
		Name string
	}

	coll := client.Database("db").Collection("testColl")
	_, err = coll.InsertOne(context.TODO(), Item{Name: "grapefruit"})
	// end-insert

	if err != nil {
		panic(err)
	}
}

// Creates a struct to model the logger
// start-customlogger-struct
type CustomLogger struct {
	io.Writer
	mu sync.Mutex
}

// end-customlogger-struct

// Creates functions to specify how the logger generates messages
// start-customlogger-funcs
func (logger *CustomLogger) Info(level int, msg string, _ ...interface{}) {
	logger.mu.Lock()
	defer logger.mu.Unlock()
	if options.LogLevel(level+1) == options.LogLevelDebug {
		fmt.Fprintf(logger, "level: %d DEBUG, message: %s\n", level, msg)
	} else {
		fmt.Fprintf(logger, "level: %d INFO, message: %s\n", level, msg)
	}
}

func (logger *CustomLogger) Error(err error, msg string, _ ...interface{}) {
	logger.mu.Lock()
	defer logger.mu.Unlock()
	fmt.Fprintf(logger, "error: %v, message: %s\n", err, msg)
}

// end-customlogger-funcs

func customLogging(uri string) {
	// Sets options when configuring the custom logger
	// start-set-customlogger
	buf := bytes.NewBuffer(nil)
	sink := &CustomLogger{Writer: buf}

	loggerOptions := options.
		Logger().
		SetSink(sink).
		SetComponentLevel(options.LogComponentCommand, options.LogLevelDebug).
		SetComponentLevel(options.LogComponentConnection, options.LogLevelDebug)

	// Creates options that include the logger specification
	clientOptions := options.
		Client().
		ApplyURI(uri).
		SetLoggerOptions(loggerOptions)
	// end-set-customlogger
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		panic(err)
	}

	defer client.Disconnect(context.TODO())

	type Item struct {
		Name string
	}

	coll := client.Database("db").Collection("testColl")
	_, err = coll.InsertOne(context.TODO(), Item{Name: "grapefruit"})
	if err != nil {
		panic(err)
	}
	log.Println(buf.String())
}

func thirdPartyLogging(uri string) {
	// Creates a logrus logger
	// start-make-logrus
	myLogger := &logrus.Logger{
		Out:   os.Stderr,
		Level: logrus.DebugLevel,
		Formatter: &logrus.JSONFormatter{
			TimestampFormat: "2006-01-02 15:04:05",
			PrettyPrint:     true,
		},
	}
	// end-make-logrus

	// Sets the sink for the logger
	// start-set-thirdparty-logger
	sink := logrusr.New(myLogger).GetSink()

	// Sets options when configuring the logrus logger
	loggerOptions := options.
		Logger().
		SetSink(sink).
		SetComponentLevel(options.LogComponentCommand, options.LogLevelDebug)

	// Creates options that include the logger specification
	clientOptions := options.
		Client().
		ApplyURI(uri).
		SetLoggerOptions(loggerOptions)
	// end-set-thirdparty-logger
	client, err := mongo.Connect(clientOptions)
	if err != nil {
		panic(err)
	}

	defer client.Disconnect(context.TODO())

	// start-log-operations
	type Item struct {
		Name string
	}

	coll := client.Database("db").Collection("testColl")
	docs := []interface{}{
		Item{Name: "starfruit"},
		Item{Name: "kiwi"},
		Item{Name: "cantaloupe"},
	}
	_, err = coll.InsertMany(context.TODO(), docs)
	if err != nil {
		panic(err)
	}
	_, err = coll.DeleteOne(context.TODO(), Item{Name: "kiwi"})
	if err != nil {
		panic(err)
	}
	// end-log-operations
}
