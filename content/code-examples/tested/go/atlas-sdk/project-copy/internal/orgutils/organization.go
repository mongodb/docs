package orgutils

import (
	"context"
	"fmt"
	"regexp"
	"strings"

	"atlas-sdk-examples/internal/errors"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

// GetOrganizationName fetches an organization's name for the given organization ID.
// If the API call fails, it returns the orgID as a fallback name along with the error.
func GetOrganizationName(ctx context.Context, sdk admin.OrganizationsApi, orgID string) (string, error) {
	req := sdk.GetOrganization(ctx, orgID)
	org, _, err := req.Execute()
	if err != nil {
		return orgID, errors.FormatError("get organization details", orgID, err)
	}
	if org == nil {
		return orgID, fmt.Errorf("organization response is nil for ID %s", orgID)
	}
	return org.GetName(), nil
}

// SanitizeForFilename converts a string to be safe for use in filenames by:
// - Replacing whitespace with underscores
// - Removing or replacing special characters that are problematic in filenames
// - Converting to lowercase for consistency
// - Limiting length to avoid filesystem issues
func SanitizeForFilename(name string) string {
	if name == "" {
		return ""
	}

	// Convert to lowercase
	sanitized := strings.ToLower(name)

	// Replace whitespace (spaces, tabs, newlines) with underscores
	sanitized = regexp.MustCompile(`\s+`).ReplaceAllString(sanitized, "_")

	// Remove or replace problematic characters for filenames
	// Keep alphanumeric, underscores, hyphens, and periods
	sanitized = regexp.MustCompile(`[^a-z0-9_\-.]`).ReplaceAllString(sanitized, "")

	// Replace multiple consecutive underscores with a single one
	sanitized = regexp.MustCompile(`_+`).ReplaceAllString(sanitized, "_")

	// Trim leading/trailing underscores
	sanitized = strings.Trim(sanitized, "_")

	// Limit length to avoid filesystem issues (leaving room for prefix, timestamp, extension)
	maxLength := 100
	if len(sanitized) > maxLength {
		sanitized = sanitized[:maxLength]
	}

	return sanitized
}
