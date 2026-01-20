package compare

import (
	"path/filepath"
	"testing"

	"go.mongodb.org/mongo-driver/v2/bson"
)

// TestExpectAPIBasicFunctionality tests basic functionality with the ExpectThat API
func TestExpectAPIBasicFunctionality(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name        string
		fileContent string
		actual      []bson.D
		options     func(*ExpectBuilder) *ExpectBuilder
	}{
		{
			name:        "Exact match with primitives",
			fileContent: `{"name":"John","age":30,"active":true}`,
			actual: []bson.D{
				{
					{Key: "name", Value: "John"},
					{Key: "age", Value: 30},
					{Key: "active", Value: true},
				},
			},
			options: func(e *ExpectBuilder) *ExpectBuilder { return e },
		},
		{
			name: "Multiple documents match",
			fileContent: `{"id":1,"name":"Alice"}
{"id":2,"name":"Bob"}`,
			actual: []bson.D{
				{{Key: "id", Value: 1}, {Key: "name", Value: "Alice"}},
				{{Key: "id", Value: 2}, {Key: "name", Value: "Bob"}},
			},
			options: func(e *ExpectBuilder) *ExpectBuilder { return e },
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			testFile := filepath.Join(tempDir, tt.name+".txt")
			createTestFile(t, testFile, tt.fileContent)

			builder := ExpectThat(t, tt.actual)
			builder = tt.options(builder)
			builder.ShouldMatch(testFile)
		})
	}
}

// TestExpectFieldValueIgnoring tests field value ignoring with the ExpectThat API
func TestExpectFieldValueIgnoring(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name        string
		fileContent string
		actual      []bson.D
		options     func(*ExpectBuilder) *ExpectBuilder
	}{
		{
			name:        "Ignore single field",
			fileContent: `{"_id":"original","name":"John"}`,
			actual: []bson.D{
				{{Key: "_id", Value: "different"}, {Key: "name", Value: "John"}},
			},
			options: func(e *ExpectBuilder) *ExpectBuilder {
				return e.WithIgnoredFields("_id")
			},
		},
		{
			name:        "Ignore multiple fields",
			fileContent: `{"_id":"original","timestamp":"2023-01-01","name":"John"}`,
			actual: []bson.D{
				{{Key: "_id", Value: "different"}, {Key: "timestamp", Value: "2023-01-02"}, {Key: "name", Value: "John"}},
			},
			options: func(e *ExpectBuilder) *ExpectBuilder {
				return e.WithIgnoredFields("_id", "timestamp")
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			testFile := filepath.Join(tempDir, tt.name+".txt")
			createTestFile(t, testFile, tt.fileContent)

			builder := ExpectThat(t, tt.actual)
			builder = tt.options(builder)
			builder.ShouldMatch(testFile)
		})
	}
}

// TestExpectDocumentLevelUnorderedComparison tests unordered document comparison
func TestExpectDocumentLevelUnorderedComparison(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name        string
		fileContent string
		actual      []bson.D
		options     func(*ExpectBuilder) *ExpectBuilder
	}{
		{
			name: "Unordered documents (default behavior)",
			fileContent: `{"product":"Russell Hobbs Chrome Kettle","total_value":16,"quantity":1,"product_id":"xyz11228"}
{"product":"Karcher Hose Set","total_value":66,"quantity":3,"product_id":"def45678"}`,
			actual: []bson.D{
				{{Key: "product", Value: "Karcher Hose Set"}, {Key: "total_value", Value: 66}, {Key: "quantity", Value: 3}, {Key: "product_id", Value: "def45678"}},
				{{Key: "product", Value: "Russell Hobbs Chrome Kettle"}, {Key: "total_value", Value: 16}, {Key: "quantity", Value: 1}, {Key: "product_id", Value: "xyz11228"}},
			},
			options: func(e *ExpectBuilder) *ExpectBuilder { return e },
		},
		{
			name: "Unordered documents (explicit unordered)",
			fileContent: `{"product":"Russell Hobbs Chrome Kettle","total_value":16,"quantity":1,"product_id":"xyz11228"}
{"product":"Karcher Hose Set","total_value":66,"quantity":3,"product_id":"def45678"}`,
			actual: []bson.D{
				{{Key: "product", Value: "Karcher Hose Set"}, {Key: "total_value", Value: 66}, {Key: "quantity", Value: 3}, {Key: "product_id", Value: "def45678"}},
				{{Key: "product", Value: "Russell Hobbs Chrome Kettle"}, {Key: "total_value", Value: 16}, {Key: "quantity", Value: 1}, {Key: "product_id", Value: "xyz11228"}},
			},
			options: func(e *ExpectBuilder) *ExpectBuilder {
				return e.WithUnorderedSort()
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			testFile := filepath.Join(tempDir, tt.name+".txt")
			createTestFile(t, testFile, tt.fileContent)

			builder := ExpectThat(t, tt.actual)
			builder = tt.options(builder)
			builder.ShouldMatch(testFile)
		})
	}
}

