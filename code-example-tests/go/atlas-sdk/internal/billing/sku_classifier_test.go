package billing

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestDetermineProvider(t *testing.T) {
	tests := []struct {
		name     string
		sku      string
		expected string
	}{
		{"AWS SKU", "NDS_AWS_INSTANCE_M10", "AWS"},
		{"AZURE SKU", "NDS_AZURE_INSTANCE_M20", "AZURE"},
		{"GCP SKU", "NDS_GCP_INSTANCE_M30", "GCP"},
		{"Unknown provider", "NDS_INSTANCE_M40", "n/a"},
		{"Empty SKU", "", "n/a"},
		{"Mixed case", "nds_Aws_instance", "AWS"},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			result := determineProvider(tc.sku)
			assert.Equal(t, tc.expected, result)
		})
	}
}

func TestDetermineInstance(t *testing.T) {
	tests := []struct {
		name     string
		sku      string
		expected string
	}{
		{"Basic instance", "NDS_AWS_INSTANCE_M10", "M10"},
		{"Complex instance name", "NDS_AWS_INSTANCE_M40_NVME", "M40_NVME"},
		{"Serverless instance", "NDS_AWS_SERVERLESS_RPU", "non-instance"},
		{"Empty SKU", "", "non-instance"},
		{"Search instance", "NDS_AWS_SEARCH_INSTANCE_S20_COMPUTE_NVME", "S20_COMPUTE_NVME"},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			result := determineInstance(tc.sku)
			assert.Equal(t, tc.expected, result)
		})
	}
}

func TestDetermineCategory(t *testing.T) {
	tests := []struct {
		name     string
		sku      string
		expected string
	}{
		{"Instance category", "NDS_AWS_INSTANCE_M10", "Clusters"},
		{"Backup category", "NDS_AWS_BACKUP_SNAPSHOT_STORAGE", "Backup"},
		{"PIT Restore", "NDS_AWS_PIT_RESTORE_STORAGE", "Backup"},
		{"Legacy Backup", "CLASSIC_BACKUP_STORAGE", "Legacy Backup"},
		{"Data Transfer", "NDS_AWS_DATA_TRANSFER_SAME_REGION", "Data Transfer"},
		{"Storage", "NDS_AWS_STORAGE_STANDARD", "Storage"},
		{"BI Connector", "NDS_BI_CONNECTOR", "BI Connector"},
		{"Data Lake", "DATA_LAKE_AWS_DATA_SCANNED", "Atlas Data Federation"},
		{"Data Federation", "DATA_FEDERATION_AZURE_DATA_SCANNED", "Atlas Data Federation"},
		{"Auditing", "NDS_ENTERPRISE_AUDITING", "Premium Features"},
		{"Atlas Support", "NDS_ENTITLEMENTS", "Support"},
		{"Free Support", "NDS_FREE_SUPPORT", "Support"},
		{"Charts", "CHARTS_DATA_DOWNLOADED", "Charts"},
		{"Serverless", "NDS_AWS_SERVERLESS_RPU", "Serverless Instances"},
		{"Security", "NDS_ADVANCED_SECURITY", "Premium Features"},
		{"Private Endpoint", "NDS_AWS_PRIVATE_ENDPOINT", "Data Transfer"},
		{"Cloud Manager", "MMS_PREMIUM", "Cloud Manager Standard/Premium"},
		{"Stream Processing", "NDS_AWS_STREAM_PROCESSING_INSTANCE_SP10", "Atlas Stream Processing"},
		{"App Services", "REALM_APP_REQUESTS", "App Services"},
		{"Credits", "CREDIT", "Credits"},
		{"Flex Consulting", "MONGODB_FLEX_CONSULTING", "Flex Consulting"},
		{"Other category", "UNKNOWN_SKU_TYPE", "Other"},
		{"Empty SKU", "", "Other"},
		{"Overlapping patterns", "NDS_AWS_SERVERLESS_STORAGE", "Serverless Instances"},
		{"Conflicting patterns", "NDS_AZURE_DATA_LAKE_STORAGE", "Atlas Data Federation"},
	}

	for _, tc := range tests {
		t.Run(tc.name, func(t *testing.T) {
			result := determineCategory(tc.sku)
			assert.Equal(t, tc.expected, result)
		})
	}
}
