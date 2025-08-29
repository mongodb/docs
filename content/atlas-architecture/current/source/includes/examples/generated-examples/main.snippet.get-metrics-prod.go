// See entire project at https://github.com/mongodb/atlas-architecture-go-sdk
package main

import (
	"atlas-sdk-go/internal/auth"
	"context"
	"encoding/json"
	"fmt"
	"log"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

// getProcessMetrics fetches metrics for a specified host process in a project and prints results to the console
func getProcessMetrics(ctx context.Context, atlasClient admin.APIClient, params *admin.GetHostMeasurementsApiParams) (*admin.ApiMeasurementsGeneralViewAtlas, error) {
	fmt.Printf("Fetching metrics for host process %s in project %s", params.ProcessId, params.GroupId)

	resp, _, err := atlasClient.MonitoringAndLogsApi.GetHostMeasurementsWithParams(ctx, params).Execute()
	if err != nil {
		if apiError, ok := admin.AsError(err); ok {
			return nil, fmt.Errorf("failed to get metrics for process in host: %s (API error: %v)", err, apiError.GetDetail())
		}
		return nil, fmt.Errorf("failed to get metrics: %w", err)
	}

	if resp == nil || resp.HasMeasurements() == false {
		return nil, fmt.Errorf("no metrics found for host process %s in project %s", params.ProcessId, params.GroupId)
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

	// Fetch process metrics using the following parameters:
	processMetricGranularity := admin.PtrString("PT1H")
	processMetricPeriod := admin.PtrString("P7D")
	processMetrics := []string{
		"OPCOUNTER_DELETE", "OPCOUNTER_INSERT", "OPCOUNTER_QUERY", "OPCOUNTER_UPDATE",
		"CONNECTIONS", "QUERY_TARGETING_SCANNED_OBJECTS_PER_RETURNED",
		"QUERY_TARGETING_SCANNED_PER_RETURNED", "SYSTEM_CPU_GUEST", "SYSTEM_CPU_IOWAIT",
		"SYSTEM_CPU_IRQ", "SYSTEM_CPU_KERNEL", "SYSTEM_CPU_NICE", "SYSTEM_CPU_SOFTIRQ",
		"SYSTEM_CPU_STEAL", "SYSTEM_CPU_USER", "GLOBAL_LOCK_CURRENT_QUEUE_TOTAL",
		"GLOBAL_LOCK_CURRENT_QUEUE_READERS", "GLOBAL_LOCK_CURRENT_QUEUE_WRITERS",
	}
	hostMeasurementsParams := &admin.GetHostMeasurementsApiParams{
		GroupId:     config.ProjectID,
		ProcessId:   config.ProcessID,
		M:           &processMetrics,
		Granularity: processMetricGranularity,
		Period:      processMetricPeriod,
	}
	_, err = getProcessMetrics(ctx, *atlasClient, hostMeasurementsParams)
	if err != nil {
		fmt.Printf("Error fetching host process metrics: %v", err)
	}
}