// TestExpectFieldOrderingWithinDocuments tests field ordering within documents
func TestExpectFieldOrderingWithinDocuments(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name        string
		fileContent string
		actual      []bson.D
	}{
		{
			name:        "Fields in different order should match",
			fileContent: `{"product":"Russell Hobbs Chrome Kettle","total_value":16,"quantity":1,"product_id":"xyz11228"}`,
			actual: []bson.D{
				// Fields in different order than expected file
				{{Key: "quantity", Value: 1}, {Key: "product_id", Value: "xyz11228"}, {Key: "total_value", Value: 16}, {Key: "product", Value: "Russell Hobbs Chrome Kettle"}},
			},
		},
		{
			name:        "Nested object fields in different order should match",
			fileContent: `{"user":{"name":"John","age":30,"active":true,"profile":{"address":"123 Main St","email":"john@example.com"}}}`,
			actual: []bson.D{
				{{Key: "user", Value: map[string]interface{}{
					"age":    30,
					"active": true,
					"name":   "John",
					"profile": map[string]interface{}{
						"email":   "john@example.com",
						"address": "123 Main St",
					},
				}}},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			testFile := filepath.Join(tempDir, tt.name+".txt")
			createTestFile(t, testFile, tt.fileContent)

			ExpectThat(t, tt.actual).ShouldMatch(testFile)
		})
	}
}

// TestExpectArrayComparisonStrategies tests array comparison strategies
func TestExpectArrayComparisonStrategies(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name        string
		fileContent string
		actual      []bson.D
		options     func(*ExpectBuilder) *ExpectBuilder
	}{
		{
			name:        "Unordered array compare (default)",
			fileContent: `{"items":[1,2,3]}`,
			actual: []bson.D{
				{{Key: "items", Value: []interface{}{3, 1, 2}}},
			},
			options: func(e *ExpectBuilder) *ExpectBuilder { return e },
		},
		{
			name:        "Ordered array compare",
			fileContent: `{"items":[1,2,3]}`,
			actual: []bson.D{
				{{Key: "items", Value: []interface{}{1, 2, 3}}},
			},
			options: func(e *ExpectBuilder) *ExpectBuilder {
				return e.WithOrderedSort()
			},
		},
		{
			name:        "Complex object array unordered",
			fileContent: `{"users":[{"name":"Alice","age":30},{"name":"Bob","age":25}]}`,
			actual: []bson.D{
				{{Key: "users", Value: []interface{}{
					map[string]interface{}{"name": "Bob", "age": 25},
					map[string]interface{}{"name": "Alice", "age": 30},
				}}},
			},
			options: func(e *ExpectBuilder) *ExpectBuilder { return e },
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			testFile := filepath.Join(tempDir, tt.name+".txt")
			createTestFile(t, testFile, tt.fileContent)

			builder := ExpectThat(t, tt.actual)
			builder = tt.options(builder)
			builder.ShouldMatch(testFile)
		})
	}
}

