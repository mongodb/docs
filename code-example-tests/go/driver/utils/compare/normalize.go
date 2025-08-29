package compare

import (
	"fmt"
	"go.mongodb.org/mongo-driver/v2/bson"
	"reflect"
	"regexp"
	"strings"
	"time"
)

// convertActualResults converts various types of slices to normalized []interface{}
func convertActualResults(actualResults interface{}) ([]interface{}, error) {
	if actualResults == nil {
		return nil, fmt.Errorf("actualResults is nil")
	}

	// Use reflection to handle different slice types
	v := reflect.ValueOf(actualResults)
	if v.Kind() != reflect.Slice {
		return nil, fmt.Errorf("actualResults must be a slice, got %T", actualResults)
	}

	length := v.Len()
	normalized := make([]interface{}, length)

	for i := 0; i < length; i++ {
		item := v.Index(i).Interface()

		// Handle different types
		switch doc := item.(type) {
		case bson.D:
			// Existing BSON.D handling
			normalized[i] = normalizeValue(bsonDToMap(doc))
		default:
			// Handle struct types by converting to map using reflection
			normalized[i] = normalizeValue(structToMap(item))
		}
	}

	return normalized, nil
}

// preprocessMongoSyntax converts MongoDB document syntax to valid JSON
func preprocessMongoSyntax(input string) string {
	// Handle ObjectId constructor
	objectIdRegex := regexp.MustCompile(`ObjectId\(['"]([^'"]+)['"]\)`)
	input = objectIdRegex.ReplaceAllString(input, `"$1"`)

	// Handle Decimal128 constructor
	decimal128Regex := regexp.MustCompile(`Decimal128\(['"]([^'"]+)['"]\)`)
	input = decimal128Regex.ReplaceAllString(input, `"$1"`)

	// Handle Date constructor - convert to ISO string format
	dateRegex := regexp.MustCompile(`Date\(['"]([^'"]+)['"]\)`)
	input = dateRegex.ReplaceAllStringFunc(input, func(match string) string {
		dateStr := dateRegex.FindStringSubmatch(match)[1]
		if t, err := time.Parse(time.RFC3339, dateStr); err == nil {
			return `"` + t.Format(time.RFC3339) + `"`
		}
		return `"` + dateStr + `"`
	})

	// Handle MongoDB extended JSON date format
	mongoDateRegex := regexp.MustCompile(`{\s*"\$date"\s*:\s*"([^"]+)"\s*}`)
	input = mongoDateRegex.ReplaceAllString(input, `"$1"`)

	return input
}

// normalizeValue recursively normalizes values for compare
func normalizeValue(value interface{}) interface{} {
	if value == nil {
		return nil
	}

	switch v := value.(type) {
	case bson.ObjectID:
		return v.Hex()
	case bson.Decimal128:
		return v.String()
	case bson.DateTime:
		return time.Unix(int64(v)/1000, (int64(v)%1000)*1000000).UTC().Format(time.RFC3339)
	case time.Time:
		return v.UTC().Format(time.RFC3339)
	case int:
		return float64(v) // Normalize all numbers to float64
	case int32:
		return float64(v)
	case int64:
		return float64(v)
	case float32:
		return float64(v)
	case float64:
		return v
	case []interface{}:
		normalized := make([]interface{}, len(v))
		for i, item := range v {
			normalized[i] = normalizeValue(item)
		}
		return normalized
	case map[string]interface{}:
		normalized := make(map[string]interface{})
		for k, val := range v {
			normalized[k] = normalizeValue(val)
		}
		return normalized
	default:
		return v
	}
}

// bsonDToMap converts bson.D to map[string]interface{}
func bsonDToMap(doc bson.D) map[string]interface{} {
	result := make(map[string]interface{})
	for _, elem := range doc {
		result[elem.Key] = elem.Value
	}
	return result
}

// structToMap converts a struct or other value to a map[string]interface{}
func structToMap(v interface{}) interface{} {
	if v == nil {
		return nil
	}

	val := reflect.ValueOf(v)
	typ := reflect.TypeOf(v)

	// Handle pointer types
	if val.Kind() == reflect.Ptr {
		if val.IsNil() {
			return nil
		}
		val = val.Elem()
		typ = typ.Elem()
	}

	// If it's already a map, return as-is
	if val.Kind() == reflect.Map {
		return v
	}

	// If it's not a struct, return the value as-is (primitives, slices, etc.)
	if val.Kind() != reflect.Struct {
		return v
	}

	// Convert struct to map
	result := make(map[string]interface{})

	for i := 0; i < val.NumField(); i++ {
		field := val.Field(i)
		fieldType := typ.Field(i)

		// Skip unexported fields
		if !field.CanInterface() {
			continue
		}

		// Get the field name, checking for bson or json tags
		fieldName := fieldType.Name
		if bsonTag := fieldType.Tag.Get("bson"); bsonTag != "" && bsonTag != "-" {
			// Parse bson tag (handle "fieldname,omitempty" format)
			parts := strings.Split(bsonTag, ",")
			if parts[0] != "" {
				fieldName = parts[0]
			}
		} else if jsonTag := fieldType.Tag.Get("json"); jsonTag != "" && jsonTag != "-" {
			// Parse json tag as fallback
			parts := strings.Split(jsonTag, ",")
			if parts[0] != "" {
				fieldName = parts[0]
			}
		}

		// Skip fields tagged with "-"
		if fieldName == "-" {
			continue
		}

		// Recursively convert the field value
		fieldValue := field.Interface()
		result[fieldName] = structToMap(fieldValue)
	}

	return result
}

// normalizePrimitive normalizes primitive values for compare
func normalizePrimitive(value interface{}) interface{} {
	switch v := value.(type) {
	case bson.ObjectID:
		return v.Hex()
	case bson.Decimal128:
		return v.String()
	case bson.DateTime:
		return time.Unix(int64(v)/1000, (int64(v)%1000)*1000000).UTC().Format(time.RFC3339)
	case time.Time:
		return v.UTC().Format(time.RFC3339)
	case string:
		// Handle ISO date strings
		if matched, _ := regexp.MatchString(`^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}`, v); matched {
			if t, err := time.Parse(time.RFC3339, v); err == nil {
				return t.UTC().Format(time.RFC3339)
			}
		}
		return v
	case int:
		return float64(v) // Normalize all numbers to float64
	case int32:
		return float64(v)
	case int64:
		return float64(v)
	case float32:
		return float64(v)
	case float64:
		return v
	default:
		return v
	}
}
