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
	"bytes"
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

func TestOutputOpts_printNewVersionAvailable(t *testing.T) {
	f := false
	atlasV := "atlascli/v3.0.0"
	mcliV := "mongocli/v3.0.0"
	mcliOldV := "v3.0.0"

	tests := []struct {
		tool           string
		currentVersion string
		version        string
		wantPrint      bool
		release        *github.RepositoryRelease
	}{
		{
			tool:           "atlascli",
			currentVersion: "v1.0.0",
			wantPrint:      true,
			release:        &github.RepositoryRelease{TagName: &atlasV, Prerelease: &f, Draft: &f},
		},
		{
			tool:           "atlascli",
			currentVersion: "v4.0.0",
			wantPrint:      false,
			release:        &github.RepositoryRelease{TagName: &atlasV, Prerelease: &f, Draft: &f},
		},
		{
			tool:           "atlascli",
			currentVersion: "v4.0.0-123",
			wantPrint:      false,
			release:        &github.RepositoryRelease{TagName: &atlasV, Prerelease: &f, Draft: &f},
		},
		{
			tool:           "mongocli",
			currentVersion: "v1.0.0",
			wantPrint:      true,
			release:        &github.RepositoryRelease{TagName: &mcliOldV, Prerelease: &f, Draft: &f},
		},
		{
			tool:           "mongocli",
			currentVersion: "v1.0.0",
			wantPrint:      true,
			release:        &github.RepositoryRelease{TagName: &mcliV, Prerelease: &f, Draft: &f},
		},
		{
			tool:           "mongocli",
			currentVersion: "v4.0.0",
			wantPrint:      false,
			release:        &github.RepositoryRelease{TagName: &mcliOldV, Prerelease: &f, Draft: &f},
		},
		{
			tool:           "mongocli",
			currentVersion: "v4.0.0-123",
			wantPrint:      false,
			release:        &github.RepositoryRelease{TagName: &mcliV, Prerelease: &f, Draft: &f},
		},
	}

	for _, tt := range tests {
		t.Run(fmt.Sprintf("%v / %v", tt.currentVersion, tt.release), func(t *testing.T) {
			prevVersion := version.Version
			version.Version = tt.currentVersion
			defer func() {
				version.Version = prevVersion
			}()

			var bin string
			if tt.tool == "atlascli" {
				bin = "atlas"
			} else {
				bin = tt.tool
			}

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

			bufOut := new(bytes.Buffer)
			ctx := context.Background()
			finder := NewVersionFinder(context.Background(), mockStore)

			err := NewPrinterWithFinder(ctx, finder).PrintNewVersionAvailable(
				bufOut,
				tt.currentVersion,
				tt.tool,
				bin,
			)

			if err != nil {
				t.Errorf("printNewVersionAvailable() unexpected error: %v", err)
			}

			want := ""
			if tt.wantPrint {
				want = fmt.Sprintf(`
A new version of %s is available '%v'!
To upgrade, see: https://dochub.mongodb.org/core/%s-install.

To disable this alert, run "%s config set skip_update_check true".
`, tt.tool, strings.ReplaceAll(tt.release.GetTagName(), tt.tool+"/", ""), tt.tool, bin)
			}

			if got := bufOut.String(); got != want {
				t.Errorf("printNewVersionAvailable() got = %v, want %v", got, want)
			}
		})
	}
}
