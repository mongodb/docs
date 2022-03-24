// Copyright 2022 MongoDB Inc
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
	"testing"
)

func TestMetricsOpts_ValidatePeriodStartEnd(t *testing.T) {
	tests := []struct {
		name    string
		period  string
		start   string
		end     string
		wantErr bool
	}{
		{
			name:    "period only",
			period:  "PT1H",
			start:   "",
			end:     "",
			wantErr: false,
		},
		{
			name:    "start and end",
			period:  "",
			start:   "2022-01-01T00:00:00Z",
			end:     "2022-01-18T21:05:00Z",
			wantErr: false,
		},
		{
			name:    "no period, start or end",
			period:  "",
			start:   "",
			end:     "",
			wantErr: true,
		},
		{
			name:    "all of period, start and end",
			period:  "PT1H",
			start:   "2022-01-01T00:00:00Z",
			end:     "2022-01-18T21:05:00Z",
			wantErr: true,
		},
		{
			name:    "period with start",
			period:  "PT1H",
			start:   "2022-01-01T00:00:00Z",
			end:     "",
			wantErr: true,
		},
		{
			name:    "start with no end",
			period:  "",
			start:   "2022-01-01T00:00:00Z",
			end:     "",
			wantErr: true,
		},
	}
	for _, tt := range tests {
		period := tt.period
		start := tt.start
		end := tt.end
		wantErr := tt.wantErr
		t.Run(tt.name, func(t *testing.T) {
			opts := &MetricsOpts{
				Period: period,
				Start:  start,
				End:    end,
			}
			if err := opts.ValidatePeriodStartEnd(); (err != nil) != wantErr {
				t.Errorf("ValidatePeriodStartEnd() error = %v, wantErr %v", err, wantErr)
			}
		})
	}
}

func TestGetHostNameAndPort(t *testing.T) {
	tests := []struct {
		name      string
		input     string
		wantError bool
		wantHost  string
		wantPort  int
	}{
		{
			name:      "valid parameter",
			input:     "test:2000",
			wantHost:  "test",
			wantPort:  2000,
			wantError: false,
		},
		{
			name:      "incomplete format - host",
			input:     "test",
			wantError: true,
		},
		{
			name:      "incomplete format - port number",
			input:     ":test",
			wantError: true,
		},
	}
	for _, tt := range tests {
		wantError := tt.wantError
		input := tt.input
		wantHost := tt.wantHost
		wantPort := tt.wantPort
		t.Run(tt.name, func(t *testing.T) {
			host, port, err := GetHostnameAndPort(input)
			if (err != nil) != wantError {
				t.Errorf("GetHostnameAndPort() error = %v, wantErr %v", err, wantError)
			}

			if !wantError {
				if host != wantHost {
					t.Errorf("Expected '%s', got '%s'", wantHost, host)
				}

				if port != wantPort {
					t.Errorf("Expected '%d', got '%d'", wantPort, port)
				}
			}
		})
	}
}
