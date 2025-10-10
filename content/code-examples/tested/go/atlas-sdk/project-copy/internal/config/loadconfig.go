package config

import (
	"encoding/json"
	"os"
	"strings"

	"atlas-sdk-examples/internal/errors"
)

// Config holds the configuration for connecting to MongoDB Atlas
type Config struct {
	BaseURL     string        `json:"MONGODB_ATLAS_BASE_URL"`
	OrgID       string        `json:"ATLAS_ORG_ID"`
	ProjectID   string        `json:"ATLAS_PROJECT_ID"`
	ClusterName string        `json:"ATLAS_CLUSTER_NAME"`
	HostName    string        `json:"ATLAS_HOSTNAME"`
	ProcessID   string        `json:"ATLAS_PROCESS_ID"`
	DR          DrOptions     `json:"disaster_recovery,omitempty"`
	Scaling     ScalingConfig `json:"programmatic_scaling,omitempty"`
}

// DrOptions holds the disaster recovery configuration parameters.
// Only the fields relevant to the chosen Scenario are required.
type DrOptions struct {
	Scenario     string `json:"scenario,omitempty"`      // "regional-outage" or "data-deletion"
	TargetRegion string `json:"target_region,omitempty"` // Region receiving added capacity (regional-outage)
	OutageRegion string `json:"outage_region,omitempty"` // Region considered impaired (regional-outage)
	AddNodes     int    `json:"add_nodes,omitempty"`     // Number of electable nodes to add (default: 1)
	SnapshotID   string `json:"snapshot_id,omitempty"`   // Snapshot ID to restore (data-deletion)
	DryRun       bool   `json:"dry_run,omitempty"`       // If true, only log intended actions
}

// ScalingConfig holds the programmatic scaling configuration parameters.
type ScalingConfig struct {
	TargetTier    string  `json:"target_tier,omitempty"`        // Desired tier for scaling operations (e.g. M50)
	PreScale      bool    `json:"pre_scale_event,omitempty"`    // Immediate scale for all clusters (e.g. planned launch/event)
	CPUThreshold  float64 `json:"cpu_threshold,omitempty"`      // Average CPU % threshold to trigger reactive scale
	PeriodMinutes int     `json:"cpu_period_minutes,omitempty"` // Lookback window in minutes for CPU averaging
	DryRun        bool    `json:"dry_run,omitempty"`            // If true, only log intended actions without executing
}

// LoadConfig reads a JSON configuration file and returns a Config struct
// It validates required fields and returns an error if any validation fails.
func LoadConfig(path string) (Config, error) {
	var config Config
	if path == "" {
		return config, &errors.ValidationError{
			Message: "configuration file path cannot be empty",
		}
	}

	data, err := os.ReadFile(path)
	if err != nil {
		if os.IsNotExist(err) {
			return config, &errors.NotFoundError{Resource: "configuration file", ID: path}
		}
		return config, errors.WithContext(err, "reading configuration file")
	}

	if err = json.Unmarshal(data, &config); err != nil {
		return config, errors.WithContext(err, "parsing configuration file")
	}

	if config.OrgID == "" {
		return config, &errors.ValidationError{
			Message: "organization ID is required in configuration",
		}
	}
	if config.ProjectID == "" {
		return config, &errors.ValidationError{
			Message: "project ID is required in configuration",
		}
	}

	if config.HostName == "" {
		if host, _, ok := strings.Cut(config.ProcessID, ":"); ok {
			config.HostName = host
		} else {
			return config, &errors.ValidationError{
				Message: "process ID must be in the format 'hostname:port'",
			}
		}
	}

	if config.BaseURL == "" {
		config.BaseURL = "https://cloud.mongodb.com" // Default base URL if not provided
	}

	return config, nil
}
