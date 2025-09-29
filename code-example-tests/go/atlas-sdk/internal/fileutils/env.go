package fileutils

import (
	"os"
	"path/filepath"
)

// DownloadsBaseDir returns the base directory for downloads as specified by the
// ATLAS_DOWNLOADS_DIR environment variable. If the variable is not set, it
// returns an empty string.
func DownloadsBaseDir() string {
	return os.Getenv("ATLAS_DOWNLOADS_DIR")
}

// ResolveWithDownloadsBase returns dir prefixed with the global downloads base
// directory when ATLAS_DOWNLOADS_DIR is set; otherwise returns dir as-is.
func ResolveWithDownloadsBase(dir string) string {
	base := DownloadsBaseDir()
	if base == "" {
		return dir
	}
	return filepath.Join(base, dir)
}
