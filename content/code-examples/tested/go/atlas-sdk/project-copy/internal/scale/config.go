package scale

import (
	"atlas-sdk-examples/internal/config"
)

// ScalingConfig exposes config within scale package for tests and callers while reusing config.ScalingConfig.
type ScalingConfig = config.ScalingConfig

const (
	defaultTargetTier    = "M50"
	defaultCPUThreshold  = 75.0
	defaultPeriodMinutes = 60
)

// LoadScalingConfig loads programmatic scaling configuration with sensible defaults.
// Defaults are applied for missing optional fields to align with Atlas auto-scaling guidance.
func LoadScalingConfig(cfg config.Config) config.ScalingConfig {
	sc := cfg.Scaling

	// Apply defaults for missing values
	if sc.TargetTier == "" {
		sc.TargetTier = defaultTargetTier
	}

	if sc.CPUThreshold == 0 {
		sc.CPUThreshold = defaultCPUThreshold
	}

	if sc.PeriodMinutes == 0 {
		sc.PeriodMinutes = defaultPeriodMinutes
	}

	return sc
}
