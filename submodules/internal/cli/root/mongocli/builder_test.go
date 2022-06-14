//go:build unit
// +build unit

// Copyright 2021 MongoDB Inc
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
package mongocli

import (
	"bytes"
	"fmt"
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/google/go-github/v42/github"
	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/latestrelease"
	"github.com/mongodb/mongodb-atlas-cli/internal/mocks"
	"github.com/mongodb/mongodb-atlas-cli/internal/version"
	"github.com/spf13/afero"
)

func TestBuilder(t *testing.T) {
	type args struct {
		argsWithoutProg []string
	}
	tests := []struct {
		name string
		args args
		want int
	}{
		{
			name: "atlas",
			want: 9,
			args: args{
				argsWithoutProg: []string{"atlas"},
			},
		},
		{
			name: "ops-manager",
			want: 8,
			args: args{
				argsWithoutProg: []string{"ops-manager"},
			},
		},
		{
			name: "cloud-manager",
			want: 8,
			args: args{
				argsWithoutProg: []string{"cloud-manager"},
			},
		},
		{
			name: "ops-manager alias",
			want: 8,
			args: args{
				argsWithoutProg: []string{"om"},
			},
		},
		{
			name: "cloud-manager alias",
			want: 8,
			args: args{
				argsWithoutProg: []string{"cm"},
			},
		},
		{
			name: "iam",
			want: 8,
			args: args{
				argsWithoutProg: []string{"iam"},
			},
		},
		{
			name: "empty",
			want: 9,
			args: args{
				argsWithoutProg: []string{},
			},
		},
		{
			name: "autocomplete",
			want: 9,
			args: args{
				argsWithoutProg: []string{"__complete"},
			},
		},
		{
			name: "completion",
			want: 9,
			args: args{
				argsWithoutProg: []string{"completion"},
			},
		},
		{
			name: "fig-autocompletion",
			want: 9,
			args: args{
				argsWithoutProg: []string{},
			},
		},
		{
			name: "--version",
			want: 9,
			args: args{
				argsWithoutProg: []string{"completion"},
			},
		},
	}
	var profile string
	for _, tt := range tests {
		name := tt.name
		args := tt.args
		want := tt.want
		t.Run(name, func(t *testing.T) {
			got := Builder(&profile, args.argsWithoutProg)
			if len(got.Commands()) != want {
				t.Fatalf("got=%d, want=%d", len(got.Commands()), want)
			}
		})
	}
}

func TestOutputOpts_notifyIfApplicable(t *testing.T) {
	tests := testCases()
	for _, tt := range tests {
		t.Run(fmt.Sprintf("%v/%v", tt.currentVersion, tt.release), func(t *testing.T) {
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
To upgrade, see: https://dochub.mongodb.org/core/install-%s.

To disable this alert, run "%s config set skip_update_check true".
`, config.ToolName, v, config.ToolName, config.BinName())
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
	mcliV := "mongocli/v2.0.0"
	mcliOldV := "v2.0.0"

	tests := []testCase{
		{
			currentVersion:   "v1.0.0",
			expectNewVersion: true,
			release:          &github.RepositoryRelease{TagName: &mcliOldV, Prerelease: &f, Draft: &f},
		},
		{
			currentVersion:   "mongocli/v1.0.0",
			expectNewVersion: true,
			release:          &github.RepositoryRelease{TagName: &mcliOldV, Prerelease: &f, Draft: &f},
		},
		{
			currentVersion:   "v1.0.0",
			expectNewVersion: true,
			release:          &github.RepositoryRelease{TagName: &mcliV, Prerelease: &f, Draft: &f},
		},
		{
			currentVersion:   "v3.0.0",
			expectNewVersion: false,
			release:          &github.RepositoryRelease{TagName: &mcliOldV, Prerelease: &f, Draft: &f},
		},
		{
			currentVersion:   "v3.0.0-123",
			expectNewVersion: false,
			release:          &github.RepositoryRelease{TagName: &mcliV, Prerelease: &f, Draft: &f},
		},
		{
			currentVersion:   "v2.0.0",
			expectNewVersion: false,
			release:          &github.RepositoryRelease{TagName: &mcliV, Prerelease: &f, Draft: &f},
		},
		{
			currentVersion:   "v2.0.0-123",
			expectNewVersion: false,
			release:          &github.RepositoryRelease{TagName: &mcliV, Prerelease: &f, Draft: &f},
		},
		{
			currentVersion:   "v3.0.0-123",
			expectNewVersion: false,
			release:          nil,
		},
	}
	return tests
}
