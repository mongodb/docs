// See entire project at https://github.com/mongodb/atlas-architecture-go-sdk
package main

import (
	"context"
	"fmt"
	"log"

	"atlas-sdk-examples/internal/auth"
	"atlas-sdk-examples/internal/config"
	"atlas-sdk-examples/internal/fileutils"
	"atlas-sdk-examples/internal/logs"

	"github.com/joho/godotenv"
	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

func main() {
	envFile := ".env.production"
	if err := godotenv.Load(envFile); err != nil {
		log.Printf("Warning: could not load %s file: %v", envFile, err)
	}

	secrets, cfg, err := config.LoadAllFromEnv()
	if err != nil {
		log.Fatalf("Failed to load configuration %v", err)
	}

	ctx := context.Background()
	client, err := auth.NewClient(ctx, cfg, secrets)
	if err != nil {
		log.Fatalf("Failed to initialize authentication client: %v", err)
	}

	// Fetch logs with the provided parameters
	p := &admin.GetHostLogsApiParams{
		GroupId:  cfg.ProjectID,
		HostName: cfg.HostName,
		LogName:  "mongodb",
	}
	fmt.Printf("Request parameters: GroupID=%s, HostName=%s, LogName=%s\n",
		cfg.ProjectID, cfg.HostName, p.LogName)
	rc, err := logs.FetchHostLogs(ctx, client.MonitoringAndLogsApi, p)
	if err != nil {
		log.Fatalf("Failed to fetch logs: %v", err)
	}
	defer fileutils.SafeClose(rc)

	// Prepare output paths
	// If the ATLAS_DOWNLOADS_DIR env variable is set, it will be used as the base directory for output files
	outDir := "logs"
	prefix := fmt.Sprintf("%s_%s", p.HostName, p.LogName)
	gzPath, err := fileutils.GenerateOutputPath(outDir, prefix, "gz")
	if err != nil {
		log.Fatalf("Failed to generate GZ output path: %v", err)
	}
	txtPath, err := fileutils.GenerateOutputPath(outDir, prefix, "txt")
	if err != nil {
		log.Fatalf("Failed to generate TXT output path: %v", err)
	}

	// Save compressed logs
	if err := fileutils.WriteToFile(rc, gzPath); err != nil {
		log.Fatalf("Failed to save compressed logs: %v", err)
	}
	fmt.Println("Saved compressed log to", gzPath)

	// Decompress logs
	if err := fileutils.DecompressGzip(gzPath, txtPath); err != nil {
		log.Fatalf("Failed to decompress logs: %v", err)
	}
	fmt.Println("Uncompressed log to", txtPath)
}

