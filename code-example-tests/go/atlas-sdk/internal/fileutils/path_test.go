package fileutils

import (
	"os"
	"path/filepath"
	"strings"
	"testing"
	"time"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

func TestGenerateOutputPath_WithExtension(t *testing.T) {
	t.Parallel()
	dir := t.TempDir()
	prefix := "test-file"
	extension := "json"

	path, err := GenerateOutputPath(dir, prefix, extension)

	require.NoError(t, err)
	assert.Contains(t, path, dir)
	assert.Contains(t, path, prefix)
	assert.True(t, strings.HasSuffix(path, ".json"))

	currentDate := time.Now().Format("20060102")
	assert.Contains(t, path, currentDate)
}

func TestGenerateOutputPath_WithoutExtension(t *testing.T) {
	t.Parallel()

	dir := t.TempDir()
	prefix := "test-file"
	path, err := GenerateOutputPath(dir, prefix, "")

	require.NoError(t, err)
	assert.Contains(t, path, dir)
	assert.Contains(t, path, prefix)

	currentDate := time.Now().Format("20060102")
	assert.Contains(t, path, currentDate)
	assert.NotContains(t, path, ".")
}

func TestGenerateOutputPath_CreatesDirectory(t *testing.T) {
	t.Parallel()

	// Setup: create a temp base directory
	baseDir := t.TempDir()
	// Define subdirectory that doesn't exist yet
	newDir := filepath.Join(baseDir, "new-dir")
	prefix := "test-file"

	_, err := GenerateOutputPath(newDir, prefix, "txt")

	require.NoError(t, err)

	// Check that directory was created
	dirInfo, err := os.Stat(newDir)
	require.NoError(t, err)
	assert.True(t, dirInfo.IsDir())
}

func TestGenerateOutputPath_WithEnvironmentVariable(t *testing.T) {
	baseDir := t.TempDir()
	t.Setenv("ATLAS_DOWNLOADS_DIR", baseDir) // NOTE: cannot use t.Setenv with t.Parallel()
	subDir := "reports"
	prefix := "test-file"

	path, err := GenerateOutputPath(subDir, prefix, "csv")

	require.NoError(t, err)
	expectedBase := filepath.Join(baseDir, subDir)
	assert.True(t, strings.HasPrefix(path, expectedBase))
}

func TestGenerateOutputPath_ExcessiveFilenameLength(t *testing.T) {
	t.Parallel()

	dir := t.TempDir()
	prefix := strings.Repeat("very-long-prefix", 20) // Creates a ~300 char prefix

	path, err := GenerateOutputPath(dir, prefix, "txt")

	require.Error(t, err)
	assert.Contains(t, err.Error(), "filename exceeds maximum length")
	assert.Empty(t, path)
}
