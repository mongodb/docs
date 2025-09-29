package export

import (
	"encoding/csv"
	"encoding/json"
	"fmt"
	"io"
	"os"
	"path/filepath"

	"atlas-sdk-examples/internal/fileutils"
)

// ToJSON starts a goroutine to encode and write JSON data to a file at the given filePath
func ToJSON(data interface{}, filePath string) error {
	if data == nil {
		return fmt.Errorf("data cannot be nil")
	}
	if filePath == "" {
		return fmt.Errorf("filePath cannot be empty")
	}

	// Create directory if it doesn't exist
	dir := filepath.Dir(filePath)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return fmt.Errorf("failed to create directory for JSON export: %w", err)
	}

	pr, pw := io.Pipe()

	encodeErrCh := make(chan error, 1)
	go func() {
		encoder := json.NewEncoder(pw)
		encoder.SetIndent("", "  ")
		err := encoder.Encode(data)
		if err != nil {
			encodeErrCh <- err
			pw.CloseWithError(fmt.Errorf("json encode: %w", err))
			return
		}
		encodeErrCh <- nil
		fileutils.SafeClose(pw)
	}()

	writeErr := fileutils.WriteToFile(pr, filePath)

	if encodeErr := <-encodeErrCh; encodeErr != nil {
		return fmt.Errorf("json encode: %w", encodeErr)
	}

	return writeErr
}

// ToCSV starts a goroutine to encode and write data in CSV format to a file at the given filePath
func ToCSV(data [][]string, filePath string) error {
	if data == nil {
		return fmt.Errorf("data cannot be nil")
	}
	if filePath == "" {
		return fmt.Errorf("filePath cannot be empty")
	}
	// Create directory if it doesn't exist
	dir := filepath.Dir(filePath)
	if err := os.MkdirAll(dir, 0755); err != nil {
		return fmt.Errorf("failed to create directory for csv export: %w", err)
	}

	file, err := os.Create(filePath)
	if err != nil {
		return fmt.Errorf("create file: %w", err)
	}
	defer fileutils.SafeClose(file)

	writer := csv.NewWriter(file)
	defer writer.Flush()

	for _, row := range data {
		if err := writer.Write(row); err != nil {
			return fmt.Errorf("write csv row: %w", err)
		}
	}

	return nil
}

// ToCSVWithMapper provides a generic method to convert domain objects to CSV data.
// It exports any slice of data to CSV with custom headers and row mapping (see below for example)
//
// headers := []string{"InvoiceID", "Status", "Created", "AmountBilled"}
//
//	rowMapper := func(invoice billing.InvoiceOption) []string {
//	    return []string{
//	        invoice.GetId(),
//	        invoice.GetStatusName(),
//	        invoice.GetCreated().Format(time.RFC3339),
//	        fmt.Sprintf("%.2f", float64(invoice.GetAmountBilledCents())/100.0),
//	    }
//	}
func ToCSVWithMapper[T any](data []T, filePath string, headers []string, rowMapper func(T) []string) error {
	if data == nil {
		return fmt.Errorf("data cannot be nil")
	}
	if len(headers) == 0 {
		return fmt.Errorf("headers cannot be empty")
	}
	if rowMapper == nil {
		return fmt.Errorf("rowMapper function cannot be nil")
	}

	rows := make([][]string, 0, len(data)+1)
	rows = append(rows, headers)

	for _, item := range data {
		rows = append(rows, rowMapper(item))
	}

	return ToCSV(rows, filePath)
}
