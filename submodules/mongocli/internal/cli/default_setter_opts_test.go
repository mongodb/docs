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

package cli

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/stretchr/testify/assert"
	"github.com/stretchr/testify/require"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

func TestDefaultOpts_DefaultQuestions(t *testing.T) {
	type fields struct {
		Service string
	}
	tests := []struct {
		name   string
		fields fields
		want   int
	}{
		{
			name: "cloud",
			fields: fields{
				Service: "cloud",
			},
			want: 2,
		},
		{
			name: "cloud gov",
			fields: fields{
				Service: "cloudgov",
			},
			want: 2,
		},
		{
			name: "cloud manager",
			fields: fields{
				Service: "cloud-manager",
			},
			want: 1,
		},
		{
			name: "ops manager",
			fields: fields{
				Service: "ops-manager",
			},
			want: 1,
		},
	}
	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			opts := &DefaultSetterOpts{
				Service: tt.fields.Service,
			}
			assert.Equalf(t, tt.want, len(opts.DefaultQuestions()), "DefaultQuestions()")
		})
	}
}

func TestDefaultOpts_Projects(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockProjectOrgsLister(ctrl)
	defer ctrl.Finish()
	opts := &DefaultSetterOpts{
		Service: "cloud",
		Store:   mockStore,
	}
	t.Run("empty", func(t *testing.T) {
		expectedProjects := &atlas.Projects{}
		mockStore.EXPECT().Projects(gomock.Any()).Return(expectedProjects, nil).Times(1)
		gotPMap, gotPSlice, err := opts.Projects()
		require.NoError(t, err)
		assert.Empty(t, gotPMap)
		assert.Empty(t, gotPSlice)
	})
	t.Run("with one project", func(t *testing.T) {
		expectedProjects := &atlas.Projects{
			Results: []*atlas.Project{
				{
					ID:   "1",
					Name: "Project 1",
				},
			},
		}
		mockStore.EXPECT().Projects(gomock.Any()).Return(expectedProjects, nil).Times(1)
		gotPMap, gotPSlice, err := opts.Projects()
		require.NoError(t, err)
		assert.Equal(t, map[string]string{"Project 1 (1)": "1"}, gotPMap)
		assert.Equal(t, []string{"Project 1 (1)"}, gotPSlice)
	})
}

func TestDefaultOpts_Orgs(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockProjectOrgsLister(ctrl)
	defer ctrl.Finish()
	opts := &DefaultSetterOpts{
		Service: "cloud",
		Store:   mockStore,
	}
	t.Run("empty", func(t *testing.T) {
		expectedOrgs := &atlas.Organizations{}
		mockStore.EXPECT().Organizations(gomock.Any()).Return(expectedOrgs, nil).Times(1)
		gotOMap, gotOSlice, err := opts.Orgs()
		require.NoError(t, err)
		assert.Empty(t, gotOMap)
		assert.Empty(t, gotOSlice)
	})
	t.Run("with one org", func(t *testing.T) {
		expectedOrgs := &atlas.Organizations{
			Results: []*atlas.Organization{
				{
					ID:   "1",
					Name: "Org 1",
				},
			},
		}
		mockStore.EXPECT().Organizations(gomock.Any()).Return(expectedOrgs, nil).Times(1)
		gotOMap, gotOSlice, err := opts.Orgs()
		require.NoError(t, err)
		assert.Equal(t, map[string]string{"Org 1 (1)": "1"}, gotOMap)
		assert.Equal(t, []string{"Org 1 (1)"}, gotOSlice)
	})
}
