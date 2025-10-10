package fileutils

import (
	"io"
	"log"
	"os"

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

