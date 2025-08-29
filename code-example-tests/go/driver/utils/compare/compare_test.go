package compare

import (
	"go.mongodb.org/mongo-driver/v2/bson"
	"path/filepath"
	"strings"
	"testing"
)

func TestCompareDocuments_BasicFunctionality(t *testing.T) {
	tests := []struct {
		name           string
		expectedFile   string
		actualResults  []bson.D
		options        *Options
		shouldMatch    bool
		expectedErrors int
	}{
		{
			name:         "Exact match with primitives",
			expectedFile: "exact_match.txt",
			actualResults: []bson.D{
				{
					{Key: "name", Value: "John"},
					{Key: "age", Value: 30},
					{Key: "active", Value: true},
				},
			},
			shouldMatch: true,
		},
		{
			name:         "Multiple documents match",
			expectedFile: "multi_docs.txt",
			actualResults: []bson.D{
				{{Key: "id", Value: 1}, {Key: "name", Value: "Alice"}},
				{{Key: "id", Value: 2}, {Key: "name", Value: "Bob"}},
			},
			shouldMatch: true,
		},
		{
			name:         "Length mismatch",
			expectedFile: "single_doc.txt",
			actualResults: []bson.D{
				{{Key: "name", Value: "John"}},
				{{Key: "name", Value: "Jane"}},
			},
			shouldMatch:    false,
			expectedErrors: 1,
		},
	}

	// Create temporary test files
	tempDir := t.TempDir()

	// Create test files
	createTestFile(t, filepath.Join(tempDir, "exact_match.txt"), `{"name":"John","age":30,"active":true}`)
	createTestFile(t, filepath.Join(tempDir, "multi_docs.txt"), `{"id":1,"name":"Alice"}
{"id":2,"name":"Bob"}`)
	createTestFile(t, filepath.Join(tempDir, "single_doc.txt"), `{"name":"John"}`)

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := BsonDocuments(filepath.Join(tempDir, tt.expectedFile), tt.actualResults, tt.options)

			if result.IsMatch != tt.shouldMatch {
				t.Errorf("Expected match=%v, got match=%v", tt.shouldMatch, result.IsMatch)
				// Debug output for failing tests
				if !result.IsMatch && tt.shouldMatch {
					t.Errorf("Debug - Errors: %+v", result.Errors)
					for i, err := range result.Errors {
						t.Errorf("  Error %d: Path=%s, Expected=%s, Actual=%s, Message=%s",
							i, err.Path, err.Expected, err.Actual, err.Message)
					}
				}
			}

			if tt.expectedErrors > 0 && len(result.Errors) != tt.expectedErrors {
				t.Errorf("Expected %d errors, got %d", tt.expectedErrors, len(result.Errors))
			}
		})
	}
}

func TestFieldValueIgnoring(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name         string
		expectedFile string
		actual       []bson.D
		options      *Options
		shouldMatch  bool
	}{
		{
			name:         "Ignore single field",
			expectedFile: "ignore_single.txt",
			actual: []bson.D{
				{{Key: "_id", Value: "different"}, {Key: "name", Value: "John"}},
			},
			options: &Options{
				IgnoreFieldValues: []string{"_id"},
			},
			shouldMatch: true,
		},
		{
			name:         "Ignore multiple fields",
			expectedFile: "ignore_multi.txt",
			actual: []bson.D{
				{{Key: "_id", Value: "different"}, {Key: "timestamp", Value: "2023-01-02"}, {Key: "name", Value: "John"}},
			},
			options: &Options{
				IgnoreFieldValues: []string{"_id", "timestamp"},
			},
			shouldMatch: true,
		},
		{
			name:         "Without ignoring should fail",
			expectedFile: "ignore_single.txt",
			actual: []bson.D{
				{{Key: "_id", Value: "different"}, {Key: "name", Value: "John"}},
			},
			options:     nil,
			shouldMatch: false,
		},
	}

	// Create test files
	createTestFile(t, filepath.Join(tempDir, "ignore_single.txt"), `{"_id":"original","name":"John"}`)
	createTestFile(t, filepath.Join(tempDir, "ignore_multi.txt"), `{"_id":"original","timestamp":"2023-01-01","name":"John"}`)

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := BsonDocuments(filepath.Join(tempDir, tt.expectedFile), tt.actual, tt.options)

			if result.IsMatch != tt.shouldMatch {
				t.Errorf("Expected match=%v, got match=%v. Errors: %v", tt.shouldMatch, result.IsMatch, result.Errors)
			}
		})
	}
}

