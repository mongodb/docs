package orgutils

import (
	"context"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/mock"
	"github.com/stretchr/testify/require"
	"go.mongodb.org/atlas-sdk/v20250219001/admin"
	"go.mongodb.org/atlas-sdk/v20250219001/mockadmin"
)

func TestGetOrganizationName_Success(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	orgID := "org123"
	orgName := "Test Organization"

	mockOrg := &admin.AtlasOrganization{
		Id:   &orgID,
		Name: orgName,
	}

	mockOrgSvc := mockadmin.NewOrganizationsApi(t)
	mockOrgSvc.EXPECT().
		GetOrganization(mock.Anything, orgID).
		Return(admin.GetOrganizationApiRequest{ApiService: mockOrgSvc}).Once()
	mockOrgSvc.EXPECT().
		GetOrganizationExecute(mock.Anything).
		Return(mockOrg, nil, nil).Once()

	result, err := GetOrganizationName(ctx, mockOrgSvc, orgID)

	require.NoError(t, err)
	assert.Equal(t, orgName, result)
}

func TestGetOrganizationName_ApiError(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	orgID := "org123"

	mockOrgSvc := mockadmin.NewOrganizationsApi(t)
	mockOrgSvc.EXPECT().
		GetOrganization(mock.Anything, orgID).
		Return(admin.GetOrganizationApiRequest{ApiService: mockOrgSvc}).Once()
	mockOrgSvc.EXPECT().
		GetOrganizationExecute(mock.Anything).
		Return(nil, nil, assert.AnError).Once()

	result, err := GetOrganizationName(ctx, mockOrgSvc, orgID)

	require.Error(t, err)
	assert.Equal(t, orgID, result) // Should return orgID as fallback
	assert.Contains(t, err.Error(), "get organization details")
}

func TestGetOrganizationName_NilResponse(t *testing.T) {
	t.Parallel()
	ctx := context.Background()
	orgID := "org123"

	mockOrgSvc := mockadmin.NewOrganizationsApi(t)
	mockOrgSvc.EXPECT().
		GetOrganization(mock.Anything, orgID).
		Return(admin.GetOrganizationApiRequest{ApiService: mockOrgSvc}).Once()
	mockOrgSvc.EXPECT().
		GetOrganizationExecute(mock.Anything).
		Return(nil, nil, nil).Once()

	result, err := GetOrganizationName(ctx, mockOrgSvc, orgID)

	require.Error(t, err)
	assert.Equal(t, orgID, result) // Should return orgID as fallback
	assert.Contains(t, err.Error(), "organization response is nil")
}

func TestSanitizeForFilename_BasicCases(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{
			name:     "simple name with spaces",
			input:    "My Organization",
			expected: "my_organization",
		},
		{
			name:     "name with multiple spaces",
			input:    "My   Test   Org",
			expected: "my_test_org",
		},
		{
			name:     "name with special characters",
			input:    "My Org! @#$%",
			expected: "my_org",
		},
		{
			name:     "name with hyphens",
			input:    "My-Test-Org",
			expected: "my-test-org",
		},
		{
			name:     "name with underscores",
			input:    "My_Test_Org",
			expected: "my_test_org",
		},
		{
			name:     "name with mixed case",
			input:    "MyTestOrg",
			expected: "mytestorg",
		},
		{
			name:     "empty string",
			input:    "",
			expected: "",
		},
		{
			name:     "name with leading/trailing spaces",
			input:    "  My Org  ",
			expected: "my_org",
		},
		{
			name:     "name with tabs and newlines",
			input:    "My\tOrg\nTest",
			expected: "my_org_test",
		},
		{
			name:     "name with periods",
			input:    "My.Org.Test",
			expected: "my.org.test",
		},
		{
			name:     "name with only special characters",
			input:    "@#$%^&*()",
			expected: "",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := SanitizeForFilename(tt.input)
			assert.Equal(t, tt.expected, result)
		})
	}
}

func TestSanitizeForFilename_LongName(t *testing.T) {
	// Create a very long name (over 100 characters)
	longName := "This is a very long organization name that exceeds the maximum allowed length for filenames and should be truncated"
	result := SanitizeForFilename(longName)

	assert.LessOrEqual(t, len(result), 100)
	assert.True(t, len(result) > 0)
}
