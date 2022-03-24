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

package versionmanifest

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
	"go.mongodb.org/ops-manager/opsmngr"
)

func TestVersionManifestUpdate_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockVersionManifestUpdaterServiceVersionDescriber(ctrl)
	mockStoreStaticPath := mocks.NewMockVersionManifestGetter(ctrl)
	defer ctrl.Finish()

	tests := []struct {
		name            string
		versionManifest string
		omVersion       string
		wantErr         bool
	}{
		{
			name:            "OM 4.4",
			versionManifest: "4.4",
			omVersion:       "4.4.0.100.20210101T0000Z",
			wantErr:         false,
		},
		{
			name:            "Invalid Format",
			versionManifest: "bad version",
			omVersion:       "",
			wantErr:         true,
		},
		{
			name:            "Invalid OM Version",
			versionManifest: "4.4",
			omVersion:       "5.0.0.100.20210101T0000Z",
			wantErr:         true,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			updateOpts := &UpdateOpts{
				versionManifest: tt.versionManifest,
				store:           mockStore,
				storeStaticPath: mockStoreStaticPath,
			}

			if tt.omVersion != "" {
				mockStore.
					EXPECT().ServiceVersion().
					Return(&opsmngr.ServiceVersion{Version: tt.omVersion}, nil).
					Times(1)
			}

			if tt.wantErr {
				if err := updateOpts.Run(); err == nil {
					t.Fatalf("Run() expected error to be returned")
				}
				return
			}

			mockStoreStaticPath.
				EXPECT().GetVersionManifest(updateOpts.version()).
				Return(&opsmngr.VersionManifest{}, nil).
				Times(1)

			mockStore.
				EXPECT().UpdateVersionManifest(&opsmngr.VersionManifest{}).
				Return(&opsmngr.VersionManifest{}, nil).
				Times(1)

			if err := updateOpts.Run(); err != nil {
				t.Fatalf("Run() unexpected error: %v", err)
			}
		})
	}
}

func TestUpdateBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		UpdateBuilder(),
		0,
		[]string{flag.Output},
	)
}
