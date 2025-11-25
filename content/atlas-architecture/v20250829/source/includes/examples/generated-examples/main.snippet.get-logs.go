// See entire project at https://github.com/mongodb/atlas-architecture-go-sdk
package main

import (
	"atlas-sdk-go/internal/auth"
	"compress/gzip"
	"context"
	"fmt"
	"io"
	"log"
	"os"
	"strings"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

func SafeClose(c io.Closer) {
	if c != nil {
		if err := c.Close(); err != nil {
			log.Printf("Warning: failed to close resource: %v", err)
		}
	}
}

// getHostLogs downloads a compressed .gz file that contains the MongoDB logs for
// the specified host in your project.
func getHostLogs(ctx context.Context, atlasClient admin.APIClient, params *admin.GetHostLogsApiParams) (string, error) {
	logFileName := fmt.Sprintf("logs_%s_%s.gz", params.GroupId, params.HostName)
	fmt.Printf("Fetching %s log for host %s in project %s\n", params.LogName, params.HostName, params.GroupId)

	if err := downloadLogs(ctx, atlasClient, params, logFileName); err != nil {
		return "", err
	}

	fmt.Printf("Logs saved to %s\n", logFileName)
	return logFileName, nil
}

func downloadLogs(ctx context.Context, atlasClient admin.APIClient, params *admin.GetHostLogsApiParams, filePath string) error {
	resp, _, err := atlasClient.MonitoringAndLogsApi.GetHostLogsWithParams(ctx, params).Execute()
	if err != nil {
		return fmt.Errorf("fetch logs: %w", err)
	}
	defer SafeClose(resp)

	file, err := os.Create(filePath)
	if err != nil {
		return fmt.Errorf("create %q: %w", filePath, err)
	}
	defer SafeClose(file)

	if _, err := io.Copy(file, resp); err != nil {
		return fmt.Errorf("write to %q: %w", filePath, err)
	}

	return nil
}

func unzipGzFile(srcPath, destPath string) error {
	srcFile, err := os.Open(srcPath)
	if err != nil {
		return fmt.Errorf("open gz file: %w", err)
	}
	defer SafeClose(srcFile)

	gzReader, err := gzip.NewReader(srcFile)
	if err != nil {
		return fmt.Errorf("create gzip reader: %w", err)
	}
	defer SafeClose(gzReader)

	destFile, err := os.Create(destPath)
	if err != nil {
		return fmt.Errorf("create destination file: %w", err)
	}
	defer SafeClose(destFile)

	if _, err := io.Copy(destFile, gzReader); err != nil {
		return fmt.Errorf("unzip copy error: %w", err)
	}

	fmt.Printf("Unzipped logs to %s\n", destPath)
	return nil
}

func main() {
	ctx := context.Background()

	// Create an Atlas client authenticated using OAuth2 with service account credentials
	client, _, config, err := auth.CreateAtlasClient()
	if err != nil {
		log.Fatalf("Failed to create Atlas client: %v", err)
	}

	params := &admin.GetHostLogsApiParams{
		GroupId:  config.ProjectID,
		HostName: config.HostName,
		LogName:  "mongodb",       // The type of log to get ("mongodb" or "mongos")
	}

	logFileName, err := getHostLogs(ctx, *client, params)
	if err != nil {
		log.Fatalf("Failed to download logs: %v", err)
	}

	plainTextLog := strings.TrimSuffix(logFileName, ".gz") + ".log"
	if err := unzipGzFile(logFileName, plainTextLog); err != nil {
		log.Fatalf("Failed to unzip log file: %v", err)
	}

}

