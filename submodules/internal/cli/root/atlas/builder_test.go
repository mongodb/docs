// Copyright 2022 MongoDB Inc
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

package atlas

import (
	"bytes"
	"fmt"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/google/go-github/v42/github"
	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/latestrelease"
	"github.com/mongodb/mongodb-atlas-cli/internal/mocks"
	"github.com/mongodb/mongodb-atlas-cli/internal/test"
	"github.com/mongodb/mongodb-atlas-cli/internal/version"
	"github.com/spf13/afero"
)

func TestBuilder(t *testing.T) {
	test.CmdValidator(
		t,
		Builder(),
		35,
		[]string{},
	)
}

func TestOutputOpts_notifyIfApplicable(t *testing.T) {
	tests := testCases()
	for _, tt := range tests {
		t.Run(fmt.Sprintf("%v/%v", tt.currentVersion, tt.release), func(t *testing.T) {
			config.ToolName = config.AtlasCLI
			prevVersion := version.Version
			version.Version = tt.currentVersion
			defer func() {
				version.Version = prevVersion
			}()

			ctrl := gomock.NewController(t)
			mockDescriber := mocks.NewMockReleaseVersionDescriber(ctrl)
			defer ctrl.Finish()

			mockDescriber.
				EXPECT().
				LatestWithCriteria(gomock.Any(), gomock.Any(), gomock.Any()).
				Return(tt.release, nil).
				Times(1)

			bufOut := new(bytes.Buffer)
			fs := afero.NewMemMapFs()
			finder, _ := latestrelease.NewVersionFinder(fs, mockDescriber)

			notifier := &Notifier{
				currentVersion: latestrelease.VersionFromTag(version.Version, config.ToolName),
				finder:         finder,
				filesystem:     fs,
				writer:         bufOut,
			}

			if err := notifier.notifyIfApplicable(false); err != nil {
				t.Errorf("notifyIfApplicable() unexpected error:%v", err)
			}

			v := ""
			if tt.release != nil {
				v = latestrelease.VersionFromTag(tt.release.GetTagName(), config.ToolName)
			}

			want := ""
			if tt.expectNewVersion {
				want = fmt.Sprintf(`
A new version of %s is available '%v'!
To upgrade, see: https://dochub.mongodb.org/core/install-atlas-cli.

To disable this alert, run "%s config set skip_update_check true".
`, config.ToolName, v, config.BinName())
			}

			if got := bufOut.String(); got != want {
				t.Errorf("notifyIfApplicable() got = %v, want %v", got, want)
			}
		})
	}
}

type testCase struct {
	currentVersion   string
	expectNewVersion bool
	release          *github.RepositoryRelease
}

func testCases() []testCase {
	f := false
	atlasV := "atlascli/v2.0.0"

	tests := []testCase{
		{
			currentVersion:   "v1.0.0",
			expectNewVersion: true,
			release:          &github.RepositoryRelease{TagName: &atlasV, Prerelease: &f, Draft: &f},
		},
		{
			currentVersion:   "atlascli/v1.0.0",
			expectNewVersion: true,
			release:          &github.RepositoryRelease{TagName: &atlasV, Prerelease: &f, Draft: &f},
		},
		{
			currentVersion:   "v3.0.0",
			expectNewVersion: false,
			release:          &github.RepositoryRelease{TagName: &atlasV, Prerelease: &f, Draft: &f},
		},
		{
			currentVersion:   "v2.0.0",
			expectNewVersion: false,
			release:          &github.RepositoryRelease{TagName: &atlasV, Prerelease: &f, Draft: &f},
		},
		{
			currentVersion:   "v2.0.0-123",
			expectNewVersion: false,
			release:          &github.RepositoryRelease{TagName: &atlasV, Prerelease: &f, Draft: &f},
		},
		{
			currentVersion:   "v3.0.0-123",
			expectNewVersion: false,
			release:          nil,
		},
	}
	return tests
}