// TestExpectCrossLanguageValidationCases tests cross-language validation cases
func TestExpectCrossLanguageValidationCases(t *testing.T) {
	tempDir := t.TempDir()

	t.Run("MongoDB types normalization", func(t *testing.T) {
		testFile := filepath.Join(tempDir, "mongo_types.txt")
		createTestFile(t, testFile, `{"_id":"507f1f77bcf86cd799439011","amount":"123.45"}`)

		oid, err := bson.ObjectIDFromHex("507f1f77bcf86cd799439011")
		if err != nil {
			t.Fatal(err)
		}

		actual := []bson.D{
			{{Key: "_id", Value: oid}, {Key: "amount", Value: "123.45"}},
		}

		ExpectThat(t, actual).ShouldMatch(testFile)
	})

	t.Run("Field value ignoring", func(t *testing.T) {
		testFile := filepath.Join(tempDir, "ignore_field.txt")
		createTestFile(t, testFile, `{"_id":"any1","name":"John"}`)

		actual := []bson.D{
			{{Key: "_id", Value: "any2"}, {Key: "name", Value: "John"}},
		}

		ExpectThat(t, actual).WithIgnoredFields("_id").ShouldMatch(testFile)
	})

	t.Run("Ellipsis array matching", func(t *testing.T) {
		testFile := filepath.Join(tempDir, "array_wildcard.txt")
		createTestFile(t, testFile, `{"items":["..."]}`)

		actual := []bson.D{
			{{Key: "items", Value: []interface{}{1, 2, 3, 4}}},
		}

		ExpectThat(t, actual).ShouldMatch(testFile)
	})

	t.Run("Truncated string matching", func(t *testing.T) {
		testFile := filepath.Join(tempDir, "truncated_msg.txt")
		createTestFile(t, testFile, `{"message":"Error: Connection failed..."}`)

		actual := []bson.D{
			{{Key: "message", Value: "Error: Connection failed after 3 retries"}},
		}

		ExpectThat(t, actual).ShouldMatch(testFile)
	})
}

// TestExpectEdgeCases tests edge cases with the ExpectThat API
func TestExpectEdgeCases(t *testing.T) {
	tempDir := t.TempDir()

	tests := []struct {
		name        string
		fileContent string
		actual      []bson.D
	}{
		{
			name:        "Empty documents",
			fileContent: `{}`,
			actual:      []bson.D{{}},
		},
		{
			name:        "Empty array",
			fileContent: ``,
			actual:      []bson.D{},
		},
		{
			name:        "Nested objects",
			fileContent: `{"user":{"profile":{"name":"John"}}}`,
			actual: []bson.D{
				{{Key: "user", Value: map[string]interface{}{
					"profile": map[string]interface{}{
						"name": "John",
					},
				}}},
			},
		},
		{
			name:        "Mixed types in array",
			fileContent: `{"mixed":[1,"string",true,null]}`,
			actual: []bson.D{
				{{Key: "mixed", Value: []interface{}{1, "string", true, nil}}},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			testFile := filepath.Join(tempDir, tt.name+".txt")
			createTestFile(t, testFile, tt.fileContent)

			ExpectThat(t, tt.actual).ShouldMatch(testFile)
		})
	}
}

// TestExpectStructComparison tests struct comparison with the ExpectThat API
func TestExpectStructComparison(t *testing.T) {
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

	tempDir := t.TempDir()

	tests := []struct {
		name        string
		fileContent string
		actual      interface{}
		options     func(*ExpectBuilder) *ExpectBuilder
	}{
		{
			name: "Struct with bson tags matches",
			fileContent: `{"_id":"12345","name":"John Doe","age":30,"email":"john@example.com","salary":50000.0,"isActive":true}
{"_id":"67890","name":"Jane Smith","age":25,"email":"jane@example.com","salary":55000.0,"isActive":false}`,
			actual: []Person{
				{ID: "12345", Name: "John Doe", Age: 30, Email: "john@example.com", Salary: 50000.0, IsActive: true},
				{ID: "67890", Name: "Jane Smith", Age: 25, Email: "jane@example.com", Salary: 55000.0, IsActive: false},
			},
			options: func(e *ExpectBuilder) *ExpectBuilder { return e },
		},
		{
			name:        "Struct with json tags matches",
			fileContent: `{"product_id":"ABC123","name":"Widget","price":19.99,"in_stock":true}`,
			actual: []Product{
				{ProductID: "ABC123", ProductName: "Widget", Price: 19.99, InStock: true},
			},
			options: func(e *ExpectBuilder) *ExpectBuilder { return e },
		},
		{
			name:        "Struct compare with ellipsis on ID field",
			fileContent: `{"_id":"...","name":"Alice","age":28,"email":"alice@example.com","salary":60000.0,"isActive":true}`,
			actual: []Person{
				{ID: "auto-generated-123", Name: "Alice", Age: 28, Email: "alice@example.com", Salary: 60000.0, IsActive: true},
			},
			options: func(e *ExpectBuilder) *ExpectBuilder { return e },
		},
		{
			name:        "Struct compare with ignored fields",
			fileContent: `{"_id":"different-id","name":"Bob","age":35,"email":"bob@example.com","salary":70000.0,"isActive":false}`,
			actual: []Person{
				{ID: "will-be-ignored", Name: "Bob", Age: 35, Email: "bob@example.com", Salary: 70000.0, IsActive: false},
			},
			options: func(e *ExpectBuilder) *ExpectBuilder {
				return e.WithIgnoredFields("_id")
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			testFile := filepath.Join(tempDir, tt.name+".txt")
			createTestFile(t, testFile, tt.fileContent)

			builder := ExpectThat(t, tt.actual)
			builder = tt.options(builder)
			builder.ShouldMatch(testFile)
		})
	}
}

