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

package logs

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/test"
	"github.com/spf13/afero"
)

func TestDownloadOpts_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockLogJobsDownloader(ctrl)
	defer ctrl.Finish()

	opts := &JobsDownloadOpts{
		id:    "1",
		store: mockStore,
	}
	opts.Out = "fake_log.tar.gz"
	opts.Fs = afero.NewMemMapFs()

	mockStore.
		EXPECT().
		DownloadLogJob(opts.ProjectID, opts.id, gomock.Any()).
		Return(nil).
		Times(1)

	if err := opts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}

func TestJobsDownloadOptsBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		JobsDownloadOptsBuilder(),
		0,
		[]string{flag.Out, flag.ProjectID, flag.Force},
	)
}
