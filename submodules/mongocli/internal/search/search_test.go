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

package search

import (
	"testing"

	"github.com/mongodb/mongocli/internal/test/fixture"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

func TestStringInSlice(t *testing.T) {
	s := []string{"a", "b", "c"}
	t.Run("value exists", func(t *testing.T) {
		if !StringInSlice(s, "b") {
			t.Error("StringInSlice() should find the value")
		}
	})

	t.Run("value not exists", func(t *testing.T) {
		if StringInSlice(s, "d") {
			t.Error("StringInSlice() should not find the value")
		}
	})
}

func TestClusterExists(t *testing.T) {
	t.Run("replica set exists", func(t *testing.T) {
		if !ClusterExists(fixture.AutomationConfig(), "myReplicaSet") {
			t.Error("ClusterExists() should find the value")
		}
	})

	t.Run("sharded cluster exists", func(t *testing.T) {
		if !ClusterExists(fixture.AutomationConfigWithOneShardedCluster("myCluster", false), "myCluster") {
			t.Error("ClusterExists() should find the value")
		}
	})

	t.Run("value not exists", func(t *testing.T) {
		if ClusterExists(fixture.AutomationConfig(), "X") {
			t.Error("ClusterExists() should not find the value")
		}
	})
}

func TestAtlasClusterExists(t *testing.T) {
	tests := []struct {
		name          string
		inputName     string
		inputClusters []atlas.Cluster
		want          bool
	}{
		{
			name:      "empty name",
			inputName: "",
			inputClusters: []atlas.Cluster{
				{
					Name: "test",
				},
			},
			want: false,
		},
		{
			name:          "empty cluster list",
			inputName:     "test",
			inputClusters: []atlas.Cluster{},
			want:          false,
		},
		{
			name:      "name not found",
			inputName: "test2",
			inputClusters: []atlas.Cluster{
				{
					Name: "test",
				},
			},
			want: false,
		},
		{
			name:      "name found",
			inputName: "test2",
			inputClusters: []atlas.Cluster{
				{
					Name: "test2",
				},
			},
			want: false,
		},
		{
			name:      "name found with multiple clusters",
			inputName: "test2",
			inputClusters: []atlas.Cluster{
				{
					Name: "test",
				},
				{
					Name: "test2",
				},
			},
			want: false,
		},
	}

	for _, test := range tests {
		out := AtlasClusterExists(test.inputClusters, test.name)
		if out != test.want {
			t.Errorf("AtlasClusterExists() got = %v, want %v", out, test.want)
		}
	}
}

func TestDefaultRegion(t *testing.T) {
	tests := []struct {
		input []*atlas.AvailableRegion
		want  int
	}{
		{
			input: []*atlas.AvailableRegion{},
			want:  -1,
		},
		{
			input: []*atlas.AvailableRegion{
				{
					Name:    "test",
					Default: false,
				},
			},
			want: -1,
		},
		{
			input: []*atlas.AvailableRegion{
				{
					Name:    "test",
					Default: true,
				},
			},
			want: 0,
		},
		{
			input: []*atlas.AvailableRegion{
				{
					Name:    "test",
					Default: false,
				},
				{
					Name:    "test2",
					Default: true,
				},
				{
					Name:    "test1",
					Default: false,
				},
			},
			want: 1,
		},
		{
			input: []*atlas.AvailableRegion{
				{
					Name:    "test",
					Default: false,
				},
				{
					Name:    "test2",
					Default: false,
				},
				{
					Name:    "test1",
					Default: false,
				},
			},
			want: -1,
		},
	}

	for _, test := range tests {
		out := DefaultRegion(test.input)
		if out != test.want {
			t.Errorf("DefaultRegion() got = %v, want %v", out, test.want)
		}
	}
}