// TestExpectMixedTypesComparison tests that both BSON and struct comparisons work with the ExpectThat API
func TestExpectMixedTypesComparison(t *testing.T) {
	type User struct {
		ID   string `bson:"_id"`
		Name string `bson:"name"`
		Age  int    `bson:"age"`
	}

	tempDir := t.TempDir()
	testFile := filepath.Join(tempDir, "mixed.txt")
	createTestFile(t, testFile, `{"_id":"user123","name":"Mixed Test","age":30}`)

	t.Run("Use traditional BSON.D slice", func(t *testing.T) {
		bsonResults := []bson.D{
			{
				{Key: "_id", Value: "user123"},
				{Key: "name", Value: "Mixed Test"},
				{Key: "age", Value: 30},
			},
		}
		ExpectThat(t, bsonResults).ShouldMatch(testFile)
	})

	t.Run("Use struct slice with ExpectThat API", func(t *testing.T) {
		structResults := []User{
			{ID: "user123", Name: "Mixed Test", Age: 30},
		}
		ExpectThat(t, structResults).ShouldMatch(testFile)
	})
}

// TestShouldResembleBasicFunctionality tests basic ShouldResemble functionality
func TestShouldResembleBasicFunctionality(t *testing.T) {
	tempDir := t.TempDir()

	t.Run("Validates document count", func(t *testing.T) {
		testFile := filepath.Join(tempDir, "count_test.txt")
		createTestFile(t, testFile, `{"_id":"1","title":"Movie 1","year":2012}
{"_id":"2","title":"Movie 2","year":2012}
{"_id":"3","title":"Movie 3","year":2012}`)

		actual := []bson.D{
			{{Key: "_id", Value: "a"}, {Key: "title", Value: "Different 1"}, {Key: "year", Value: 2012}},
			{{Key: "_id", Value: "b"}, {Key: "title", Value: "Different 2"}, {Key: "year", Value: 2012}},
			{{Key: "_id", Value: "c"}, {Key: "title", Value: "Different 3"}, {Key: "year", Value: 2012}},
		}

		ExpectThat(t, actual).
			ShouldResemble(testFile).
			WithSchema(Schema{
				Count:          3,
				RequiredFields: []string{"_id", "title", "year"},
				FieldValues:    map[string]interface{}{"year": 2012},
			})
	})

	t.Run("Validates required fields are present", func(t *testing.T) {
		testFile := filepath.Join(tempDir, "required_fields.txt")
		createTestFile(t, testFile, `{"_id":"1","title":"Test","score":0.95}`)

		actual := []bson.D{
			{{Key: "_id", Value: "different"}, {Key: "title", Value: "Different"}, {Key: "score", Value: 0.87}},
		}

		ExpectThat(t, actual).
			ShouldResemble(testFile).
			WithSchema(Schema{
				Count:          1,
				RequiredFields: []string{"_id", "title", "score"},
			})
	})

	t.Run("Validates field values match exactly", func(t *testing.T) {
		testFile := filepath.Join(tempDir, "field_values.txt")
		createTestFile(t, testFile, `{"year":2012,"genre":"Action"}
{"year":2012,"genre":"Action"}`)

		actual := []bson.D{
			{{Key: "year", Value: 2012}, {Key: "genre", Value: "Action"}, {Key: "title", Value: "Movie A"}},
			{{Key: "year", Value: 2012}, {Key: "genre", Value: "Action"}, {Key: "title", Value: "Movie B"}},
		}

		ExpectThat(t, actual).
			ShouldResemble(testFile).
			WithSchema(Schema{
				Count:       2,
				FieldValues: map[string]interface{}{"year": 2012, "genre": "Action"},
			})
	})
}

