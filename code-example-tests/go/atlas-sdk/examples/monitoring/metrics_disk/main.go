// :snippet-start: get-metrics-dev
// :state-remove-start: copy
// See entire project at https://github.com/mongodb/atlas-architecture-go-sdk
// :state-remove-end: [copy]
package main

import (
	"context"
	"encoding/json"
	"fmt"
	"log"

	"atlas-sdk-examples/internal/auth"
	"atlas-sdk-examples/internal/config"
	"atlas-sdk-examples/internal/metrics"

	"github.com/joho/godotenv"
	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

func main() {
	envFile := ".env.development"
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

	// Fetch disk metrics with the provided parameters
	p := &admin.GetDiskMeasurementsApiParams{
		GroupId:       cfg.ProjectID,
		ProcessId:     cfg.ProcessID,
		PartitionName: "data",
		M:             &[]string{"DISK_PARTITION_SPACE_FREE", "DISK_PARTITION_SPACE_USED"},
		Granularity:   admin.PtrString("P1D"),
		Period:        admin.PtrString("P1D"),
	}
	view, err := metrics.FetchDiskMetrics(ctx, client.MonitoringAndLogsApi, p)
	if err != nil {
		log.Fatalf("Failed to fetch disk metrics: %v", err)
	}

	// Output metrics
	out, err := json.MarshalIndent(view, "", "  ")
	if err != nil {
		log.Fatalf("Failed to format metrics data: %v", err)
	}
	fmt.Println(string(out))
}

// :snippet-end: [get-metrics-dev]
// :state-remove-start: copy
// NOTE: INTERNAL
// ** OUTPUT EXAMPLE **
// {
//   "measurements": [
//     {
//       "name": "DISK_PARTITION_SPACE_FREE",
//       "granularity": "P1D",
//       "period": "P1D",
//       "values": [
//         {
//           "timestamp": "2023-10-01T00:00:00Z",
//           "value": 1234567890
//         },
//         {
//           "timestamp": "2023-10-02T00:00:00Z",
//           "value": 1234567890
//         }
//       ]
//     },
//	 	...
//   ]
// }
// :state-remove-end: [copy]
