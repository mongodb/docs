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

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/spf13/afero"
	"go.mongodb.org/atlas/mongodbatlas"
)

const testName = "default"
const testJSON = `{"name":"default"}`

func TestCreateOpts_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockSearchIndexCreator(ctrl)
	defer ctrl.Finish()

	t.Run("flags run", func(t *testing.T) {
		opts := &CreateOpts{
			store: mockStore,
		}
		opts.name = testName

		request, err := opts.newSearchIndex()
		if err != nil {
			t.Fatalf("newSearchIndex() unexpected error: %v", err)
		}
		expected := &mongodbatlas.SearchIndex{}
		mockStore.
			EXPECT().
			CreateSearchIndexes(opts.ProjectID, opts.clusterName, request).
			Return(expected, nil).
			Times(1)

		if err := opts.Run(); err != nil {
			t.Fatalf("Run() unexpected error: %v", err)
		}
	})

	t.Run("file run", func(t *testing.T) {
		appFS := afero.NewMemMapFs()
		// create test file
		fileName := "atlas_search_index_create_test.json"
		_ = afero.WriteFile(appFS, fileName, []byte(testJSON), 0600)

		opts := &CreateOpts{
			store: mockStore,
		}
		opts.filename = fileName
		opts.fs = appFS

		expected := &mongodbatlas.SearchIndex{}
		request, err := opts.newSearchIndex()
		if err != nil {
			t.Fatalf("newSearchIndex() unexpected error: %v", err)
		}
		mockStore.
			EXPECT().
			CreateSearchIndexes(opts.ProjectID, opts.clusterName, request).Return(expected, nil).
			Times(1)
		if err := opts.Run(); err != nil {
			t.Fatalf("Run() unexpected error: %v", err)
		}
	})
}
