package fileutils

import (
	"os"
	"path/filepath"
	"strings"
	"testing"

	"github.com/stretchr/testify/require"
)

func TestWriteToFile_Success(t *testing.T) {
	// create a temp dir and file
	tmp := t.TempDir()
	path := filepath.Join(tmp, "out.txt")

	input := "hello world"
	r := strings.NewReader(input)

	require.NoError(t, WriteToFile(r, path))

	// verify file exists and content matches
	data, err := os.ReadFile(path)
	require.NoError(t, err)
	require.Equal(t, input, string(data))
}

func TestWriteToFile_Error(t *testing.T) {
	path := "does-not-exist/out.txt"
	err := WriteToFile(strings.NewReader("x"), path)
	require.Error(t, err)
	require.Contains(t, err.Error(), "create")
}
