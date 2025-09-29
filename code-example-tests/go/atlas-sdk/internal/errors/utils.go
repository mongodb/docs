package errors

import (
	"fmt"

	"go.mongodb.org/atlas-sdk/v20250219001/admin"
)

// FormatError formats an error message for a specific operation and entity ID
func FormatError(operation string, entityID string, err error) error {
	if apiErr, ok := admin.AsError(err); ok && apiErr.GetDetail() != "" {
		return fmt.Errorf("%s for %s: %w: %s", operation, entityID, err, apiErr.GetDetail())
	}
	return fmt.Errorf("%s for %s: %w", operation, entityID, err)
}

// WithContext adds context information to an error
func WithContext(err error, context string) error {
	return fmt.Errorf("%s: %w", context, err)
}

// ValidationError represents an error due to invalid input parameters
type ValidationError struct {
	Message string
}

// Error implements the ValidationError error interface
func (e *ValidationError) Error() string {
	return fmt.Sprintf("validation error: %s", e.Message)
}

// NotFoundError represents an error when a requested resource cannot be found
type NotFoundError struct {
	Resource string
	ID       string
}

// Error implements the error interface
func (e *NotFoundError) Error() string {
	return fmt.Sprintf("resource not found: %s [%s]", e.Resource, e.ID)
}
