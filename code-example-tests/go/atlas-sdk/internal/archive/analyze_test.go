package archive

import (
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestValidateCandidate_ReturnsError_WhenDatabaseOrCollectionNameMissing(t *testing.T) {
	opts := Options{MinimumRetentionDays: 30}
	err := ValidateCandidate(Candidate{
		DatabaseName:    "",
		CollectionName:  "coll",
		RetentionDays:   90,
		PartitionFields: []string{"createdAt"},
		DateField:       "createdAt",
		DateFormat:      "DATE",
	}, opts)
	assert.Error(t, err)
	err = ValidateCandidate(Candidate{
		DatabaseName:    "db",
		CollectionName:  "",
		RetentionDays:   90,
		PartitionFields: []string{"createdAt"},
		DateField:       "createdAt",
		DateFormat:      "DATE",
	}, opts)
	assert.Error(t, err)
}

func TestValidateCandidate_ReturnsError_WhenRetentionDaysTooLow(t *testing.T) {
	opts := Options{MinimumRetentionDays: 30}
	err := ValidateCandidate(Candidate{
		DatabaseName:    "db",
		CollectionName:  "coll",
		RetentionDays:   10,
		PartitionFields: []string{"createdAt"},
		DateField:       "createdAt",
		DateFormat:      "DATE",
	}, opts)
	assert.Error(t, err)
}

func TestValidateCandidate_ReturnsError_WhenNoPartitionFields(t *testing.T) {
	opts := Options{MinimumRetentionDays: 30}
	err := ValidateCandidate(Candidate{
		DatabaseName:    "db",
		CollectionName:  "coll",
		RetentionDays:   90,
		PartitionFields: []string{},
		DateField:       "createdAt",
		DateFormat:      "DATE",
	}, opts)
	assert.Error(t, err)
}

func TestValidateCandidate_ReturnsError_WhenInvalidDateFormat(t *testing.T) {
	opts := Options{MinimumRetentionDays: 30}
	err := ValidateCandidate(Candidate{
		DatabaseName:    "db",
		CollectionName:  "coll",
		RetentionDays:   90,
		PartitionFields: []string{"createdAt"},
		DateField:       "createdAt",
		DateFormat:      "INVALID",
	}, opts)
	assert.Error(t, err)
}

func TestValidateCandidate_ReturnsError_WhenDateFieldNotInPartitionFields(t *testing.T) {
	opts := Options{MinimumRetentionDays: 30}
	err := ValidateCandidate(Candidate{
		DatabaseName:    "db",
		CollectionName:  "coll",
		RetentionDays:   90,
		PartitionFields: []string{"otherField"},
		DateField:       "createdAt",
		DateFormat:      "DATE",
	}, opts)
	assert.Error(t, err)
}

func TestValidateCandidate_Succeeds_WithValidInput(t *testing.T) {
	opts := Options{MinimumRetentionDays: 30}
	err := ValidateCandidate(Candidate{
		DatabaseName:    "db",
		CollectionName:  "coll",
		RetentionDays:   90,
		PartitionFields: []string{"createdAt"},
		DateField:       "createdAt",
		DateFormat:      "DATE",
	}, opts)
	assert.NoError(t, err)
}

func TestDefaultOptions_ReturnsExpectedDefaults(t *testing.T) {
	opts := DefaultOptions()
	assert.Equal(t, 0, opts.DefaultRetentionMultiplier)
	assert.Equal(t, 0, opts.MinimumRetentionDays)
	assert.False(t, opts.EnableDataExpiration)
	assert.Equal(t, "", opts.ArchiveSchedule)
}
