//go:build unit
// +build unit

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
package mongocli

import (
	"testing"
)

func TestBuilder(t *testing.T) {
	type args struct {
		argsWithoutProg []string
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		{
			name: "atlas",
			want: 9,
			args: args{
				argsWithoutProg: []string{"atlas"},
			},
		},
		{
			name: "ops-manager",
			want: 8,
			args: args{
				argsWithoutProg: []string{"ops-manager"},
			},
		},
		{
			name: "cloud-manager",
			want: 8,
			args: args{
				argsWithoutProg: []string{"cloud-manager"},
			},
		},
		{
			name: "ops-manager alias",
			want: 8,
			args: args{
				argsWithoutProg: []string{"om"},
			},
		},
		{
			name: "cloud-manager alias",
			want: 8,
			args: args{
				argsWithoutProg: []string{"cm"},
			},
		},
		{
			name: "iam",
			want: 8,
			args: args{
				argsWithoutProg: []string{"iam"},
			},
		},
		{
			name: "empty",
			want: 9,
			args: args{
				argsWithoutProg: []string{},
			},
		},
		{
			name: "autocomplete",
			want: 9,
			args: args{
				argsWithoutProg: []string{"__complete"},
			},
		},
		{
			name: "completion",
			want: 9,
			args: args{
				argsWithoutProg: []string{"completion"},
			},
		},
		{
			name: "--version",
			want: 9,
			args: args{
				argsWithoutProg: []string{"completion"},
			},
		},
	}
	var profile string
	for _, tt := range tests {
		name := tt.name
		args := tt.args
		want := tt.want
		t.Run(name, func(t *testing.T) {
			got := Builder(&profile, args.argsWithoutProg)
			if len(got.Commands()) != want {
				t.Fatalf("got=%d, want=%d", len(got.Commands()), want)
			}
		})
	}
}
