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

	"github.com/spf13/afero"
	"github.com/stretchr/testify/assert"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/mocks"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestUpdateOpts_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockSearchIndexUpdater(ctrl)

	defer ctrl.Finish()

	t.Run("flags run", func(t *testing.T) {
		updateOpts := &UpdateOpts{
			store: mockStore,
		}
		updateOpts.name = testName
		updateOpts.id = "1"

		expected := &mongodbatlas.SearchIndex{}

		request, err := updateOpts.newSearchIndex()
		if err != nil {
			t.Fatalf("newSearchIndex() unexpected error: %v", err)
		}
		mockStore.
			EXPECT().
			UpdateSearchIndexes(updateOpts.ConfigProjectID(), updateOpts.clusterName, updateOpts.id, request).
			Return(expected, nil).
			Times(1)

		assert.NoError(t, updateOpts.Run())
	})

	t.Run("file run", func(t *testing.T) {
		appFS := afero.NewMemMapFs()
		// create test file
		fileName := "atlas_search_index_update_test.json"
		_ = afero.WriteFile(appFS, fileName, []byte(testJSON), 0600)

		updateOpts := &UpdateOpts{
			store: mockStore,
		}
		updateOpts.id = "1"
		updateOpts.filename = fileName
		updateOpts.fs = appFS

		expected := &mongodbatlas.SearchIndex{}

		request, err := updateOpts.newSearchIndex()
		if err != nil {
			t.Fatalf("newSearchIndex() unexpected error: %v", err)
		}
		mockStore.
			EXPECT().
			UpdateSearchIndexes(updateOpts.ConfigProjectID(), updateOpts.clusterName, updateOpts.id, request).
			Return(expected, nil).
			Times(1)

		assert.NoError(t, updateOpts.Run())
	})
}
