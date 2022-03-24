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

package events

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
	"go.mongodb.org/atlas/mongodbatlas"
)

func Test_projectListOpts_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockProjectEventLister(ctrl)
	defer ctrl.Finish()

	expected := &mongodbatlas.EventResponse{}
	listOpts := &projectListOpts{
		store: mockStore,
	}
	listOpts.ProjectID = "1"

	mockStore.
		EXPECT().ProjectEvents(listOpts.ProjectID, listOpts.newEventListOptions()).
		Return(expected, nil).
		Times(1)

	if err := listOpts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}

func TestProjectListBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		ProjectListBuilder(),
		0,
		[]string{
			flag.Limit,
			flag.Page,
			flag.Output,
			flag.ProjectID,
			flag.Type,
			flag.MaxDate,
			flag.MinDate,
		},
	)
}

func TestProjectsBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		ProjectsBuilder(),
		1,
		[]string{},
	)
}
