package get_started

import (
	"testing"

	"driver-examples/examples/get_started"
	"driver-examples/utils"
	"driver-examples/utils/compare"
	
)

// TestGetStarted tests the Get Started example
func TestGetStarted(t *testing.T) {
	utils.RequiresSampleData(t, "sample_mflix")
	result := get_started.GetStarted()

	// Specify the path to the expected output file
	expectedOutputFilepath := "examples/get_started/get_started_output.txt"

	compare.ExpectThat(t, result).
		ShouldResemble(expectedOutputFilepath).
		WithSchema(compare.Schema{
			Count:          1,
			RequiredFields: []string{"_id", "genres", "plot", "title"},
			FieldValues:    map[string]interface{}{"title": "Back to the Future"},
		})
}
