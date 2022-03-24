// Copyright 2020 MongoDB Inc
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//      http://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

//go:build unit
// +build unit

package cli

import (
	"io"
	"testing"
)

func TestOutputOpts_outputTypeAndValue(t *testing.T) {
	type fields struct {
		Template  string
		OutWriter io.Writer
		Output    string
	}
	tests := []struct {
		name   string
		fields fields
		want   string
	}{
		{
			name:   "go-template",
			fields: fields{Output: "go-template=test", Template: ""},
			want:   "test",
		},
		{
			name:   "not-valid",
			fields: fields{Output: "not-valid", Template: "default"},
			want:   "default",
		},
		{
			name:   "json-path",
			fields: fields{Output: "json-path=$.[0].id", Template: ""},
			want:   "$.[0].id",
		},
	}
	for _, tt := range tests {
		opts := &OutputOpts{
			Template:  tt.fields.Template,
			OutWriter: tt.fields.OutWriter,
			Output:    tt.fields.Output,
		}
		want := tt.want
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			_, got := opts.outputTypeAndValue()
			if got != want {
				t.Errorf("parseTemplate() got = %v, want %v", got, want)
			}
		})
	}
}
