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

package alerts

import (
	"errors"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
	"github.com/stretchr/testify/assert"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestDescribeBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		DescribeBuilder(),
		0,
		[]string{
			flag.ProjectID,
			flag.Output,
		},
	)
}

func TestDescribeOpts_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockAlertDescriber(ctrl)
	defer ctrl.Finish()

	tests := []struct {
		name    string
		cmd     *DescribeOpts
		wantErr bool
	}{
		{
			name: "default",
			cmd: &DescribeOpts{
				alertID: "533dc40ae4b00835ff81eaee",
				store:   mockStore,
			},
			wantErr: false,
		},
		{
			name: "default",
			cmd: &DescribeOpts{
				alertID: "533dc40ae4b00835ff81eaee",
				store:   mockStore,
			},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		cmd := tt.cmd
		wantErr := tt.wantErr
		t.Run(tt.name, func(t *testing.T) {
			if wantErr {
				mockStore.
					EXPECT().
					Alert(cmd.ProjectID, cmd.alertID).
					Return(nil, errors.New("fake")).
					Times(1)
				assert.Error(t, cmd.Run())
			} else {
				expected := &mongodbatlas.Alert{}
				mockStore.
					EXPECT().
					Alert(cmd.ProjectID, cmd.alertID).
					Return(expected, nil).
					Times(1)
				assert.NoError(t, cmd.Run())
			}
		})
	}
}
