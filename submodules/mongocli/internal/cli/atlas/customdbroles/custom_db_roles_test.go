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

package customdbroles

import (
	"testing"

	"github.com/mongodb/mongocli/internal/test"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		Builder(),
		5,
		[]string{},
	)
}

func Test_appendActions(t *testing.T) {
	type args struct {
		existingActions []mongodbatlas.Action
		newActions      []mongodbatlas.Action
	}

	test1 := "test1"
	test2 := "test2"

	tests := []struct {
		name string
		args args
		want []mongodbatlas.Action
	}{
		{
			name: "empty",
			args: args{
				existingActions: []mongodbatlas.Action{},
				newActions:      []mongodbatlas.Action{},
			},
			want: []mongodbatlas.Action{},
		},
		{
			name: "no new actions",
			args: args{
				existingActions: []mongodbatlas.Action{
					{
						Action: "TEST",
						Resources: []mongodbatlas.Resource{
							{
								Collection: &test1,
								DB:         &test1,
							},
						},
					},
				},
				newActions: []mongodbatlas.Action{},
			},
			want: []mongodbatlas.Action{
				{
					Action: "TEST",
					Resources: []mongodbatlas.Resource{
						{
							Collection: &test1,
							DB:         &test1,
						},
					},
				},
			},
		},
		{
			name: "different actions",
			args: args{
				existingActions: []mongodbatlas.Action{
					{
						Action: "TEST",
						Resources: []mongodbatlas.Resource{
							{
								Collection: &test1,
								DB:         &test1,
							},
						},
					},
				},
				newActions: []mongodbatlas.Action{
					{
						Action: "NEW",
						Resources: []mongodbatlas.Resource{
							{
								Collection: &test1,
								DB:         &test1,
							},
						},
					},
				},
			},
			want: []mongodbatlas.Action{
				{
					Action: "TEST",
					Resources: []mongodbatlas.Resource{
						{
							Collection: &test1,
							DB:         &test1,
						},
					},
				},
				{
					Action: "NEW",
					Resources: []mongodbatlas.Resource{
						{
							Collection: &test1,
							DB:         &test1,
						},
					},
				},
			},
		},
		{
			name: "merge",
			args: args{
				existingActions: []mongodbatlas.Action{
					{
						Action: "TEST",
						Resources: []mongodbatlas.Resource{
							{
								Collection: &test1,
								DB:         &test2,
							},
						},
					},
				},
				newActions: []mongodbatlas.Action{
					{
						Action: "TEST",
						Resources: []mongodbatlas.Resource{
							{
								Collection: &test1,
								DB:         &test1,
							},
						},
					},
				},
			},
			want: []mongodbatlas.Action{
				{
					Action: "TEST",
					Resources: []mongodbatlas.Resource{
						{
							Collection: &test1,
							DB:         &test1,
						},
						{
							Collection: &test1,
							DB:         &test2,
						},
					},
				},
			},
		},
	}
	for _, tt := range tests {
		args := tt.args
		want := tt.want
		t.Run(tt.name, func(t *testing.T) {
			got := appendActions(args.existingActions, args.newActions)
			assert.ElementsMatch(t, got, want)
		})
	}
}

func Test_joinActions(t *testing.T) {
	type args struct {
		newActions []mongodbatlas.Action
	}

	test3 := "test3"
	test4 := "test4"

	tests := []struct {
		name string
		args args
		want []mongodbatlas.Action
	}{
		{
			name: "empty",
			args: args{
				newActions: []mongodbatlas.Action{},
			},
			want: []mongodbatlas.Action{},
		},
		{
			name: "no duplicate",
			args: args{
				newActions: []mongodbatlas.Action{
					{
						Action: "TEST",
						Resources: []mongodbatlas.Resource{
							{
								Collection: &test3,
								DB:         &test3,
							},
						},
					},
					{
						Action: "TEST2",
						Resources: []mongodbatlas.Resource{
							{
								Collection: &test3,
								DB:         &test3,
							},
						},
					},
				},
			},
			want: []mongodbatlas.Action{
				{
					Action: "TEST",
					Resources: []mongodbatlas.Resource{
						{
							Collection: &test3,
							DB:         &test3,
						},
					},
				},
				{
					Action: "TEST2",
					Resources: []mongodbatlas.Resource{
						{
							Collection: &test3,
							DB:         &test3,
						},
					},
				},
			},
		},
		{
			name: "duplicates",
			args: args{
				newActions: []mongodbatlas.Action{
					{
						Action: "TEST",
						Resources: []mongodbatlas.Resource{
							{
								Collection: &test3,
								DB:         &test3,
							},
						},
					},
					{
						Action: "TEST",
						Resources: []mongodbatlas.Resource{
							{
								Collection: &test3,
								DB:         &test4,
							},
						},
					},
				},
			},
			want: []mongodbatlas.Action{
				{
					Action: "TEST",
					Resources: []mongodbatlas.Resource{
						{
							Collection: &test3,
							DB:         &test4,
						},
						{
							Collection: &test3,
							DB:         &test3,
						},
					},
				},
			},
		},
	}
	for _, tt := range tests {
		args := tt.args
		want := tt.want
		t.Run(tt.name, func(t *testing.T) {
			got := joinActions(args.newActions)
			assert.ElementsMatch(t, got, want)
		})
	}
}
