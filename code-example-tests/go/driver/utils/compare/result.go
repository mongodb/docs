package compare

import (
	"fmt"
	"strings"
)

// Result represents the outcome of a compare
type Result struct {
	IsMatch bool    `json:"isMatch"`
	Errors  []Error `json:"errors"`
}

// Error implements the error interface for Result
func (cr Result) Error() string {
	if cr.IsMatch {
		return ""
	}
	var msgs []string
	for _, err := range cr.Errors {
		msgs = append(msgs, fmt.Sprintf("%s: %s", err.Path, err.Message))
	}
	return strings.Join(msgs, "; ")
}
