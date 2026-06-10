package main

import (
	"fmt"
	"regexp"
	"strconv"
	"strings"
	"time"
)

// preprocessMongoSyntax converts MongoDB document syntax to valid JSON.
// It handles line comments, unquoted keys, single-quoted strings,
// ObjectId/Decimal128/Date constructors (with or without the JS `new`
// keyword), unquoted ellipsis patterns, standalone ellipsis lines, and
// trailing commas.
func preprocessMongoSyntax(input string) string {
	// Normalise quotes first so subsequent passes only need to recognise
	// double-quoted strings. Without this, single-quoted content containing
	// `//` (e.g. URLs in expected output) would be mangled by stripLineComments.
	input = convertSingleQuotesToDouble(input)
	input = stripLineComments(input)
	input = quoteUnquotedKeys(input)

	// Accept both `Ctor(...)` and `new Ctor(...)` — JS-style expected files
	// commonly include the `new` keyword; other suites omit it.
	objectIdRegex := regexp.MustCompile(`(?:new\s+)?ObjectId\(['"]([^'"]+)['"]\)`)
	input = objectIdRegex.ReplaceAllString(input, `"$1"`)

	decimal128Regex := regexp.MustCompile(`(?:new\s+)?Decimal128\(['"]([^'"]+)['"]\)`)
	input = decimal128Regex.ReplaceAllString(input, `"$1"`)

	dateRegex := regexp.MustCompile(`(?:new\s+)?Date\(['"]([^'"]+)['"]\)`)
	input = dateRegex.ReplaceAllStringFunc(input, func(match string) string {
		dateStr := dateRegex.FindStringSubmatch(match)[1]
		if t, err := time.Parse(time.RFC3339, dateStr); err == nil {
			return `"` + t.Format(time.RFC3339) + `"`
		}
		return `"` + dateStr + `"`
	})

	mongoDateRegex := regexp.MustCompile(`{\s*"\$date"\s*:\s*"([^"]+)"\s*}`)
	input = mongoDateRegex.ReplaceAllString(input, `"$1"`)

	input = convertPythonDatetimes(input)
	input = quoteUnquotedISODates(input)
	input = quoteUnquotedEllipsis(input)
	input = convertStandaloneEllipsisToField(input)
	input = removeTrailingCommas(input)
	input = wrapMultipleRootsAsArray(input)

	return input
}

// pythonDatetimeRegex matches Python's datetime.datetime(y, m, d[, H[, M[, S[, microsecond]]]])
// constructor calls produced by `repr(datetime)` in PyMongo expected-output files.
// All but year, month, and day are optional; trailing args default to 0.
var pythonDatetimeRegex = regexp.MustCompile(
	`datetime\.datetime\(\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)` +
		`(?:\s*,\s*(\d+))?(?:\s*,\s*(\d+))?(?:\s*,\s*(\d+))?(?:\s*,\s*(\d+))?\s*\)`)

// convertPythonDatetimes rewrites Python datetime.datetime(...) literals as
// quoted RFC3339 UTC strings so the rest of the JSON parser sees them as plain
// date strings (matching how the kernel canonicalises every other date form).
func convertPythonDatetimes(input string) string {
	return pythonDatetimeRegex.ReplaceAllStringFunc(input, func(match string) string {
		m := pythonDatetimeRegex.FindStringSubmatch(match)
		year, _ := strconv.Atoi(m[1])
		month, _ := strconv.Atoi(m[2])
		day, _ := strconv.Atoi(m[3])
		hour := atoiOrZero(m[4])
		minute := atoiOrZero(m[5])
		second := atoiOrZero(m[6])
		return fmt.Sprintf(`"%04d-%02d-%02dT%02d:%02d:%02dZ"`, year, month, day, hour, minute, second)
	})
}

func atoiOrZero(s string) int {
	if s == "" {
		return 0
	}
	n, err := strconv.Atoi(s)
	if err != nil {
		return 0
	}
	return n
}