// TestShouldResembleValidationErrors tests that ShouldResemble fails appropriately
func TestShouldResembleValidationErrors(t *testing.T) {
	tempDir := t.TempDir()

	t.Run("Fails when count does not match", func(t *testing.T) {
		testFile := filepath.Join(tempDir, "count_mismatch.txt")
		createTestFile(t, testFile, `{"title":"Only One"}`)

		actual := []bson.D{
			{{Key: "title", Value: "First"}},
			{{Key: "title", Value: "Second"}},
		}

		mockT := &mockTestingT{t: t, shouldFail: true}
		ExpectThat(mockT, actual).
			ShouldResemble(testFile).
			WithSchema(Schema{Count: 1})

		if !mockT.failed {
			t.Error("Expected test to fail when actual count doesn't match schema count")
		}
	})

	t.Run("Fails when required field is missing", func(t *testing.T) {
		testFile := filepath.Join(tempDir, "missing_required.txt")
		createTestFile(t, testFile, `{"title":"Test"}`)

		actual := []bson.D{
			{{Key: "title", Value: "Test"}},
		}

		mockT := &mockTestingT{t: t, shouldFail: true}
		ExpectThat(mockT, actual).
			ShouldResemble(testFile).
			WithSchema(Schema{
				Count:          1,
				RequiredFields: []string{"title", "year"},
			})

		if !mockT.failed {
			t.Error("Expected test to fail when required field is missing")
		}
	})

	t.Run("Fails when field value does not match", func(t *testing.T) {
		testFile := filepath.Join(tempDir, "value_mismatch.txt")
		createTestFile(t, testFile, `{"year":2012}`)

		actual := []bson.D{
			{{Key: "year", Value: 2013}},
		}

		mockT := &mockTestingT{t: t, shouldFail: true}
		ExpectThat(mockT, actual).
			ShouldResemble(testFile).
			WithSchema(Schema{
				Count:       1,
				FieldValues: map[string]interface{}{"year": 2012},
			})

		if !mockT.failed {
			t.Error("Expected test to fail when field value doesn't match")
		}
	})
}

// TestShouldResembleMutualExclusivity tests that ShouldResemble is mutually exclusive with other options
func TestShouldResembleMutualExclusivity(t *testing.T) {
	tempDir := t.TempDir()
	testFile := filepath.Join(tempDir, "mutual_exclusivity.txt")
	createTestFile(t, testFile, `{"title":"Test"}`)

	actual := []bson.D{
		{{Key: "title", Value: "Test"}},
	}

	t.Run("Fails when WithSchema used without ShouldResemble", func(t *testing.T) {
		mockT := &mockTestingT{t: t, shouldFail: true}
		ExpectThat(mockT, actual).WithSchema(Schema{Count: 1})

		if !mockT.failed {
			t.Error("Expected test to fail when WithSchema is used without ShouldResemble")
		}
	})

	t.Run("Fails when WithIgnoredFields used with ShouldResemble", func(t *testing.T) {
		mockT := &mockTestingT{t: t, shouldFail: true}
		ExpectThat(mockT, actual).
			WithIgnoredFields("_id").
			ShouldResemble(testFile).
			WithSchema(Schema{Count: 1})

		if !mockT.failed {
			t.Error("Expected test to fail when WithIgnoredFields is used with ShouldResemble")
		}
	})

	t.Run("Fails when WithOrderedSort used before ShouldResemble", func(t *testing.T) {
		mockT := &mockTestingT{t: t, shouldFail: true}
		ExpectThat(mockT, actual).
			WithOrderedSort().
			ShouldResemble(testFile).
			WithSchema(Schema{Count: 1})

		if !mockT.failed {
			t.Error("Expected test to fail when WithOrderedSort is used with ShouldResemble")
		}
	})

	t.Run("Fails when WithUnorderedSort used before ShouldResemble", func(t *testing.T) {
		mockT := &mockTestingT{t: t, shouldFail: true}
		ExpectThat(mockT, actual).
			WithUnorderedSort().
			ShouldResemble(testFile).
			WithSchema(Schema{Count: 1})

		if !mockT.failed {
			t.Error("Expected test to fail when WithUnorderedSort is used with ShouldResemble")
		}
	})

	t.Run("Fails when WithOrderedSort used after ShouldResemble", func(t *testing.T) {
		mockT := &mockTestingT{t: t, shouldFail: true}
		ExpectThat(mockT, actual).
			ShouldResemble(testFile).
			WithOrderedSort()

		if !mockT.failed {
			t.Error("Expected test to fail when WithOrderedSort is used after ShouldResemble")
		}
	})

	t.Run("Fails when WithUnorderedSort used after ShouldResemble", func(t *testing.T) {
		mockT := &mockTestingT{t: t, shouldFail: true}
		ExpectThat(mockT, actual).
			ShouldResemble(testFile).
			WithUnorderedSort()

		if !mockT.failed {
			t.Error("Expected test to fail when WithUnorderedSort is used after ShouldResemble")
		}
	})

	t.Run("WithOrderedSort works with ShouldMatch", func(t *testing.T) {
		// This should pass - WithOrderedSort is valid with ShouldMatch
		orderedActual := []bson.D{
			{{Key: "title", Value: "First"}},
			{{Key: "title", Value: "Second"}},
		}
		orderedFile := filepath.Join(tempDir, "ordered.txt")
		createTestFile(t, orderedFile, `{"title":"First"}
{"title":"Second"}`)

		ExpectThat(t, orderedActual).
			WithOrderedSort().
			ShouldMatch(orderedFile)
	})
}

