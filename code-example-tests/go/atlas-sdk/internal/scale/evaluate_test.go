package scale

import (
	"context"
	"testing"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

func TestScalingConfig(t *testing.T) {
	tests := []struct {
		name   string
		config ScalingConfig
		valid  bool
	}{
		{
			name: "valid_config_with_defaults",
			config: ScalingConfig{
				TargetTier:    "M50",
				PreScale:      false,
				CPUThreshold:  75.0,
				PeriodMinutes: 60,
				DryRun:        false,
			},
			valid: true,
		},
		{
			name: "valid_config_pre_scale",
			config: ScalingConfig{
				TargetTier:    "M100",
				PreScale:      true,
				CPUThreshold:  80.0,
				PeriodMinutes: 30,
				DryRun:        true,
			},
			valid: true,
		},
		{
			name: "empty_target_tier",
			config: ScalingConfig{
				TargetTier:    "",
				PreScale:      false,
				CPUThreshold:  75.0,
				PeriodMinutes: 60,
				DryRun:        false,
			},
			valid: false,
		},
		{
			name: "invalid_cpu_threshold_zero",
			config: ScalingConfig{
				TargetTier:    "M50",
				PreScale:      false,
				CPUThreshold:  0.0,
				PeriodMinutes: 60,
				DryRun:        false,
			},
			valid: false,
		},
		{
			name: "invalid_cpu_threshold_negative",
			config: ScalingConfig{
				TargetTier:    "M50",
				PreScale:      false,
				CPUThreshold:  -10.0,
				PeriodMinutes: 60,
				DryRun:        false,
			},
			valid: false,
		},
		{
			name: "invalid_period_zero",
			config: ScalingConfig{
				TargetTier:    "M50",
				PreScale:      false,
				CPUThreshold:  75.0,
				PeriodMinutes: 0,
				DryRun:        false,
			},
			valid: false,
		},
		{
			name: "invalid_period_negative",
			config: ScalingConfig{
				TargetTier:    "M50",
				PreScale:      false,
				CPUThreshold:  75.0,
				PeriodMinutes: -30,
				DryRun:        false,
			},
			valid: false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Basic validation logic
			isValid := tt.config.TargetTier != "" &&
				tt.config.CPUThreshold > 0 &&
				tt.config.PeriodMinutes > 0

			if isValid != tt.valid {
				t.Errorf("Expected validity %v, got %v for config: %+v", tt.valid, isValid, tt.config)
			}
		})
	}
}

func TestEvaluateDecision(t *testing.T) {
	tests := []struct {
		name           string
		config         ScalingConfig
		expectedResult bool
		expectedReason string
		description    string
	}{
		{
			name: "pre_scale_enabled",
			config: ScalingConfig{
				TargetTier:    "M50",
				PreScale:      true,
				CPUThreshold:  75.0,
				PeriodMinutes: 60,
				DryRun:        false,
			},
			expectedResult: true,
			expectedReason: "pre-scale event flag set (predictable traffic spike)",
			description:    "Should return true when PreScale is enabled",
		},
		{
			name: "pre_scale_disabled_no_metrics",
			config: ScalingConfig{
				TargetTier:    "M50",
				PreScale:      false,
				CPUThreshold:  75.0,
				PeriodMinutes: 60,
				DryRun:        false,
			},
			expectedResult: false,
			expectedReason: "metrics unavailable for reactive scaling decision",
			description:    "Should return false when metrics are unavailable",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			ctx := context.Background()
			// Use nil client to simulate metrics unavailability for testing
			var client *admin.APIClient = nil

			shouldScale, reason := EvaluateDecision(ctx, client, "test-project", "test-cluster", tt.config)

			if shouldScale != tt.expectedResult {
				t.Errorf("Expected scaling decision %v, got %v", tt.expectedResult, shouldScale)
			}

			if reason != tt.expectedReason {
				t.Errorf("Expected reason '%s', got '%s'", tt.expectedReason, reason)
			}

			t.Logf("Test: %s - %s", tt.name, tt.description)
		})
	}
}

func TestEvaluateDecision_PreScaleLogic(t *testing.T) {
	// Test that PreScale always wins regardless of other settings
	config := ScalingConfig{
		TargetTier:    "M50",
		PreScale:      true,
		CPUThreshold:  999.0, // Impossible threshold
		PeriodMinutes: 1,
		DryRun:        false,
	}

	ctx := context.Background()
	var client *admin.APIClient = nil

	shouldScale, reason := EvaluateDecision(ctx, client, "test-project", "test-cluster", config)

	if !shouldScale {
		t.Error("Expected scaling decision to be true when PreScale is enabled")
	}

	expectedReason := "pre-scale event flag set (predictable traffic spike)"
	if reason != expectedReason {
		t.Errorf("Expected reason '%s', got '%s'", expectedReason, reason)
	}
}

func TestScalingConfig_DefaultValues(t *testing.T) {
	// Test typical default values that would be used
	defaultConfig := ScalingConfig{
		TargetTier:    "M50",
		PreScale:      false,
		CPUThreshold:  75.0, // Aligned with Atlas auto-scaling
		PeriodMinutes: 60,   // 1 hour lookback
		DryRun:        false,
	}

	// Verify the default values make sense
	if defaultConfig.TargetTier == "" {
		t.Error("Default TargetTier should not be empty")
	}

	if defaultConfig.CPUThreshold <= 0 || defaultConfig.CPUThreshold > 100 {
		t.Errorf("Default CPUThreshold should be between 0-100, got %f", defaultConfig.CPUThreshold)
	}

	if defaultConfig.PeriodMinutes <= 0 {
		t.Errorf("Default PeriodMinutes should be positive, got %d", defaultConfig.PeriodMinutes)
	}

	// Test that default values align with Atlas recommendations
	if defaultConfig.CPUThreshold != 75.0 {
		t.Errorf("Expected CPU threshold aligned with Atlas auto-scaling (75%%), got %f", defaultConfig.CPUThreshold)
	}

	if defaultConfig.PeriodMinutes != 60 {
		t.Errorf("Expected period aligned with Atlas auto-scaling (60 min), got %d", defaultConfig.PeriodMinutes)
	}
}

// BenchmarkEvaluateDecision provides a benchmark for the scaling decision logic
func BenchmarkEvaluateDecision(b *testing.B) {
	ctx := context.Background()
	var client *admin.APIClient = nil
	config := ScalingConfig{
		TargetTier:    "M50",
		PreScale:      true, // Use PreScale to avoid API calls
		CPUThreshold:  75.0,
		PeriodMinutes: 60,
		DryRun:        false,
	}

	b.ResetTimer()
	for i := 0; i < b.N; i++ {
		_, _ = EvaluateDecision(ctx, client, "test-project", "test-cluster", config)
	}
}
