package fileutils

import (
	"compress/gzip"
	"os"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestDecompressGzip_Success(t *testing.T) {
	// create a temp dir and file
	tmp := t.TempDir()
	src := filepath.Join(tmp, "test.gz")
	dst := filepath.Join(tmp, "test.txt")

	// create a gzip file and write some data to it
	f, err := os.Create(src)
	require.NoError(t, err)

	gz := gzip.NewWriter(f)
	_, err = gz.Write([]byte("foobar"))
	require.NoError(t, err)
	require.NoError(t, gz.Close())
	require.NoError(t, f.Close())

	// call the function to test
	require.NoError(t, DecompressGzip(src, dst))

	// verify the output
	data, err := os.ReadFile(dst)
	require.NoError(t, err)
	require.Equal(t, "foobar", string(data))
}

func TestDecompressGzip_SourceNotFound(t *testing.T) {
	tmp := t.TempDir()
	src := filepath.Join(tmp, "nofile.gz")
	dst := filepath.Join(tmp, "out.txt")

	// source file does not exist
	err := DecompressGzip(src, dst)
	require.Error(t, err)
	require.Contains(t, err.Error(), "open")

	// destination file does not exist
	_, err2 := os.Stat(dst)
	require.True(t, os.IsNotExist(err2))
}
