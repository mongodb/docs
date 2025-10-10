package billing

import (
	"strings"
)

// determineProvider identifies the cloud provider based on SKU
func determineProvider(sku string) string {
	uppercaseSku := strings.ToUpper(sku)

	if strings.Contains(uppercaseSku, "AWS") {
		return "AWS"
	} else if strings.Contains(strings.ToUpper(sku), "AZURE") {
		return "AZURE"
	} else if strings.Contains(strings.ToUpper(sku), "GCP") {
		return "GCP"
	}
	return "n/a"
}

// determineInstance extracts the instance type from SKU
func determineInstance(sku string) string {
	uppercaseSku := strings.ToUpper(sku)

	parts := strings.Split(uppercaseSku, "_INSTANCE_")
	if len(parts) > 1 {
		return parts[1]
	}
	return "non-instance"
}

// determineCategory identifies the service category based on SKU
func determineCategory(sku string) string {
	uppercaseSku := strings.ToUpper(sku)

	// Category patterns are defined in order of specificity
	categoryPatterns := []struct {
		pattern  string
		category string
	}{
		{"CLASSIC_BACKUP", "Legacy Backup"},
		{"BACKUP_SNAPSHOT", "Backup"},
		{"BACKUP_DOWNLOAD", "Backup"},
		{"BACKUP_STORAGE", "Backup"},
		{"DATA_FEDERATION", "Atlas Data Federation"},
		{"DATA_LAKE", "Atlas Data Federation"},
		{"STREAM_PROCESSING", "Atlas Stream Processing"},
		{"PRIVATE_ENDPOINT", "Data Transfer"},
		{"DATA_TRANSFER", "Data Transfer"},
		{"SNAPSHOT_COPY", "Backup"},
		{"SNAPSHOT_EXPORT", "Backup"},
		{"OBJECT_STORAGE", "Backup"},
		{"PIT_RESTORE", "Backup"},
		{"BI_CONNECTOR", "BI Connector"},
		{"CHARTS", "Charts"},
		{"INSTANCE", "Clusters"},
		{"MMS", "Cloud Manager Standard/Premium"},
		{"CLASSIC_COUPON", "Credits"},
		{"CREDIT", "Credits"},
		{"MINIMUM_CHARGE", "Credits"},
		{"FLEX_CONSULTING", "Flex Consulting"},
		{"AUDITING", "Premium Features"},
		{"ADVANCED_SECURITY", "Premium Features"},
		{"SERVERLESS", "Serverless Instances"},
		{"STORAGE", "Storage"},
		{"ENTITLEMENTS", "Support"},
		{"FREE_SUPPORT", "Support"},
		{"REALM", "App Services"},
		{"STITCH", "App Services"},
	}

	for _, pc := range categoryPatterns {
		if strings.Index(uppercaseSku, pc.pattern) != -1 {
			return pc.category
		}
	}
	return "Other"
}