func TestArrayComparisonStrategies(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name         string
		expectedFile string
		actual       []bson.D
		options      *Options
		shouldMatch  bool
	}{
		{
			name:         "Unordered array compare (default)",
			expectedFile: "unordered_array.txt",
			actual: []bson.D{
				{{Key: "items", Value: []interface{}{3, 1, 2}}},
			},
			shouldMatch: true,
		},
		{
			name:         "Ordered array compare",
			expectedFile: "ordered_array.txt",
			actual: []bson.D{
				{{Key: "items", Value: []interface{}{3, 1, 2}}},
			},
			options: &Options{
				ComparisonType: "ordered",
			},
			shouldMatch: false,
		},
		{
			name:         "Complex object array unordered",
			expectedFile: "complex_array.txt",
			actual: []bson.D{
				{{Key: "users", Value: []interface{}{
					map[string]interface{}{"name": "Bob", "age": 25},
					map[string]interface{}{"name": "Alice", "age": 30},
				}}},
			},
			shouldMatch: true,
		},
	}

	// Create test files
	createTestFile(t, filepath.Join(tempDir, "unordered_array.txt"), `{"items":[1,2,3]}`)
	createTestFile(t, filepath.Join(tempDir, "ordered_array.txt"), `{"items":[1,2,3]}`)
	createTestFile(t, filepath.Join(tempDir, "complex_array.txt"), `{"users":[{"name":"Alice","age":30},{"name":"Bob","age":25}]}`)

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := BsonDocuments(filepath.Join(tempDir, tt.expectedFile), tt.actual, tt.options)

			if result.IsMatch != tt.shouldMatch {
				t.Errorf("Expected match=%v, got match=%v. Errors: %v", tt.shouldMatch, result.IsMatch, result.Errors)
			}
		})
	}
}

func TestPrimitiveComparison(t *testing.T) {
	tests := []struct {
		name        string
		expected    interface{}
		actual      interface{}
		shouldMatch bool
	}{
		{"String match", "hello", "hello", true},
		{"String mismatch", "hello", "world", false},
		{"Number match", 42, 42, true},
		{"Number mismatch", 42, 43, false},
		{"Boolean match", true, true, true},
		{"Boolean mismatch", true, false, false},
		{"Null match", nil, nil, true},
		{"Null mismatch", nil, "value", false},
		{"Type mismatch", "42", 42, false},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := comparePrimitives(tt.expected, tt.actual, "test")

			if result.IsMatch != tt.shouldMatch {
				t.Errorf("Expected match=%v, got match=%v", tt.shouldMatch, result.IsMatch)
			}
		})
	}
}

func TestCrossLanguageValidationCases(t *testing.T) {
	tempDir := t.TempDir()

	// Test Case 1: MongoDB types → normalized strings
	t.Run("MongoDB types normalization", func(t *testing.T) {
		createTestFile(t, filepath.Join(tempDir, "mongo_types.txt"), `{"_id":"507f1f77bcf86cd799439011","amount":"123.45"}`)

		oid, err := bson.ObjectIDFromHex("507f1f77bcf86cd799439011")
		if err != nil {
			t.Fatal(err)
		}

		actual := []bson.D{
			{{Key: "_id", Value: oid}, {Key: "amount", Value: "123.45"}},
		}

		result := BsonDocuments(filepath.Join(tempDir, "mongo_types.txt"), actual, nil)

		if !result.IsMatch {
			t.Errorf("MongoDB type normalization failed: %v", result.Errors)
		}
	})

	// Test Case 2: Field value ignoring
	t.Run("Field value ignoring", func(t *testing.T) {
		createTestFile(t, filepath.Join(tempDir, "ignore_field.txt"), `{"_id":"any1","name":"John"}`)

		actual := []bson.D{
			{{Key: "_id", Value: "any2"}, {Key: "name", Value: "John"}},
		}

		options := &Options{
			IgnoreFieldValues: []string{"_id"},
		}

		result := BsonDocuments(filepath.Join(tempDir, "ignore_field.txt"), actual, options)

		if !result.IsMatch {
			t.Errorf("Field value ignoring failed: %v", result.Errors)
		}
	})

	// Test Case 3: Ellipsis array matching - fixed to test actual array wildcard functionality
	t.Run("Ellipsis array matching", func(t *testing.T) {
		// Test array wildcard - expects any array to match ["..."]
		createTestFile(t, filepath.Join(tempDir, "array_wildcard.txt"), `{"items":["..."]}`)

		actual := []bson.D{
			{{Key: "items", Value: []interface{}{1, 2, 3, 4}}},
		}

		result := BsonDocuments(filepath.Join(tempDir, "array_wildcard.txt"), actual, nil)

		if !result.IsMatch {
			t.Errorf("Array wildcard failed: %v", result.Errors)
		}
	})

	// Test Case 4: Truncated string matching
	t.Run("Truncated string matching", func(t *testing.T) {
		createTestFile(t, filepath.Join(tempDir, "truncated_msg.txt"), `{"message":"Error: Connection failed..."}`)

		actual := []bson.D{
			{{Key: "message", Value: "Error: Connection failed after 3 retries"}},
		}

		result := BsonDocuments(filepath.Join(tempDir, "truncated_msg.txt"), actual, nil)

		if !result.IsMatch {
			t.Errorf("Truncated string matching failed: %v", result.Errors)
		}
	})
}

