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
	"errors"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestGlobalOpts_ValidateProjectID(t *testing.T) {
	tests := []struct {
		name      string
		projectID string
		wantErr   bool
	}{
		{
			name:      "empty project ID",
			projectID: "",
			wantErr:   true,
		},
		{
			name:      "invalid project ID",
			projectID: "1",
			wantErr:   true,
		},
		{
			name:      "valid project ID",
			projectID: "5e98249d937cfc52efdc2a9f",
			wantErr:   false,
		},
	}
	for _, tt := range tests {
		projectID := tt.projectID
		wantErr := tt.wantErr
		t.Run(tt.name, func(t *testing.T) {
			opts := &GlobalOpts{
				ProjectID: projectID,
			}
			if err := opts.ValidateProjectID(); (err != nil) != wantErr {
				t.Errorf("ValidateProjectID() error = %v, wantErr %v", err, wantErr)
			}
		})
	}
}

func TestGlobalOpts_ValidateOrgID(t *testing.T) {
	t.Run("empty org ID", func(t *testing.T) {
		o := &GlobalOpts{}
		if err := o.ValidateOrgID(); !errors.Is(err, ErrMissingOrgID) {
			t.Errorf("Expected err: %#v, got: %#v\n", ErrMissingOrgID, err)
		}
	})
	t.Run("invalid org ID", func(t *testing.T) {
		o := &GlobalOpts{OrgID: "1"}
		if err := o.ValidateOrgID(); err == nil {
			t.Errorf("Expected an error\n")
		}
	})
	t.Run("valid org ID", func(t *testing.T) {
		o := &GlobalOpts{OrgID: "5e98249d937cfc52efdc2a9f"}
		if err := o.ValidateOrgID(); err != nil {
			t.Fatalf("PreRunE() unexpected error %v\n", err)
		}
	})
}

func TestGlobalOpts_PreRunE(t *testing.T) {
	t.Run("no error", func(t *testing.T) {
		noErrorFunc := func() error {
			return nil
		}

		o := &GlobalOpts{}
		if err := o.PreRunE(noErrorFunc); err != nil {
			t.Errorf("Expected err == nil")
		}
	})

	t.Run("error", func(t *testing.T) {
		errorFunc := func() error {
			return errors.New("error")
		}

		o := &GlobalOpts{}
		if err := o.PreRunE(errorFunc); err == nil {
			t.Errorf("Expected err != nil")
		}
	})
}

func TestGenerateAliases(t *testing.T) {
	type args struct {
		use   string
		extra []string
	}
	tests := []struct {
		name string
		args args
		want []string
	}{
		{
			name: "single word",
			args: args{use: "words"},
			want: []string{"word"},
		},
		{
			name: "camel case",
			args: args{use: "camelCases"},
			want: []string{"camelcases", "camel-cases", "camelCase", "camelcase", "camel-case"},
		},
		{
			name: "camel case with extra",
			args: args{use: "camelCases", extra: []string{"extra"}},
			want: []string{"camelcases", "camel-cases", "camelCase", "camelcase", "camel-case", "extra"},
		},
	}
	for _, tt := range tests {
		want := tt.want
		args := tt.args
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			got := GenerateAliases(args.use, args.extra...)
			assert.Equal(t, got, want)
		})
	}
}