// TestShouldResembleSingleDocumentWrapping tests that single documents are auto-wrapped
func TestShouldResembleSingleDocumentWrapping(t *testing.T) {
	type Movie struct {
		ID    string `bson:"_id"`
		Title string `bson:"title"`
		Year  int    `bson:"year"`
	}

	tempDir := t.TempDir()

	t.Run("Single struct actual is auto-wrapped", func(t *testing.T) {
		testFile := filepath.Join(tempDir, "single_doc.txt")
		createTestFile(t, testFile, `{"_id":"expected","title":"Expected Movie","year":2020}`)

		actual := Movie{ID: "actual", Title: "Actual Movie", Year: 2020}

		ExpectThat(t, actual).
			ShouldResemble(testFile).
			WithSchema(Schema{
				Count:          1,
				RequiredFields: []string{"_id", "title", "year"},
				FieldValues:    map[string]interface{}{"year": float64(2020)},
			})
	})

	t.Run("Single bson.D actual is auto-wrapped", func(t *testing.T) {
		testFile := filepath.Join(tempDir, "single_bson.txt")
		createTestFile(t, testFile, `{"_id":"expected","title":"Expected","year":2021}`)

		actual := bson.D{
			{Key: "_id", Value: "actual"},
			{Key: "title", Value: "Actual"},
			{Key: "year", Value: 2021},
		}

		ExpectThat(t, actual).
			ShouldResemble(testFile).
			WithSchema(Schema{
				Count:          1,
				RequiredFields: []string{"_id", "title", "year"},
				FieldValues:    map[string]interface{}{"year": float64(2021)},
			})
	})

	t.Run("Single map actual is auto-wrapped", func(t *testing.T) {
		testFile := filepath.Join(tempDir, "single_map.txt")
		createTestFile(t, testFile, `{"name":"Expected","value":100}`)

		actual := map[string]interface{}{
			"name":  "Actual",
			"value": float64(100),
		}

		ExpectThat(t, actual).
			ShouldResemble(testFile).
			WithSchema(Schema{
				Count:          1,
				RequiredFields: []string{"name", "value"},
				FieldValues:    map[string]interface{}{"value": float64(100)},
			})
	})

	t.Run("Both single expected and actual work", func(t *testing.T) {
		// Single document JSON string as expected
		expected := `{"_id":"expected","title":"Expected","year":2022}`

		actual := Movie{ID: "actual", Title: "Actual", Year: 2022}

		ExpectThat(t, actual).
			ShouldResemble(expected).
			WithSchema(Schema{
				Count:          1,
				RequiredFields: []string{"_id", "title", "year"},
				FieldValues:    map[string]interface{}{"year": float64(2022)},
			})
	})
}

