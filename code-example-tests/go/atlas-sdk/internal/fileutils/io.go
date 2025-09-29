package fileutils

import (
	"io"
	"log"
	"os"
	"path/filepath" // :remove:

	"atlas-sdk-examples/internal/errors"
)

// WriteToFile copies everything from r into a new file at path.
// It will create or truncate that file.
func WriteToFile(r io.Reader, path string) error {
	if r == nil {
		return &errors.ValidationError{Message: "reader cannot be nil"}
	}

	f, err := os.Create(path)
	if err != nil {
		return errors.WithContext(err, "create file")
	}
	defer SafeClose(f)

	if err := SafeCopy(f, r); err != nil {
		return errors.WithContext(err, "write to file")
	}
	return nil
}

// SafeClose closes c and logs a warning on error
func SafeClose(c io.Closer) {
	if c != nil {
		if err := c.Close(); err != nil {
			log.Printf("warning: close failed: %v", err)
		}
	}
}

// SafeCopy copies src → dst and propagates any error
func SafeCopy(dst io.Writer, src io.Reader) error {
	if dst == nil || src == nil {
		return &errors.ValidationError{Message: "source and destination cannot be nil"}
	}

	if _, err := io.Copy(dst, src); err != nil {
		return errors.WithContext(err, "copy data")
	}
	return nil
}

// :remove-start:

// SafeDelete removes files generated in the specified directory
// NOTE: INTERNAL ONLY FUNCTION; before running `snip.sh`, ensure that this and "path/filepath" import are marked for removal
func SafeDelete(dir string) error {
	// Check for global downloads directory
	dir = ResolveWithDownloadsBase(dir)
	// Check if directory exists before attempting to walk it
	if _, err := os.Stat(dir); os.IsNotExist(err) {
		return errors.WithContext(err, "directory does not exist")
	}

	err := filepath.Walk(dir, func(path string, info os.FileInfo, err error) error {
		if err != nil {
			return errors.WithContext(err, "walking directory")
		}
		if !info.IsDir() {
			if removeErr := os.Remove(path); removeErr != nil {
				log.Printf("warning: failed to delete file %s: %v", path, removeErr)
			}
		}
		return nil
	})

	if err != nil {
		return errors.WithContext(err, "cleaning up directory")
	}
	return nil
}

// :remove-end:
