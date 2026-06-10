package compare

// BSON / struct normalisation helpers used by the kernel bridge.
//
// These helpers convert Go-native (and BSON) types into JSON-compatible
// values that the comparison kernel can consume directly. The kernel handles
// every other normalisation step (MongoDB-shell syntax, ellipsis, date
// formatting, etc.), so the helpers here are deliberately minimal.

import (
	"fmt"
	"reflect"
	"strings"
	"time"

	"go.mongodb.org/mongo-driver/v2/bson"
)

// convertActualResults converts a slice of any BSON / struct type into a
// normalised []interface{} ready for JSON marshalling on the kernel wire.
func convertActualResults(actualResults interface{}) ([]interface{}, error) {
	if actualResults == nil {
		return nil, fmt.Errorf("actualResults is nil")
	}

	v := reflect.ValueOf(actualResults)
	if v.Kind() != reflect.Slice {
		return nil, fmt.Errorf("actualResults must be a slice, got %T", actualResults)
	}

	length := v.Len()
	normalized := make([]interface{}, length)

	for i := 0; i < length; i++ {
		item := v.Index(i).Interface()
		switch doc := item.(type) {
		case bson.D:
			normalized[i] = normalizeValue(bsonDToMap(doc))
		case bson.M:
			normalized[i] = normalizeValue(bsonMToMap(doc))
		default:
			normalized[i] = normalizeValue(structToMap(item))
		}
	}

	return normalized, nil
}

// normalizeValue recursively converts BSON wrappers, time values and numeric
// types into JSON-friendly equivalents so the kernel sees the same shape on
// every wire payload.
func normalizeValue(value interface{}) interface{} {
	if value == nil {
		return nil
	}

	switch v := value.(type) {
	case bson.D:
		return normalizeValue(bsonDToMap(v))
	case bson.M:
		return normalizeValue(bsonMToMap(v))
	case bson.A:
		arr := make([]interface{}, len(v))
		for i, item := range v {
			arr[i] = normalizeValue(item)
		}
		return arr
	case bson.ObjectID:
		return v.Hex()
	case bson.Decimal128:
		return v.String()
	case bson.DateTime:
		return time.Unix(int64(v)/1000, (int64(v)%1000)*1000000).UTC().Format(time.RFC3339)
	case time.Time:
		return v.UTC().Format(time.RFC3339)
	case int:
		return float64(v)
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

func bsonDToMap(doc bson.D) map[string]interface{} {
	result := make(map[string]interface{})
	for _, elem := range doc {
		result[elem.Key] = elem.Value
	}
	return result
}

func bsonMToMap(doc bson.M) map[string]interface{} {
	result := make(map[string]interface{})
	for k, v := range doc {
		result[k] = v
	}
	return result
}

// structToMap converts a struct (or pointer to struct) to a
// map[string]interface{} using bson / json struct tags. Non-struct values are
// returned unchanged so callers can pass any value through uniformly.
func structToMap(v interface{}) interface{} {
	if v == nil {
		return nil
	}

	val := reflect.ValueOf(v)
	typ := reflect.TypeOf(v)

	if val.Kind() == reflect.Ptr {
		if val.IsNil() {
			return nil
		}
		val = val.Elem()
		typ = typ.Elem()
	}

	if val.Kind() == reflect.Map {
		return v
	}
	if val.Kind() != reflect.Struct {
		return v
	}

	result := make(map[string]interface{})
	for i := 0; i < val.NumField(); i++ {
		field := val.Field(i)
		fieldType := typ.Field(i)

		if !field.CanInterface() {
			continue
		}

		fieldName := fieldType.Name
		if bsonTag := fieldType.Tag.Get("bson"); bsonTag != "" && bsonTag != "-" {
			parts := strings.Split(bsonTag, ",")
			if parts[0] != "" {
				fieldName = parts[0]
			}
		} else if jsonTag := fieldType.Tag.Get("json"); jsonTag != "" && jsonTag != "-" {
			parts := strings.Split(jsonTag, ",")
			if parts[0] != "" {
				fieldName = parts[0]
			}
		}

		if fieldName == "-" {
			continue
		}

		fieldValue := field.Interface()
		result[fieldName] = structToMap(fieldValue)
	}

	return result
}