// isoDateValueRegex matches a bare ISO 8601 datetime that appears as a value
// position (after `:`, `,`, or `[` and optional whitespace) and is followed by
// a value terminator. Used by quoteUnquotedISODates to wrap bare datetime
// literals in quotes so JSON.Unmarshal can parse them as strings.
//
// The leading group requires `:`, `,`, or `[` before the datetime, so a bare
// ISO datetime at the very start of a line (e.g. a single-value expected file
// containing only `2024-01-01T00:00:00Z`) is not matched here. That case is
// handled downstream: parseDocuments falls back to NDJSON parsing per line,
// where the value-position heuristic in this regex does not apply.
var isoDateValueRegex = regexp.MustCompile(
	`([:,\[]\s*)(\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}(?:\.\d+)?Z?)(\s*[,}\]\n])`)

// quoteUnquotedISODates wraps bare ISO 8601 datetime literals in double
// quotes so they parse as JSON strings. Writers commonly include unquoted
// dates in JS-style expected files (e.g. `date: 2020-01-01T00:00:00.000Z`);
// the kernel canonicalises these to quoted strings so downstream comparison
// sees a normalised value.
func quoteUnquotedISODates(input string) string {
	return isoDateValueRegex.ReplaceAllString(input, `${1}"${2}"${3}`)
}

// wrapMultipleRootsAsArray detects expected content consisting of several
// pretty-printed top-level JSON values (objects or arrays) concatenated with
// whitespace between them and wraps them in a single `[...]` array with comma
// separators. Single-root content is returned unchanged. This lets writers
// list multiple expected documents using familiar pretty-printed object syntax
// without manually wrapping the file in `[]` and inserting commas.
func wrapMultipleRootsAsArray(input string) string {
	var roots []string
	var current strings.Builder
	stack := make([]byte, 0, 16)
	inString := false

	i := 0
	for i < len(input) {
		ch := input[i]
		current.WriteByte(ch)

		if inString {
			if ch == '\\' && i+1 < len(input) {
				current.WriteByte(input[i+1])
				i += 2
				continue
			}
			if ch == '"' {
				inString = false
			}
			i++
			continue
		}

		switch ch {
		case '"':
			inString = true
		case '{', '[':
			stack = append(stack, ch)
		case '}', ']':
			if len(stack) > 0 {
				stack = stack[:len(stack)-1]
			}
			if len(stack) == 0 {
				// Top-level value just closed; peek ahead for another root.
				j := i + 1
				for j < len(input) &&
					(input[j] == ' ' || input[j] == '\t' ||
						input[j] == '\n' || input[j] == '\r') {
					j++
				}
				// Only object/array roots trigger array wrapping. Multiple
				// top-level primitive values (e.g. bare numbers on separate
				// lines) are not wrapped here and fall through to NDJSON
				// parsing in parseDocuments.
				if j < len(input) && (input[j] == '{' || input[j] == '[') {
					roots = append(roots, current.String())
					current.Reset()
				}
			}
		}
		i++
	}

	if len(roots) == 0 {
		return input
	}
	if strings.TrimSpace(current.String()) != "" {
		roots = append(roots, current.String())
	}
	return "[" + strings.Join(roots, ",") + "]"
}

// convertStandaloneEllipsisToField converts standalone `"..."` on its own line
// to `"...": "..."` when the enclosing container is an object (or the top level),
// so it can be treated as an omitted-fields marker. Inside arrays, `"..."` is
// left as-is because it is already a valid array-element ellipsis.
func convertStandaloneEllipsisToField(input string) string {
	lines := strings.Split(input, "\n")

	// Stack tracks the innermost container: '{' for object, '[' for array.
	stack := make([]byte, 0, 16)

	for i, line := range lines {
		trimmed := strings.TrimSpace(line)

		// Accept both `"..."` and `"...",` (writers commonly leave a trailing
		// comma between sibling fields). The trailing comma stays in place so
		// the surrounding JSON object remains syntactically valid.
		if trimmed == `"..."` || trimmed == `"...",` {
			// Only convert when directly inside an object (or at top level).
			inArray := len(stack) > 0 && stack[len(stack)-1] == '['
			if !inArray {
				lines[i] = strings.Replace(line, `"..."`, `"...": "..."`, 1)
			}
			// "..." contains no brackets, so stack is unchanged.
			continue
		}

		// Update the container stack for any brackets on this line.
		scanBracketsInLine(line, &stack)
	}

	return strings.Join(lines, "\n")
}

