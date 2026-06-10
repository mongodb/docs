package compare

import (
	"fmt"
	"os"
	"path/filepath"
)

// resolveFilePath resolves a file path relative to the running test. It accepts
// absolute paths, paths relative to the working directory, and paths relative
// to any ancestor "driver" directory of the working directory (which is how
// the production tests reference fixtures under examples/).
//
// Returns the resolved absolute path on success, or an error if no candidate
// exists on disk.
func resolveFilePath(path string) (string, error) {
	if filepath.IsAbs(path) {
		if _, err := os.Stat(path); err == nil {
			return path, nil
		}
	}

	if _, err := os.Stat(path); err == nil {
		return path, nil
	}

	wd, err := os.Getwd()
	if err != nil {
		return "", fmt.Errorf("failed to get working directory: %w", err)
	}

	for {
		if wd == "/" || wd == "." {
			break
		}
		if filepath.Base(wd) == "driver" {
			candidate := filepath.Join(wd, path)
			if _, err := os.Stat(candidate); err == nil {
				return candidate, nil
			}
		}
		parent := filepath.Dir(wd)
		if parent == wd {
			break
		}
		wd = parent
	}

	return "", fmt.Errorf("failed to find file: %s from any driver directory", path)
}
