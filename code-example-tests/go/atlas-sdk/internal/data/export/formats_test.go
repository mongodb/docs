package export

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"os"
	"path/filepath"
	"testing"

	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
)

type TestStruct struct {
	ID    int     `json:"id"`
	Name  string  `json:"name"`
	Value float64 `json:"value"`
}

func TestToJSON(t *testing.T) {
	t.Parallel()

	t.Run("Successfully writes JSON to file", func(t *testing.T) {
		tempDir := t.TempDir()
		filePath := filepath.Join(tempDir, "config.test.json")
		testData := TestStruct{ID: 1, Name: "Test", Value: 99.99}

		err := ToJSON(testData, filePath)
		require.NoError(t, err)

		fileContent, err := os.ReadFile(filePath)
		require.NoError(t, err)

		var decoded TestStruct
		err = json.Unmarshal(fileContent, &decoded)
		require.NoError(t, err)

		assert.Equal(t, testData.ID, decoded.ID)
		assert.Equal(t, testData.Name, decoded.Name)
		assert.Equal(t, testData.Value, decoded.Value)
	})

	t.Run("Returns error for nil data", func(t *testing.T) {
		err := ToJSON(nil, "config.test.json")
		require.Error(t, err)
		assert.Contains(t, err.Error(), "data cannot be nil")
	})

	t.Run("Returns error for empty filepath", func(t *testing.T) {
		err := ToJSON(TestStruct{}, "")
		require.Error(t, err)
		assert.Contains(t, err.Error(), "filePath cannot be empty")
	})

	t.Run("Creates directory structure if needed", func(t *testing.T) {
		tempDir := t.TempDir()
		dirPath := filepath.Join(tempDir, "subdir1", "subdir2")
		filePath := filepath.Join(dirPath, "config.test.json")
		testData := TestStruct{ID: 1, Name: "Test", Value: 99.99}

		err := ToJSON(testData, filePath)
		require.NoError(t, err)

		dirInfo, err := os.Stat(dirPath)
		require.NoError(t, err)
		assert.True(t, dirInfo.IsDir(), "Expected directory to be created")
	})
}

func TestToCSV(t *testing.T) {
	t.Parallel()

	t.Run("Successfully writes CSV to file", func(t *testing.T) {
		// Setup
		tempDir := t.TempDir()
		filePath := filepath.Join(tempDir, "test.csv")
		testData := [][]string{
			{"ID", "Name", "Value"},
			{"1", "Test", "99.99"},
		}

		err := ToCSV(testData, filePath)
		require.NoError(t, err)

		file, err := os.Open(filePath)
		require.NoError(t, err)
		defer file.Close()

		reader := csv.NewReader(file)
		rows, err := reader.ReadAll()
		require.NoError(t, err)

		assert.Equal(t, testData, rows, "Expected CSV rows to match input data")
	})

	t.Run("Returns error for nil data", func(t *testing.T) {
		err := ToCSV(nil, "test.csv")
		require.Error(t, err)
		assert.Contains(t, err.Error(), "data cannot be nil")
	})

	t.Run("Returns error for empty filepath", func(t *testing.T) {
		err := ToCSV([][]string{{"test"}}, "")
		require.Error(t, err)
		assert.Contains(t, err.Error(), "filePath cannot be empty")
	})
}

func TestToCSVWithMapper(t *testing.T) {
	t.Parallel()

	t.Run("Successfully maps and writes data to CSV", func(t *testing.T) {
		// Setup
		tempDir := t.TempDir()
		filePath := filepath.Join(tempDir, "test.csv")
		testData := []TestStruct{
			{ID: 1, Name: "Test1", Value: 99.99},
			{ID: 2, Name: "Test2", Value: 199.99},
		}
		headers := []string{"ID", "Name", "Value"}
		rowMapper := func(item TestStruct) []string {
			return []string{
				fmt.Sprintf("%d", item.ID),
				item.Name,
				fmt.Sprintf("%.2f", item.Value),
			}
		}

		err := ToCSVWithMapper(testData, filePath, headers, rowMapper)
		require.NoError(t, err)

		file, err := os.Open(filePath)
		require.NoError(t, err)
		defer file.Close()

		reader := csv.NewReader(file)
		rows, err := reader.ReadAll()
		require.NoError(t, err)

		expectedRows := [][]string{
			{"ID", "Name", "Value"},
			{"1", "Test1", "99.99"},
			{"2", "Test2", "199.99"},
		}
		assert.Equal(t, expectedRows, rows)
	})

	t.Run("Returns error for nil data", func(t *testing.T) {
		err := ToCSVWithMapper[TestStruct](nil, "test.csv", []string{"header"}, func(t TestStruct) []string { return []string{} })
		require.Error(t, err)
		assert.Contains(t, err.Error(), "data cannot be nil")
	})

	t.Run("Returns error for empty headers", func(t *testing.T) {
		err := ToCSVWithMapper([]TestStruct{{ID: 1}}, "test.csv", []string{}, func(t TestStruct) []string { return []string{} })
		require.Error(t, err)
		assert.Contains(t, err.Error(), "headers cannot be empty")
	})

	t.Run("Returns error for nil mapper function", func(t *testing.T) {
		err := ToCSVWithMapper[TestStruct]([]TestStruct{{ID: 1}}, "test.csv", []string{"header"}, nil)
		require.Error(t, err)
		assert.Contains(t, err.Error(), "rowMapper function cannot be nil")
	})
}
