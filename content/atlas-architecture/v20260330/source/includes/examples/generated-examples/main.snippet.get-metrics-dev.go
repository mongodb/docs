// See entire project at https://github.com/mongodb/atlas-architecture-go-sdk
package main

import (
	"atlas-sdk-go/internal/auth"
	"context"
	"encoding/json"
	"fmt"
	"go.mongodb.org/atlas-sdk/v20250219001/admin"
	"log"
)

// getDiskMetrics fetches metrics for a specified disk partition in a project and prints results to the console
func getDiskMetrics(ctx context.Context, atlasClient admin.APIClient, params *admin.GetDiskMeasurementsApiParams) (*admin.ApiMeasurementsGeneralViewAtlas, error) {

	resp, _, err := atlasClient.MonitoringAndLogsApi.GetDiskMeasurementsWithParams(ctx, params).Execute()
	if err != nil {
		if apiError, ok := admin.AsError(err); ok {
			return nil, fmt.Errorf("failed to get metrics for partition: %s (API error: %v)", err, apiError.GetDetail())
		}
		return nil, fmt.Errorf("failed to get metrics: %w", err)
	}
	if resp == nil || resp.HasMeasurements() == false {
		return nil, fmt.Errorf("no metrics found for partition %s in project %s", params.PartitionName, params.GroupId)
	}
	jsonData, err := json.MarshalIndent(resp, "", "  ")
	if err != nil {
		return nil, fmt.Errorf("failed to marshal response: %w", err)
	}
	fmt.Println(string(jsonData))
	return resp, nil
}

func main() {
	ctx := context.Background()

	// Create an Atlas client authenticated using OAuth2 with service account credentials
	atlasClient, _, config, err := auth.CreateAtlasClient()
	if err != nil {
		log.Fatalf("Failed to create Atlas client: %v", err)
	}

	// Fetch disk metrics using the following parameters:
	partitionName := "data"
	diskMetricsGranularity := admin.PtrString("P1D")
	diskMetricsPeriod := admin.PtrString("P1D")
	diskMetrics := []string{
		"DISK_PARTITION_SPACE_FREE", "DISK_PARTITION_SPACE_USED",
	}

	diskMeasurementsParams := &admin.GetDiskMeasurementsApiParams{
		GroupId:       config.ProjectID,
		ProcessId:     config.ProcessID,
		PartitionName: partitionName,
		M:             &diskMetrics,
		Granularity:   diskMetricsGranularity,
		Period:        diskMetricsPeriod,
	}
	_, err = getDiskMetrics(ctx, *atlasClient, diskMeasurementsParams)
	if err != nil {
		fmt.Printf("Error fetching disk metrics: %v", err)
	}
}

