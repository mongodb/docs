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

	// Fetch process metrics with the provided parameters
	p := &admin.GetHostMeasurementsApiParams{
		GroupId:   cfg.ProjectID,
		ProcessId: cfg.ProcessID,
		M: &[]string{
			"OPCOUNTER_INSERT", "OPCOUNTER_QUERY", "OPCOUNTER_UPDATE", "TICKETS_AVAILABLE_READS",
			"TICKETS_AVAILABLE_WRITE", "CONNECTIONS", "QUERY_TARGETING_SCANNED_OBJECTS_PER_RETURNED",
			"QUERY_TARGETING_SCANNED_PER_RETURNED", "SYSTEM_CPU_GUEST", "SYSTEM_CPU_IOWAIT",
			"SYSTEM_CPU_IRQ", "SYSTEM_CPU_KERNEL", "SYSTEM_CPU_NICE", "SYSTEM_CPU_SOFTIRQ",
			"SYSTEM_CPU_STEAL", "SYSTEM_CPU_USER",
		},
		Granularity: admin.PtrString("PT1H"),
		Period:      admin.PtrString("P7D"),
	}

	view, err := metrics.FetchProcessMetrics(ctx, client.MonitoringAndLogsApi, p)
	if err != nil {
		log.Fatalf("Failed to fetch process metrics: %v", err)
	}

	// Output metrics
	out, err := json.MarshalIndent(view, "", "  ")
	if err != nil {
		log.Fatalf("Failed to format metrics data: %v", err)
	}
	fmt.Println(string(out))
}

