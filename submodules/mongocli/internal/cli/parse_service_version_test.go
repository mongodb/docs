// Copyright 2021 MongoDB Inc
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

package cli

import (
	"testing"

	"go.mongodb.org/atlas/mongodbatlas"
)

func TestParseServiceVersion(t *testing.T) {
	tests := []struct {
		name           string
		serviceVersion *mongodbatlas.ServiceVersion
		expected       string
		wantErr        bool
	}{
		{
			name:           "OM 5.0",
			serviceVersion: &mongodbatlas.ServiceVersion{Version: "5.0.0.100.20210101T0000Z"},
			expected:       "5.0.0",
			wantErr:        false,
		},
		{
			name:           "OM 5.0-rc1",
			serviceVersion: &mongodbatlas.ServiceVersion{Version: "5.0.0-rc1.100.20210101T0000Z"},
			expected:       "5.0.0",
			wantErr:        false,
		},
		{
			name:           "OM 5.0.1",
			serviceVersion: &mongodbatlas.ServiceVersion{Version: "5.0.1.100.20210101T0000Z"},
			expected:       "5.0.0",
			wantErr:        false,
		},
		{
			name:           "master",
			serviceVersion: &mongodbatlas.ServiceVersion{Version: "master"},
			expected:       "",
			wantErr:        true,
		},
		{
			name:           "v20210101",
			serviceVersion: &mongodbatlas.ServiceVersion{Version: "v20210101"},
			expected:       "20210101.0.0",
			wantErr:        false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			r, err := ParseServiceVersion(tt.serviceVersion)
			if tt.wantErr {
				if err == nil {
					t.Fatalf("Run() expected error to be returned")
				}
				return
			}

			if err != nil {
				t.Fatalf("ParseServiceVersion() unexpected error: %v", err)
			}
			if r.String() != tt.expected {
				t.Fatalf("ParseServiceVersion() expected: %v got: %v", tt.expected, r.String())
			}
		})
	}
}
