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

package latestrelease

import (
	"context"
	"fmt"
	"strings"
	"testing"

	"github.com/Masterminds/semver/v3"
	"github.com/golang/mock/gomock"
	"github.com/google/go-github/v42/github"
	"github.com/mongodb/mongocli/internal/mocks"
	"github.com/mongodb/mongocli/internal/version"
)

func TestOutputOpts_HasNewVersionAvailable(t *testing.T) {
	f := false
	atlasV := "atlascli/v2.0.0"
	mcliV := "mongocli/v2.0.0"
	mcliOldV := "v2.0.0"

	tests := []struct {
		tool             string
		currentVersion   string
		version          string
		expectNewVersion bool
		release          *github.RepositoryRelease
	}{
		{
			tool:             "atlascli",
			currentVersion:   "v1.0.0",
			expectNewVersion: true,
			release:          &github.RepositoryRelease{TagName: &atlasV, Prerelease: &f, Draft: &f},
		},
		{
			tool:             "atlascli",
			currentVersion:   "v3.0.0",
			expectNewVersion: false,
			release:          &github.RepositoryRelease{TagName: &atlasV, Prerelease: &f, Draft: &f},
		},
		{
			tool:             "atlascli",
			currentVersion:   "v3.0.0-123",
			expectNewVersion: false,
			release:          &github.RepositoryRelease{TagName: &atlasV, Prerelease: &f, Draft: &f},
		},
		{
			tool:             "mongocli",
			currentVersion:   "v1.0.0",
			expectNewVersion: true,
			release:          &github.RepositoryRelease{TagName: &mcliOldV, Prerelease: &f, Draft: &f},
		},
		{
			tool:             "mongocli",
			currentVersion:   "v1.0.0",
			expectNewVersion: true,
			release:          &github.RepositoryRelease{TagName: &mcliV, Prerelease: &f, Draft: &f},
		},
		{
			tool:             "mongocli",
			currentVersion:   "v3.0.0",
			expectNewVersion: false,
			release:          &github.RepositoryRelease{TagName: &mcliOldV, Prerelease: &f, Draft: &f},
		},
		{
			tool:             "mongocli",
			currentVersion:   "v3.0.0-123",
			expectNewVersion: false,
			release:          &github.RepositoryRelease{TagName: &mcliV, Prerelease: &f, Draft: &f},
		},
	}

	for _, tt := range tests {
		t.Run(fmt.Sprintf("%v / %v", tt.currentVersion, tt.release.GetTagName()), func(t *testing.T) {
			prevVersion := version.Version
			version.Version = tt.currentVersion
			defer func() {
				version.Version = prevVersion
			}()

			currVer, _ := semver.NewVersion(tt.currentVersion)
			*currVer, _ = currVer.SetPrerelease("")

			ctrl := gomock.NewController(t)
			mockStore := mocks.NewMockReleaseVersionDescriber(ctrl)
			defer ctrl.Finish()

			mockStore.
				EXPECT().
				LatestWithCriteria(gomock.Any(), gomock.Any(), gomock.Any()).
				Return(tt.release, nil).
				Times(1)

			versionAvailable, newV, err := NewVersionFinder(context.Background(), mockStore).HasNewVersionAvailable(
				tt.currentVersion,
				tt.tool,
			)

			if err != nil {
				t.Errorf("HasNewVersionAvailable() unexpected error: %v", err)
			}

			expectedV := strings.ReplaceAll(tt.release.GetTagName(), tt.tool+"/", "")

			if versionAvailable && (!tt.expectNewVersion || newV != expectedV) {
				t.Errorf("want: versionAvailable=%v and newV=%v got: versionAvailable=%v and newV=%v.",
					tt.expectNewVersion, expectedV, versionAvailable, newV)
			}
		})
	}
}

func TestOutputOpts_testIsValidTag(t *testing.T) {
	tests := []struct {
		tool    string
		tag     string
		isValid bool
	}{
		{"atlascli", "atlascli/v1.0.0", true},
		{"atlascli", "mongocli/v1.0.0", false},
		{"atlascli", "v1.0.0", false},
		{"mongocli", "atlascli/v1.0.0", false},
		{"mongocli", "mongocli/v1.0.0", true},
		{"mongocli", "v1.0.0", true},
	}

	for _, tt := range tests {
		t.Run(fmt.Sprintf("%v_%v", tt.tag, tt.isValid), func(t *testing.T) {
			if result := isValidTagForTool(tt.tag, tt.tool); result != tt.isValid {
				t.Errorf("got = %v, want %v", result, tt.isValid)
			}
		})
	}
}
