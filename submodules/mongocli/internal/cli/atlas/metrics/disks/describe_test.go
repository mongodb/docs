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

package disks

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestDisksDescribeOpts_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockProcessDiskMeasurementsLister(ctrl)
	defer ctrl.Finish()

	expected := &mongodbatlas.ProcessDiskMeasurements{}

	listOpts := &DescribeOpts{
		host:  "hard-00-00.mongodb.net",
		port:  27017,
		name:  "test",
		store: mockStore,
	}

	opts := listOpts.NewProcessMetricsListOptions()
	mockStore.
		EXPECT().ProcessDiskMeasurements(listOpts.ProjectID, listOpts.host, listOpts.port, listOpts.name, opts).
		Return(expected, nil).
		Times(1)

	if err := listOpts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}

func TestDescribeBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		DescribeBuilder(),
		0,
		[]string{
			flag.Page, flag.Limit, flag.Granularity, flag.Period, flag.Start,
			flag.End, flag.Type, flag.ProjectID, flag.Output},
	)
}
