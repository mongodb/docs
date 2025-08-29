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
		"OPCOUNTER_INSERT", "OPCOUNTER_QUERY", "OPCOUNTER_UPDATE", "TICKETS_AVAILABLE_READS",
		"TICKETS_AVAILABLE_WRITE", "CONNECTIONS", "QUERY_TARGETING_SCANNED_OBJECTS_PER_RETURNED",
		"QUERY_TARGETING_SCANNED_PER_RETURNED", "SYSTEM_CPU_GUEST", "SYSTEM_CPU_IOWAIT",
		"SYSTEM_CPU_IRQ", "SYSTEM_CPU_KERNEL", "SYSTEM_CPU_NICE", "SYSTEM_CPU_SOFTIRQ",
		"SYSTEM_CPU_STEAL", "SYSTEM_CPU_USER",
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

