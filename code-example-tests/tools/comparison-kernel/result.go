package main

import (
	"fmt"
	"strings"
)

// Result represents the outcome of a comparison.
type Result struct {
	IsMatch bool    `json:"isMatch"`
	Errors  []Error `json:"errors,omitempty"`
}

// Error implements the error interface for Result.
func (r Result) Error() string {
	if r.IsMatch {
		return ""
	}
	var msgs []string
	for _, err := range r.Errors {
		msgs = append(msgs, fmt.Sprintf("%s: %s", err.Path, err.Message))
	}
	return strings.Join(msgs, "; ")
}
