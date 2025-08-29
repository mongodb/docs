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

