package common

import (
	"context"
	"io"
	"log"
	"net/http"
	"os"

	"github.com/tmc/langchaingo/documentloaders"
	"github.com/tmc/langchaingo/schema"
	"github.com/tmc/langchaingo/textsplitter"
)

func DownloadReport(filename string) {
	_, err := os.Stat(filename)
	if err == nil {
		return
	}

	const url = "https://investors.mongodb.com/node/12236"
	log.Println("Downloading ", url, " to ", filename)

	resp, err := http.Get(url)
	if err != nil {
		log.Fatalf("failed to connect to download the report: %v", err)
	}

	defer func() {
		if err := resp.Body.Close(); err != nil {
			log.Fatalf("failed to close the resource: %v", err)
		}
	}()

	f, err := os.Create(filename)
	if err != nil {
		return
	}
	defer func() {
		if err := f.Close(); err != nil {
			log.Fatalf("failed to close file: %v", err)
		}
	}()

	_, err = io.Copy(f, resp.Body)
	if err != nil {
		log.Fatalf("failed to copy the report: %v", err)
	}
}

func ProcessFile(filename string) []schema.Document {
	ctx := context.Background()
	f, err := os.Open(filename)
	if err != nil {
		log.Fatalf("failed to open file: %v", err)
	}
	defer func() {
		if err := f.Close(); err != nil {
			log.Fatalf("failed to close file: %v", err)
		}
	}()

	html := documentloaders.NewHTML(f)
	split := textsplitter.NewRecursiveCharacter()
	split.ChunkSize = 400
	split.ChunkOverlap = 20
	docs, err := html.LoadAndSplit(ctx, split)
	if err != nil {
		log.Fatalf("failed to chunk the HTML into documents: %v", err)
	}
	log.Printf("Successfully chunked the HTML into %v documents.\n", len(docs))

	return docs
}
