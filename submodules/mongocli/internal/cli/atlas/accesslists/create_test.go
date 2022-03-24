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

package accesslists

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestWhitelistCreate_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockProjectIPAccessListCreator(ctrl)
	defer ctrl.Finish()

	var expected *mongodbatlas.ProjectIPAccessLists

	createOpts := &CreateOpts{
		entry:     "37.228.254.100",
		entryType: ipAddress,
		store:     mockStore,
	}

	mockStore.
		EXPECT().
		CreateProjectIPAccessList(createOpts.newProjectIPAccessList()).Return(expected, nil).
		Times(1)

	if err := createOpts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}

func TestCreateBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		CreateBuilder(),
		0,
		[]string{flag.ProjectID, flag.Output, flag.Type, flag.Comment, flag.DeleteAfter},
	)
}

func TestValidateCurrentIPFlag(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockProjectIPAccessListCreator(ctrl)
	defer ctrl.Finish()

	tests := []struct {
		name         string
		args         []string
		currentIP    bool
		resourceType string
		wantErr      bool
	}{
		{
			"no args no currentIP ipAddress",
			[]string{},
			false,
			ipAddress,
			true,
		},
		{
			"no args no currentIP cidrBlock",
			[]string{},
			false,
			cidrBlock,
			true,
		},
		{
			"no args no currentIP awsSecurityGroup",
			[]string{},
			false,
			awsSecurityGroup,
			true,
		},
		{
			"with args with currentIP ipAddress",
			[]string{"37.228.254.100"},
			true,
			ipAddress,
			true,
		},
		{
			"with args with currentIP cidrBlock",
			[]string{"37.228.254.100"},
			true,
			cidrBlock,
			true,
		},
		{
			"with args with currentIP awsSecurityGroup",
			[]string{"37.228.254.100"},
			true,
			awsSecurityGroup,
			true,
		},
		{
			"with args no currentIP ipAddress",
			[]string{"37.228.254.100"},
			false,
			ipAddress,
			false,
		},
		{
			"with args no currentIP cidrBlock",
			[]string{"37.228.254.100"},
			false,
			cidrBlock,
			false,
		},
		{
			"with args no currentIP awsSecurityGroup",
			[]string{"37.228.254.100"},
			false,
			awsSecurityGroup,
			false,
		},
		{
			"no args with currentIP ipAddress",
			[]string{},
			true,
			ipAddress,
			false,
		},
		{
			"no args with currentIP cidrBlock",
			[]string{},
			true,
			cidrBlock,
			true,
		},
		{
			"no args with currentIP awsSecurityGroup",
			[]string{},
			true,
			awsSecurityGroup,
			true,
		},
	}

	for _, tt := range tests {
		args := tt.args
		wantErr := tt.wantErr

		createOpts := &CreateOpts{
			entryType: tt.resourceType,
			store:     mockStore,
			currentIP: tt.currentIP,
		}

		t.Run(tt.name, func(t *testing.T) {
			if err := createOpts.validateCurrentIPFlag(CreateBuilder(), args); (err() == nil) == wantErr {
				t.Errorf("Error = %v, wantErr %v", err(), wantErr)
			}
		})
	}
}