func TestEdgeCases(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name         string
		expectedFile string
		actual       []bson.D
		shouldMatch  bool
	}{
		{
			name:         "Empty documents",
			expectedFile: "empty.txt",
			actual:       []bson.D{{}},
			shouldMatch:  true,
		},
		{
			name:         "Empty array",
			expectedFile: "empty_array.txt",
			actual:       []bson.D{},
			shouldMatch:  true,
		},
		{
			name:         "Nested objects",
			expectedFile: "nested.txt",
			actual: []bson.D{
				{{Key: "user", Value: map[string]interface{}{
					"profile": map[string]interface{}{
						"name": "John",
					},
				}}},
			},
			shouldMatch: true,
		},
		{
			name:         "Mixed types in array",
			expectedFile: "mixed_array.txt",
			actual: []bson.D{
				{{Key: "mixed", Value: []interface{}{1, "string", true, nil}}},
			},
			shouldMatch: true,
		},
	}

	// Create test files
	createTestFile(t, filepath.Join(tempDir, "empty.txt"), `{}`)
	createTestFile(t, filepath.Join(tempDir, "empty_array.txt"), ``)
	createTestFile(t, filepath.Join(tempDir, "nested.txt"), `{"user":{"profile":{"name":"John"}}}`)
	createTestFile(t, filepath.Join(tempDir, "mixed_array.txt"), `{"mixed":[1,"string",true,null]}`)

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			result := BsonDocuments(filepath.Join(tempDir, tt.expectedFile), tt.actual, nil)

			if result.IsMatch != tt.shouldMatch {
				t.Errorf("Expected match=%v, got match=%v. Errors: %v", tt.shouldMatch, result.IsMatch, result.Errors)
			}
		})
	}
}

func TestPerformanceLimits(t *testing.T) {
	// Test with reasonably sized arrays to ensure performance is acceptable
	largeArray := make([]interface{}, 25) // Below the theoretical backtracking limit
	for i := range largeArray {
		largeArray[i] = map[string]interface{}{
			"id":   i,
			"name": "item" + string(rune('A'+i%26)),
		}
	}

	tempDir := t.TempDir()

	// Create a file with the same large array in different order
	expectedContent := `{"items":[`
	for i := len(largeArray) - 1; i >= 0; i-- {
		if i < len(largeArray)-1 {
			expectedContent += ","
		}
		expectedContent += `{"id":` + string(rune('0'+i%10)) + `,"name":"item` + string(rune('A'+i%26)) + `"}`
	}
	expectedContent += `]}`

	createTestFile(t, filepath.Join(tempDir, "large_array.txt"), expectedContent)

	actual := []bson.D{
		{{Key: "items", Value: largeArray}},
	}

	// This should complete in reasonable time
	result := BsonDocuments(filepath.Join(tempDir, "large_array.txt"), actual, nil)

	// The test is mainly about performance, but we can check it doesn't crash
	if len(result.Errors) > 1 {
		t.Errorf("Unexpected number of errors for large array test: %v", len(result.Errors))
	}
}

