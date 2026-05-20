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