// scanBracketsInLine updates the container stack by scanning a line for
// unquoted `{`, `[`, `}`, and `]` characters.
func scanBracketsInLine(line string, stack *[]byte) {
	i := 0
	for i < len(line) {
		ch := line[i]
		if ch == '"' {
			i++
			for i < len(line) {
				inner := line[i]
				if inner == '\\' && i+1 < len(line) {
					i += 2
					continue
				}
				if inner == '"' {
					i++
					break
				}
				i++
			}
		} else if ch == '{' || ch == '[' {
			*stack = append(*stack, ch)
			i++
		} else if ch == '}' || ch == ']' {
			if len(*stack) > 0 {
				*stack = (*stack)[:len(*stack)-1]
			}
			i++
		} else {
			i++
		}
	}
}

// copyQuotedRun copies a quoted-string run into result, honoring backslash
// escape sequences, and returns the index of the byte immediately after the
// closing quote (or len(input) if the string is unterminated). The byte at
// input[start] is taken as the quote character, so both double- and
// single-quoted runs are supported. It is shared by the string-aware
// preprocessing passes (stripLineComments, quoteUnquotedKeys,
// quoteUnquotedEllipsis, removeTrailingCommas, and the double-quoted branch of
// convertSingleQuotesToDouble) which all need to copy quoted content through
// untouched while applying their pass-specific rewrite to unquoted bytes.
func copyQuotedRun(input string, start int, result *strings.Builder) int {
	quote := input[start]
	result.WriteByte(quote)
	i := start + 1
	for i < len(input) {
		inner := input[i]
		result.WriteByte(inner)
		if inner == '\\' && i+1 < len(input) {
			i++
			result.WriteByte(input[i])
		} else if inner == quote {
			return i + 1
		}
		i++
	}
	return i
}

// removeTrailingCommas removes trailing commas before } and ] for valid JSON.
// Quoted strings are copied through unchanged so that values like ",}" or ",]"
// embedded in a string are not mangled.
func removeTrailingCommas(input string) string {
	var result strings.Builder
	result.Grow(len(input))
	i := 0
	for i < len(input) {
		ch := input[i]
		if ch == '"' {
			i = copyQuotedRun(input, i, &result)
			continue
		}
		if ch == ',' {
			// Peek past whitespace to see if the next non-ws byte closes a container.
			j := i + 1
			for j < len(input) && (input[j] == ' ' || input[j] == '\t' ||
				input[j] == '\n' || input[j] == '\r') {
				j++
			}
			if j < len(input) && (input[j] == '}' || input[j] == ']') {
				// Drop the comma; emit whitespace + closer on subsequent iterations.
				i++
				continue
			}
		}
		result.WriteByte(ch)
		i++
	}
	return result.String()
}

// convertSingleQuotesToDouble converts single-quoted strings to double-quoted
// strings for JSON compatibility, handling escape sequences and nested quotes.
func convertSingleQuotesToDouble(str string) string {
	var result strings.Builder
	i := 0
	for i < len(str) {
		char := str[i]
		if char == '\'' {
			result.WriteByte('"')
			i++
			for i < len(str) {
				inner := str[i]
				if inner == '\\' && i+1 < len(str) {
					result.WriteByte(inner)
					i++
					result.WriteByte(str[i])
					i++
				} else if inner == '\'' {
					result.WriteByte('"')
					i++
					break
				} else if inner == '"' {
					result.WriteString(`\"`)
					i++
				} else {
					result.WriteByte(inner)
					i++
				}
			}
		} else if char == '"' {
			i = copyQuotedRun(str, i, &result)
			continue
		} else {
			result.WriteByte(char)
			i++
		}
	}
	return result.String()
}

