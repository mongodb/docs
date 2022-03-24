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

package convert

import "testing"

func TestRSConfig_protocolVer(t *testing.T) {
	testCases := map[string]struct {
		config                *RSConfig
		wantedProtocolVersion string
		wantErr               bool
	}{
		"empty fcv": {
			config:                &RSConfig{},
			wantedProtocolVersion: "",
			wantErr:               true,
		},
		"post 4.0": {
			config:                &RSConfig{FeatureCompatibilityVersion: "4.0"},
			wantedProtocolVersion: "1",
			wantErr:               false,
		},
		"pre 4.0": {
			config:                &RSConfig{FeatureCompatibilityVersion: "3.6"},
			wantedProtocolVersion: "0",
			wantErr:               false,
		},
		"empty at parent but with FC in process": {
			config: &RSConfig{
				Processes: []*ProcessConfig{
					{
						FeatureCompatibilityVersion: "4.0",
					},
				},
			},
			wantedProtocolVersion: "1",
			wantErr:               false,
		},
	}
	for name, tc := range testCases {
		m := tc.config
		expected := tc.wantedProtocolVersion
		wantErr := tc.wantErr
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			ver, err := m.protocolVer()
			if (err != nil) != wantErr {
				t.Fatalf("protocolVer() unexpected error: %v\n", err)
			}
			if ver != expected {
				t.Errorf("protocolVer() expected: %s but got: %s", expected, ver)
			}
		})
	}
}
