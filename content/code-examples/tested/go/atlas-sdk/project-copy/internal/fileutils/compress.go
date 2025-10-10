package fileutils

import (
	"compress/gzip"
	"fmt"
	"os"
)

// DecompressGzip opens a .gz file and unpacks to specified destination.
func DecompressGzip(srcPath, destPath string) error {
	srcFile, err := os.Open(srcPath)
	if err != nil {
		return fmt.Errorf("open %s: %w", srcPath, err)
	}
	defer SafeClose(srcFile)

	gzReader, err := gzip.NewReader(srcFile)
	if err != nil {
		return fmt.Errorf("gzip reader %s: %w", srcPath, err)
	}
	defer SafeClose(gzReader)

	destFile, err := os.Create(destPath)
	if err != nil {
		return fmt.Errorf("create %s: %w", destPath, err)
	}
	defer SafeClose(destFile)

	if err := SafeCopy(destFile, gzReader); err != nil {
		return fmt.Errorf("decompress to %s: %w", destPath, err)
	}
	return nil
}