// stripLineComments removes // line comments that are not inside strings.
func stripLineComments(input string) string {
	var result strings.Builder
	i := 0
	for i < len(input) {
		ch := input[i]
		if ch == '"' {
			i = copyQuotedRun(input, i, &result)
			continue
		} else if ch == '/' && i+1 < len(input) && input[i+1] == '/' {
			// Skip to end of line
			for i < len(input) && input[i] != '\n' {
				i++
			}
		} else {
			result.WriteByte(ch)
			i++
		}
	}
	return result.String()
}

// quoteUnquotedKeys quotes bare identifier keys in JSON-like objects.
// It converts `{ name: "value" }` to `{ "name": "value" }`.
func quoteUnquotedKeys(input string) string {
	var result strings.Builder
	i := 0
	for i < len(input) {
		ch := input[i]
		if ch == '"' {
			i = copyQuotedRun(input, i, &result)
			continue
		} else if ch == '{' || ch == ',' {
			// After { or , we may have whitespace then an unquoted key
			result.WriteByte(ch)
			i++
			// Collect whitespace (including newlines)
			wsStart := i
			for i < len(input) && (input[i] == ' ' || input[i] == '\t' || input[i] == '\n' || input[i] == '\r') {
				i++
			}
			ws := input[wsStart:i]
			// Check if next token is an unquoted identifier followed by ':'
			if i < len(input) && isIdentStart(input[i]) {
				j := i
				for j < len(input) && isIdentChar(input[j]) {
					j++
				}
				// Skip whitespace between identifier and ':'
				k := j
				for k < len(input) && (input[k] == ' ' || input[k] == '\t') {
					k++
				}
				if k < len(input) && input[k] == ':' {
					// It's an unquoted key — quote it
					result.WriteString(ws)
					result.WriteByte('"')
					result.WriteString(input[i:j])
					result.WriteByte('"')
					i = j
					continue
				}
			}
			// Not an unquoted key — emit whitespace as-is
			result.WriteString(ws)
		} else {
			result.WriteByte(ch)
			i++
		}
	}
	return result.String()
}

func isIdentStart(ch byte) bool {
	return (ch >= 'a' && ch <= 'z') || (ch >= 'A' && ch <= 'Z') || ch == '_' || ch == '$'
}

func isIdentChar(ch byte) bool {
	return isIdentStart(ch) || (ch >= '0' && ch <= '9')
}

// quoteUnquotedEllipsis quotes unquoted ellipsis (...) appearing as property
// values or array elements, while leaving ellipsis inside quoted strings intact.
func quoteUnquotedEllipsis(str string) string {
	var result strings.Builder
	i := 0
	for i < len(str) {
		char := str[i]
		if char == '"' || char == '\'' {
			i = copyQuotedRun(str, i, &result)
			continue
		} else if char == '.' && i+2 < len(str) && str[i:i+3] == "..." {
			after := ""
			if i+3 < len(str) {
				after = str[i+3:]
			}
			followedByDelim := len(after) == 0 ||
				after[0] == ' ' || after[0] == '\t' ||
				after[0] == '\n' || after[0] == '\r' ||
				after[0] == ',' || after[0] == '}' || after[0] == ']'
			if followedByDelim {
				result.WriteString(`"..."`)
				i += 3
			} else {
				result.WriteByte(char)
				i++
			}
		} else {
			result.WriteByte(char)
			i++
		}
	}
	return result.String()
}

