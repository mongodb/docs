package compare

import (
	"encoding/json"
	"reflect"
	"testing"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

func TestMongoDBTypeNormalization(t *testing.T) {
	tests := []struct {
		name     string
		input    interface{}
		expected interface{}
	}{
		{
			name:     "ObjectID to hex string",
			input:    bson.NewObjectID(),
			expected: "string", // We'll check type since ObjectID is random
		},
		{
			name:     "DateTime to ISO string",
			input:    bson.NewDateTimeFromTime(time.Date(2023, 1, 1, 12, 0, 0, 0, time.UTC)),
			expected: "2023-01-01T12:00:00Z",
		},
		{
			name:     "Time to ISO string",
			input:    time.Date(2023, 1, 1, 12, 0, 0, 0, time.UTC),
			expected: "2023-01-01T12:00:00Z",
		},
		{
			name:     "Regular string unchanged",
			input:    "hello",
			expected: "hello",
		},
		{
			name:     "Number normalized to float64",
			input:    42,
			expected: 42.0,
		},
		{
			name:     "Boolean unchanged",
			input:    true,
			expected: true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := normalizeValue(tt.input)

			if tt.expected == "string" {
				// Special case for ObjectID - just check it's a string
				if _, ok := result.(string); !ok {
					t.Errorf("Expected string type, got %T", result)
				}
			} else if !reflect.DeepEqual(result, tt.expected) {
				t.Errorf("Expected %v, got %v", tt.expected, result)
			}
		})
	}
}

func TestPreprocessMongoSyntax(t *testing.T) {
	tests := []struct {
		name     string
		input    string
		expected string
	}{
		{
			name:     "ObjectId constructor",
			input:    `ObjectId('507f1f77bcf86cd799439011')`,
			expected: `"507f1f77bcf86cd799439011"`,
		},
		{
			name:     "Decimal128 constructor",
			input:    `Decimal128('123.45')`,
			expected: `"123.45"`,
		},
		{
			name:     "Date constructor",
			input:    `Date('2023-01-01T12:00:00Z')`,
			expected: `"2023-01-01T12:00:00Z"`,
		},
		{
			name:     "MongoDB extended JSON date",
			input:    `{"$date":"2023-01-01T12:00:00Z"}`,
			expected: `"2023-01-01T12:00:00Z"`,
		},
		{
			name:     "Mixed constructors",
			input:    `{_id: ObjectId('123'), amount: Decimal128('456.78')}`,
			expected: `{_id: "123", amount: "456.78"}`,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := preprocessMongoSyntax(tt.input)
			if result != tt.expected {
				t.Errorf("Expected %q, got %q", tt.expected, result)
			}
		})
	}
}

func TestBsonDToMap(t *testing.T) {
	bsonDoc := bson.D{
		{Key: "name", Value: "John"},
		{Key: "age", Value: 30},
		{Key: "active", Value: true},
	}

	result := bsonDToMap(bsonDoc)

	expected := map[string]interface{}{
		"name":   "John",
		"age":    30,
		"active": true,
	}

	if !reflect.DeepEqual(result, expected) {
		t.Errorf("Expected %v, got %v", expected, result)
	}
}

func TestStandaloneEllipsisAtFieldLevel(t *testing.T) {
	// Writer scenario: using `...` at the end of a document to indicate more fields are omitted
	// The standalone `...` on its own line should be converted to `"...": "..."` for the comparison engine
	input := `{
  "nErrors": 0,
  "ok": 1,
  ...
}`
	result := preprocessMongoSyntax(input)

	// The result should contain "...": "..." to mark omitted fields
	if !containsString(result, `"..."`) {
		t.Errorf("Expected result to contain quoted ellipsis marker, got: %s", result)
	}

	// The result should be valid JSON that can be parsed
	var parsed map[string]interface{}
	if err := parseJSON(result, &parsed); err != nil {
		t.Errorf("Failed to parse preprocessed result as JSON: %v\nResult: %s", err, result)
	}

	// The parsed object should have the ellipsis marker
	if _, ok := parsed["..."]; !ok {
		t.Errorf("Expected parsed object to contain '...' key, got: %v", parsed)
	}
}

// Helper function to check if a string contains another string
func containsString(s, substr string) bool {
	return len(s) >= len(substr) && (s == substr || len(s) > 0 && (s[0:len(substr)] == substr || containsString(s[1:], substr)))
}

// Helper function to parse JSON
func parseJSON(s string, v interface{}) error {
	return json.Unmarshal([]byte(s), v)
}
