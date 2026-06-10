package main

// Error represents a comparison failure with path context.
type Error struct {
	Path     string `json:"path"`
	Expected string `json:"expected,omitempty"`
	Actual   string `json:"actual,omitempty"`
	Message  string `json:"message"`
}