// normalizeValue recursively normalizes a JSON-deserialized value.
// All numbers are float64 (as Go's json package produces). ISO date strings
// are normalized to RFC3339 UTC format. Extended JSON wrappers produced by
// language bridges (e.g. {"$date":"..."}, {"$oid":"..."}) are collapsed to
// their plain-value equivalents so that the actual content is treated the
// same way as the expected content after preprocessMongoSyntax runs.
func normalizeValue(value interface{}) interface{} {
	if value == nil {
		return nil
	}
	switch v := value.(type) {
	case map[string]interface{}:
		// Collapse single-key Extended JSON wrappers that the language bridges emit.
		// This mirrors what preprocessMongoSyntax does for the expected content so
		// that both sides of the comparison end up in the same canonical form.
		if len(v) == 1 {
			if dateStr, ok := v["$date"].(string); ok {
				return normalizeStringValue(dateStr)
			}
			if oidStr, ok := v["$oid"].(string); ok {
				return oidStr
			}
			// Decimal128 is preserved as a string because float64 can't represent
			// it without loss of precision. Writers typically put expected
			// Decimal128 values as quoted strings in the expected file.
			if decStr, ok := v["$numberDecimal"].(string); ok {
				return decStr
			}
			// $numberLong / $numberInt arrive as stringified integers from the
			// language bridges. Parse them as integers so values that fit in
			// float64 precision compare equal to plain JSON numbers in the
			// expected file (mirroring what normalizePrimitive does for all
			// numerics). For BSON Long values that don't fit in float64
			// without precision loss (|n| > 2^53), or for inputs that don't
			// parse, keep the string form so comparisons against an
			// equally-stringified expected value still succeed.
			const float64IntPrecision = 1 << 53
			if longStr, ok := v["$numberLong"].(string); ok {
				if n, err := strconv.ParseInt(longStr, 10, 64); err == nil {
					if n >= -float64IntPrecision && n <= float64IntPrecision {
						return float64(n)
					}
				}
				return longStr
			}
			if intStr, ok := v["$numberInt"].(string); ok {
				if n, err := strconv.ParseInt(intStr, 10, 32); err == nil {
					return float64(n)
				}
				return intStr
			}
		}
		normalized := make(map[string]interface{}, len(v))
		for k, val := range v {
			normalized[k] = normalizeValue(val)
		}
		return normalized
	case []interface{}:
		normalized := make([]interface{}, len(v))
		for i, item := range v {
			normalized[i] = normalizeValue(item)
		}
		return normalized
	case string:
		return normalizeStringValue(v)
	default:
		return v
	}
}

// normalizeStringValue normalizes ISO date strings to a canonical RFC3339 UTC
// format; all other strings are returned unchanged.
// RFC3339Nano is tried first so that strings with fractional seconds (e.g.
// "2023-01-01T00:00:00.000Z" produced by the C# ValueNormalizer) are parsed
// correctly before falling back to the second-precision RFC3339 layout.
func normalizeStringValue(s string) string {
	if len(s) >= 19 && s[4] == '-' && s[7] == '-' && s[10] == 'T' {
		if t, err := time.Parse(time.RFC3339Nano, s); err == nil {
			return t.UTC().Format(time.RFC3339)
		}
		if t, err := time.Parse(time.RFC3339, s); err == nil {
			return t.UTC().Format(time.RFC3339)
		}
		// Timezone-less ISO datetimes (e.g. Python's datetime.isoformat()
		// output without tzinfo) are assumed to be UTC so that they round-trip
		// against expected values written with an explicit "Z".
		for _, layout := range []string{
			"2006-01-02T15:04:05.999999999",
			"2006-01-02T15:04:05",
		} {
			if t, err := time.Parse(layout, s); err == nil {
				return t.UTC().Format(time.RFC3339)
			}
		}
	}
	return s
}

// normalizePrimitive normalizes a primitive value for comparison.
// ISO date strings are brought to a canonical UTC form; numeric types are
// all converted to float64 for consistent equality checks.
func normalizePrimitive(value interface{}) interface{} {
	switch v := value.(type) {
	case string:
		return normalizeStringValue(v)
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
	default:
		return v
	}
}