// TestStructComparison tests the new struct compare functionality
func TestStructComparison(t *testing.T) {
	// Define test structs
	type Person struct {
		ID       string  `bson:"_id"`
		Name     string  `bson:"name"`
		Age      int     `bson:"age"`
		Email    string  `bson:"email"`
		Salary   float64 `bson:"salary"`
		IsActive bool    `bson:"isActive"`
	}

	type Product struct {
		ProductID   string  `json:"product_id"`
		ProductName string  `json:"name"`
		Price       float64 `json:"price"`
		InStock     bool    `json:"in_stock"`
	}

	tests := []struct {
		name          string
		actualResults interface{}
		expectedFile  string
		expectedMatch bool
		setupFileFunc func() (string, func()) // Returns filepath and cleanup function
	}{
		{
			name: "Struct with bson tags matches",
			actualResults: []Person{
				{ID: "12345", Name: "John Doe", Age: 30, Email: "john@example.com", Salary: 50000.0, IsActive: true},
				{ID: "67890", Name: "Jane Smith", Age: 25, Email: "jane@example.com", Salary: 55000.0, IsActive: false},
			},
			expectedMatch: true,
			setupFileFunc: func() (string, func()) {
				content := `{"_id": "12345", "name": "John Doe", "age": 30, "email": "john@example.com", "salary": 50000.0, "isActive": true}
{"_id": "67890", "name": "Jane Smith", "age": 25, "email": "jane@example.com", "salary": 55000.0, "isActive": false}`
				return createTempFile(t, content)
			},
		},
		{
			name: "Struct with json tags matches",
			actualResults: []Product{
				{ProductID: "ABC123", ProductName: "Widget", Price: 19.99, InStock: true},
			},
			expectedMatch: true,
			setupFileFunc: func() (string, func()) {
				content := `{"product_id": "ABC123", "name": "Widget", "price": 19.99, "in_stock": true}`
				return createTempFile(t, content)
			},
		},
		{
			name: "Struct compare with ellipsis on ID field",
			actualResults: []Person{
				{ID: "auto-generated-123", Name: "Alice", Age: 28, Email: "alice@example.com", Salary: 60000.0, IsActive: true},
			},
			expectedMatch: true,
			setupFileFunc: func() (string, func()) {
				content := `{"_id": "...", "name": "Alice", "age": 28, "email": "alice@example.com", "salary": 60000.0, "isActive": true}`
				return createTempFile(t, content)
			},
		},
		{
			name: "Struct compare with ignored fields",
			actualResults: []Person{
				{ID: "will-be-ignored", Name: "Bob", Age: 35, Email: "bob@example.com", Salary: 70000.0, IsActive: false},
			},
			expectedMatch: true,
			setupFileFunc: func() (string, func()) {
				content := `{"_id": "different-id", "name": "Bob", "age": 35, "email": "bob@example.com", "salary": 70000.0, "isActive": false}`
				return createTempFile(t, content)
			},
		},
		{
			name: "Struct vs BSON.D should both work with same compare logic",
			actualResults: []Person{
				{ID: "123", Name: "Test", Age: 25, Email: "test@example.com", Salary: 45000.0, IsActive: true},
			},
			expectedMatch: true,
			setupFileFunc: func() (string, func()) {
				content := `{"_id": "123", "name": "Test", "age": 25, "email": "test@example.com", "salary": 45000.0, "isActive": true}`
				return createTempFile(t, content)
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			// Setup test file
			filePath, cleanup := tt.setupFileFunc()
			defer cleanup()

			// Prepare compare options
			var options *Options
			if strings.Contains(tt.name, "ignored fields") {
				options = &Options{
					IgnoreFieldValues: []string{"_id"},
				}
			}

			// Run compare using the new struct function
			result := StructDocuments(filePath, tt.actualResults, options)

			// Verify results
			if result.IsMatch != tt.expectedMatch {
				t.Errorf("Expected match: %v, got: %v", tt.expectedMatch, result.IsMatch)
				if !result.IsMatch {
					t.Errorf("Error details: %s", result.Error())
					for _, err := range result.Errors {
						t.Errorf("  Path: %s, Expected: %s, Actual: %s, Message: %s",
							err.Path, err.Expected, err.Actual, err.Message)
					}
				}
			}
		})
	}
}

// TestMixedTypesComparison tests that both BSON and struct comparisons work correctly
func TestMixedTypesComparison(t *testing.T) {
	type User struct {
		ID   string `bson:"_id"`
		Name string `bson:"name"`
		Age  int    `bson:"age"`
	}

	// Create test file
	content := `{"_id": "user123", "name": "Mixed Test", "age": 30}`
	filePath, cleanup := createTempFile(t, content)
	defer cleanup()

	// Test 1: Use traditional BSON.D slice
	bsonResults := []bson.D{
		{
			{Key: "_id", Value: "user123"},
			{Key: "name", Value: "Mixed Test"},
			{Key: "age", Value: 30},
		},
	}
	bsonResult := BsonDocuments(filePath, bsonResults, nil)

	// Test 2: Use struct slice with new function
	structResults := []User{
		{ID: "user123", Name: "Mixed Test", Age: 30},
	}
	structResult := StructDocuments(filePath, structResults, nil)

	// Both should match
	if !bsonResult.IsMatch {
		t.Errorf("BSON compare failed: %s", bsonResult.Error())
	}
	if !structResult.IsMatch {
		t.Errorf("Struct compare failed: %s", structResult.Error())
	}
}