// TestShouldResembleVectorSearchScenario tests a realistic Vector Search scenario
// where document content may vary but structure remains consistent
func TestShouldResembleVectorSearchScenario(t *testing.T) {
	tempDir := t.TempDir()

	t.Run("Vector Search results with varying content but consistent structure", func(t *testing.T) {
		// Expected output file representing one possible set of results
		// All documents have year=1999 to match the FieldValues schema
		testFile := filepath.Join(tempDir, "vector_search.txt")
		createTestFile(t, testFile, `{"_id":"doc1","title":"The Matrix","year":1999,"score":0.95}
{"_id":"doc2","title":"Office Space","year":1999,"score":0.87}
{"_id":"doc3","title":"Fight Club","year":1999,"score":0.82}`)

		// Actual results may contain different documents but same structure
		// and matching field values where specified
		actual := []bson.D{
			{{Key: "_id", Value: "docA"}, {Key: "title", Value: "Different Movie 1"}, {Key: "year", Value: 1999}, {Key: "score", Value: 0.91}},
			{{Key: "_id", Value: "docB"}, {Key: "title", Value: "Different Movie 2"}, {Key: "year", Value: 1999}, {Key: "score", Value: 0.88}},
			{{Key: "_id", Value: "docC"}, {Key: "title", Value: "Different Movie 3"}, {Key: "year", Value: 1999}, {Key: "score", Value: 0.85}},
		}

		ExpectThat(t, actual).
			ShouldResemble(testFile).
			WithSchema(Schema{
				Count:          3,
				RequiredFields: []string{"_id", "title", "year", "score"},
				FieldValues:    map[string]interface{}{"year": 1999},
			})
	})

	t.Run("Vector Search with only structure validation (no FieldValues)", func(t *testing.T) {
		// In this case, we don't care about specific field values - just structure
		testFile := filepath.Join(tempDir, "vector_search_structure.txt")
		createTestFile(t, testFile, `{"_id":"doc1","title":"The Matrix","year":1999,"score":0.95}
{"_id":"doc2","title":"Inception","year":2010,"score":0.87}
{"_id":"doc3","title":"Interstellar","year":2014,"score":0.82}`)

		actual := []bson.D{
			{{Key: "_id", Value: "docA"}, {Key: "title", Value: "Different 1"}, {Key: "year", Value: 2020}, {Key: "score", Value: 0.91}},
			{{Key: "_id", Value: "docB"}, {Key: "title", Value: "Different 2"}, {Key: "year", Value: 2021}, {Key: "score", Value: 0.88}},
			{{Key: "_id", Value: "docC"}, {Key: "title", Value: "Different 3"}, {Key: "year", Value: 2022}, {Key: "score", Value: 0.85}},
		}

		// Only validate count and required fields, no specific field values
		ExpectThat(t, actual).
			ShouldResemble(testFile).
			WithSchema(Schema{
				Count:          3,
				RequiredFields: []string{"_id", "title", "year", "score"},
			})
	})
}

// TestShouldResembleWithStructs tests ShouldResemble works with struct slices
func TestShouldResembleWithStructs(t *testing.T) {
	type Movie struct {
		ID    string  `bson:"_id"`
		Title string  `bson:"title"`
		Year  int     `bson:"year"`
		Score float64 `bson:"score"`
	}

	tempDir := t.TempDir()

	t.Run("Struct slices work with ShouldResemble", func(t *testing.T) {
		testFile := filepath.Join(tempDir, "struct_test.txt")
		createTestFile(t, testFile, `{"_id":"1","title":"Expected","year":2020,"score":0.9}
{"_id":"2","title":"Expected 2","year":2020,"score":0.8}`)

		actual := []Movie{
			{ID: "a", Title: "Actual 1", Year: 2020, Score: 0.85},
			{ID: "b", Title: "Actual 2", Year: 2020, Score: 0.75},
		}

		ExpectThat(t, actual).
			ShouldResemble(testFile).
			WithSchema(Schema{
				Count:          2,
				RequiredFields: []string{"_id", "title", "year", "score"},
				FieldValues:    map[string]interface{}{"year": float64(2020)},
			})
	})
}
