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

package events

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestList_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockEventLister(ctrl)
	defer ctrl.Finish()

	expected := &mongodbatlas.EventResponse{}

	t.Run("for a project", func(t *testing.T) {
		listOpts := &ListOpts{
			store: mockStore,
		}
		listOpts.orgID = "1"

		mockStore.
			EXPECT().OrganizationEvents(listOpts.orgID, listOpts.newEventListOptions()).
			Return(expected, nil).
			Times(1)

		err := listOpts.Run()
		if err != nil {
			t.Fatalf("Run() unexpected error: %v", err)
		}
	})
	t.Run("for an org", func(t *testing.T) {
		listOpts := &ListOpts{
			store: mockStore,
		}

		listOpts.projectID = "1"
		mockStore.
			EXPECT().ProjectEvents(listOpts.projectID, listOpts.newEventListOptions()).
			Return(expected, nil).
			Times(1)

		err := listOpts.Run()
		if err != nil {
			t.Fatalf("Run() unexpected error: %v", err)
		}
	})
}

func TestListBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		ListBuilder(),
		0,
		[]string{
			flag.Limit,
			flag.Page,
			flag.Output,
			flag.ProjectID,
			flag.OrgID,
			flag.Type,
			flag.MaxDate,
			flag.MinDate,
		},
	)
}
