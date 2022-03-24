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

package customercerts

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/spf13/afero"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestCreateOpts_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockX509CertificateConfSaver(ctrl)
	defer ctrl.Finish()

	fs := afero.NewMemMapFs()
	fileName := "/path/to/cert.pem"
	fileContents := "some_cert"

	_ = afero.WriteFile(fs, fileName, []byte(fileContents), 0600)

	saveOpts := &SaveOpts{
		fs:      fs,
		store:   mockStore,
		casPath: fileName,
	}

	expected := &mongodbatlas.CustomerX509{}

	mockStore.
		EXPECT().
		SaveX509Configuration(saveOpts.ProjectID, fileContents).
		Return(expected, nil).
		Times(1)

	if err := saveOpts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}
