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

package clusters

import (
	"testing"

	"github.com/go-test/deep"
	"github.com/mongodb/mongocli/internal/test"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		Builder(),
		14,
		[]string{},
	)
}

func TestAddLabel(t *testing.T) {
	type args struct {
		out   *mongodbatlas.AdvancedCluster
		label mongodbatlas.Label
	}
	tests := []struct {
		name     string
		args     args
		wantsAdd bool
	}{
		{
			name: "adds",
			args: args{
				out: &mongodbatlas.AdvancedCluster{
					Labels: []mongodbatlas.Label{},
				},
				label: mongodbatlas.Label{Key: "test", Value: "test"},
			},
			wantsAdd: true,
		},
		{
			name: "doesn't adds",
			args: args{
				out: &mongodbatlas.AdvancedCluster{
					Labels: []mongodbatlas.Label{{Key: "test", Value: "test"}},
				},
				label: mongodbatlas.Label{Key: "test", Value: "test"},
			},
			wantsAdd: true,
		},
	}
	for _, tt := range tests {
		name := tt.name
		args := tt.args
		wantsAdd := tt.wantsAdd
		t.Run(name, func(t *testing.T) {
			AddLabel(args.out, args.label)
			if exists := LabelExists(args.out.Labels, args.label); exists != wantsAdd {
				t.Errorf("wants to add %v, got %v\n", wantsAdd, exists)
			}
		})
	}
}

func TestLabelExists(t *testing.T) {
	type args struct {
		labels []mongodbatlas.Label
		l      mongodbatlas.Label
	}
	tests := []struct {
		name string
		args args
		want bool
	}{
		{
			name: "label doesn't exist",
			args: args{
				labels: []mongodbatlas.Label{},
				l: mongodbatlas.Label{
					Key:   "test",
					Value: "test",
				},
			},
			want: false,
		},
		{
			name: "label exist",
			args: args{
				labels: []mongodbatlas.Label{
					{
						Key:   "test",
						Value: "test",
					},
				},
				l: mongodbatlas.Label{
					Key:   "test",
					Value: "test",
				},
			},
			want: true,
		},
	}
	for _, tt := range tests {
		name := tt.name
		args := tt.args
		want := tt.want
		t.Run(name, func(t *testing.T) {
			if got := LabelExists(args.labels, args.l); got != want {
				t.Errorf("LabelExists() = %v, want %v", got, want)
			}
		})
	}
}

func TestRemoveReadOnlyAttributes(t *testing.T) {
	tests := []struct {
		name string
		args *mongodbatlas.AdvancedCluster
		want *mongodbatlas.AdvancedCluster
	}{
		{
			name: "One AdvancedReplicationSpec",
			args: &mongodbatlas.AdvancedCluster{
				ID:             "Test",
				MongoDBVersion: "test",
				StateName:      "test",
				ReplicationSpecs: []*mongodbatlas.AdvancedReplicationSpec{
					{
						ID:        "22",
						NumShards: 2,
						ZoneName:  "1",
					},
				},
				CreateDate: "test",
			},
			want: &mongodbatlas.AdvancedCluster{
				ReplicationSpecs: []*mongodbatlas.AdvancedReplicationSpec{
					{
						NumShards: 2,
						ZoneName:  "1",
					},
				},
			},
		},
		{
			name: "More AdvancedReplicationSpecs",
			args: &mongodbatlas.AdvancedCluster{
				ID:             "Test",
				MongoDBVersion: "test",
				StateName:      "test",
				ReplicationSpecs: []*mongodbatlas.AdvancedReplicationSpec{
					{
						ID:        "22",
						NumShards: 2,
						ZoneName:  "1",
					},
					{
						ID:        "22",
						NumShards: 2,
						ZoneName:  "1",
					},
					{
						ID:        "22",
						NumShards: 2,
						ZoneName:  "1",
					},
				},
				CreateDate: "test",
			},
			want: &mongodbatlas.AdvancedCluster{
				ReplicationSpecs: []*mongodbatlas.AdvancedReplicationSpec{
					{
						NumShards: 2,
						ZoneName:  "1",
					},
					{
						NumShards: 2,
						ZoneName:  "1",
					},
					{
						NumShards: 2,
						ZoneName:  "1",
					},
				},
			},
		},
		{
			name: "Nothing to remove",
			args: &mongodbatlas.AdvancedCluster{
				ReplicationSpecs: []*mongodbatlas.AdvancedReplicationSpec{
					{
						NumShards: 2,
						ZoneName:  "1",
					},
					{
						NumShards: 2,
						ZoneName:  "1",
					},
					{
						NumShards: 2,
						ZoneName:  "1",
					},
				},
			},
			want: &mongodbatlas.AdvancedCluster{
				ReplicationSpecs: []*mongodbatlas.AdvancedReplicationSpec{
					{
						NumShards: 2,
						ZoneName:  "1",
					},
					{
						NumShards: 2,
						ZoneName:  "1",
					},
					{
						NumShards: 2,
						ZoneName:  "1",
					},
				},
			},
		},
	}
	for _, tt := range tests {
		name := tt.name
		arg := tt.args
		want := tt.want
		t.Run(name, func(t *testing.T) {
			RemoveReadOnlyAttributes(arg)
			if diff := deep.Equal(arg, want); diff != nil {
				t.Error(diff)
			}
		})
	}
}
