package compare

import (
	"os"
	"reflect"
	"testing"
)

func TestReadExpectedOutput(t *testing.T) {
	tests := []struct {
		name    string
		content string
		want    []interface{}
	}{
		{
			name: "pretty_printed_single_object",
			content: `{
    "_id": "...",
    "title": "Back to the Future"
}`,
			want: []interface{}{
				map[string]interface{}{
					"_id":   "...",
					"title": "Back to the Future",
				},
			},
		},
		{
			name:    "ndjson_compact_single_line",
			content: `{"_id":"...","message":"stub","timestamp":"2023-01-01T00:00:00Z"}`,
			want: []interface{}{
				map[string]interface{}{
					"_id":       "...",
					"message":   "stub",
					"timestamp": "2023-01-01T00:00:00Z",
				},
			},
		},
		{
			name:    "ndjson_two_compact_documents",
			content: "{\"a\":1}\n{\"b\":2}\n",
			want: []interface{}{
				map[string]interface{}{"a": float64(1)},
				map[string]interface{}{"b": float64(2)},
			},
		},
		{
			name:    "json_array_root",
			content: `[{"x":1},{"x":2}]`,
			want: []interface{}{
				map[string]interface{}{"x": float64(1)},
				map[string]interface{}{"x": float64(2)},
			},
		},
		{
			name: "pretty_printed_with_global_ellipsis_line",
			content: `{
    "ok": 1
}
...
`,
			want: []interface{}{
				map[string]interface{}{
					"ok":  float64(1),
					"...": "...",
				},
			},
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			tmp := writeTempExpectedFile(t, tt.content)
			got, err := readExpectedOutput(tmp)
			if err != nil {
				t.Fatalf("readExpectedOutput: %v", err)
			}
			if !reflect.DeepEqual(got, tt.want) {
				t.Fatalf("parsed documents mismatch\ngot:  %#v\nwant: %#v", got, tt.want)
			}
		})
	}
}

func writeTempExpectedFile(t *testing.T, content string) string {
	t.Helper()
	f, err := os.CreateTemp(t.TempDir(), "expected-*.txt")
	if err != nil {
		t.Fatal(err)
	}
	t.Cleanup(func() { _ = f.Close() })
	if _, err := f.WriteString(content); err != nil {
		t.Fatal(err)
	}
	if err := f.Close(); err != nil {
		t.Fatal(err)
	}
	return f.Name()
}
