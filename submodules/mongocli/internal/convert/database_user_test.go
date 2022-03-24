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

//go:build unit
// +build unit

package convert

import (
	"testing"

	"github.com/go-test/deep"
	"go.mongodb.org/atlas/mongodbatlas"
	"go.mongodb.org/ops-manager/opsmngr"
)

func TestBuildAtlasRoles(t *testing.T) {
	type test struct {
		input []string
		want  []mongodbatlas.Role
	}

	tests := []test{
		{
			input: []string{"admin"},
			want: []mongodbatlas.Role{
				{
					RoleName:     "admin",
					DatabaseName: "admin",
				},
			},
		},
		{
			input: []string{"admin@test"},
			want: []mongodbatlas.Role{
				{
					RoleName:     "admin",
					DatabaseName: "test",
				},
			},
		},
		{
			input: []string{"admin@test", "something"},
			want: []mongodbatlas.Role{
				{
					RoleName:     "admin",
					DatabaseName: "test",
				},
				{
					RoleName:     "something",
					DatabaseName: "admin",
				},
			},
		},
		{
			input: []string{"admin@db.collection"},
			want: []mongodbatlas.Role{
				{
					RoleName:       "admin",
					DatabaseName:   "db",
					CollectionName: "collection",
				},
			},
		},
		{
			input: []string{"admin@db.collection.name"},
			want: []mongodbatlas.Role{
				{
					RoleName:       "admin",
					DatabaseName:   "db",
					CollectionName: "collection.name",
				},
			},
		},
	}

	for _, tc := range tests {
		input := tc.input
		want := tc.want
		t.Run("", func(t *testing.T) {
			t.Parallel()
			got := BuildAtlasRoles(input)
			if err := deep.Equal(want, got); err != nil {
				t.Fatalf("expected: %v, got: %v", want, got)
			}
		})
	}
}

func TestBuildOMRoles(t *testing.T) {
	type test struct {
		input []string
		want  []*opsmngr.Role
	}

	tests := []test{
		{
			input: []string{"admin"},
			want: []*opsmngr.Role{
				{
					Role:     "admin",
					Database: "admin",
				},
			},
		},
		{
			input: []string{"admin@test"},
			want: []*opsmngr.Role{
				{
					Role:     "admin",
					Database: "test",
				},
			},
		},
		{
			input: []string{"admin@test", "something"},
			want: []*opsmngr.Role{
				{
					Role:     "admin",
					Database: "test",
				},
				{
					Role:     "something",
					Database: "admin",
				},
			},
		},
	}

	for _, tc := range tests {
		input := tc.input
		want := tc.want
		t.Run("", func(t *testing.T) {
			t.Parallel()
			got := BuildOMRoles(input)
			if err := deep.Equal(want, got); err != nil {
				t.Fatalf("expected: %v, got: %v", want, got)
			}
		})
	}
}

func TestBuildAtlasScopes(t *testing.T) {
	type test struct {
		name  string
		input []string
		want  []mongodbatlas.Scope
	}

	tests := []test{
		{
			name:  "default to cluster",
			input: []string{"clusterName"},
			want: []mongodbatlas.Scope{
				{
					Name: "clusterName",
					Type: "CLUSTER",
				},
			},
		},
		{
			name:  "with cluster type",
			input: []string{"clusterName:CLUSTER"},
			want: []mongodbatlas.Scope{
				{
					Name: "clusterName",
					Type: "CLUSTER",
				},
			},
		},
		{
			name:  "default to cluster and a DATA_LAKE",
			input: []string{"clusterName", "name:DATA_LAKE"},
			want: []mongodbatlas.Scope{
				{
					Name: "clusterName",
					Type: "CLUSTER",
				},
				{
					Name: "name",
					Type: "DATA_LAKE",
				},
			},
		},
		{
			name:  "data lake",
			input: []string{"name:DATA_LAKE"},
			want: []mongodbatlas.Scope{
				{
					Name: "name",
					Type: "DATA_LAKE",
				},
			},
		},
	}

	for _, tc := range tests {
		input := tc.input
		want := tc.want
		name := tc.name
		t.Run(name, func(t *testing.T) {
			t.Parallel()
			got := BuildAtlasScopes(input)
			if err := deep.Equal(want, got); err != nil {
				t.Fatalf("expected: %v, got: %v", want, got)
			}
		})
	}
}
