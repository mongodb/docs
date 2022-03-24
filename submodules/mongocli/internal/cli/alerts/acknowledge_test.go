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

func TestAcknowledgeBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		AcknowledgeBuilder(),
		0,
		[]string{
			flag.Forever,
			flag.Until,
			flag.Comment,
			flag.ProjectID,
			flag.Output,
		},
	)
}

func TestAcknowledgeOpts_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockAlertAcknowledger(ctrl)
	defer ctrl.Finish()

	tests := []struct {
		name    string
		opts    AcknowledgeOpts
		wantErr bool
	}{
		{
			name: "default",
			opts: AcknowledgeOpts{
				alertID: "533dc40ae4b00835ff81eaee",
				comment: "Test",
				store:   mockStore,
			},
			wantErr: false,
		},
		{
			name: "forever",
			opts: AcknowledgeOpts{
				alertID: "533dc40ae4b00835ff81eaee",
				comment: "Test",
				forever: true,
				store:   mockStore,
			},
			wantErr: false,
		},
		{
			name: "with error",
			opts: AcknowledgeOpts{
				alertID: "533dc40ae4b00835ff81eaee",
				comment: "Test",
				forever: true,
				store:   mockStore,
			},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		opts := tt.opts
		wantErr := tt.wantErr
		t.Run(tt.name, func(t *testing.T) {
			ackReq := opts.newAcknowledgeRequest()
			if wantErr {
				mockStore.
					EXPECT().
					AcknowledgeAlert(opts.ProjectID, opts.alertID, ackReq).
					Return(nil, errors.New("fake")).
					Times(1)
				assert.Error(t, opts.Run())
			} else {
				expected := &mongodbatlas.Alert{}
				mockStore.
					EXPECT().
					AcknowledgeAlert(opts.ProjectID, opts.alertID, ackReq).
					Return(expected, nil).
					Times(1)
				assert.NoError(t, opts.Run())
			}
		})
	}
}
