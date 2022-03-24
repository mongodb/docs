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

package latestrelease

import (
	"context"
	"strings"

	"github.com/Masterminds/semver/v3"
	"github.com/google/go-github/v42/github"
	"github.com/mongodb/mongocli/internal/version"
)

//go:generate mockgen -destination=../mocks/mock_release_version.go -package=mocks github.com/mongodb/mongocli/internal/version VersionFinder

type VersionFinder interface {
	HasNewVersionAvailable(v, tool string) (newVersionAvailable bool, newVersion string, err error)
}

func NewVersionFinder(ctx context.Context, re version.ReleaseVersionDescriber) VersionFinder {
	return &latestReleaseVersionFinder{c: ctx, r: re}
}

type latestReleaseVersionFinder struct {
	c context.Context
	r version.ReleaseVersionDescriber
}

func versionFromTag(release *github.RepositoryRelease, toolName string) string {
	if prefix := toolName + "/"; strings.HasPrefix(release.GetTagName(), prefix) {
		return strings.ReplaceAll(release.GetTagName(), prefix, "")
	}
	return release.GetTagName()
}

func isValidTagForTool(tag, tool string) bool {
	if tool == version.MongoCLI {
		return !strings.Contains(tag, version.AtlasCLI)
	}
	return strings.Contains(tag, tool)
}

func (s *latestReleaseVersionFinder) searchLatestVersionPerTool(currentVersion *semver.Version, toolName string) (bool, *version.ReleaseInformation, error) {
	release, err := s.r.LatestWithCriteria(minPageSize, isValidTagForTool, toolName)

	if err != nil || release == nil {
		return false, nil, err
	}

	v, err := semver.NewVersion(versionFromTag(release, toolName))

	if err != nil {
		return false, nil, err
	}

	if currentVersion.Compare(v) < 0 {
		return true, &version.ReleaseInformation{
			Version:     v.Original(),
			PublishedAt: release.GetPublishedAt().Time,
		}, nil
	}
	return false, nil, nil
}

func (s *latestReleaseVersionFinder) HasNewVersionAvailable(v, tool string) (newVersionAvailable bool, newVersion string, err error) {
	if v == "" {
		return false, "", nil
	}
	svCurrentVersion, err := semver.NewVersion(v)
	if err != nil {
		return false, "", err
	}

	if svCurrentVersion.Prerelease() != "" { // ignoring prerelease for code changes against master
		*svCurrentVersion, err = svCurrentVersion.SetPrerelease("")
		if err != nil {
			return false, "", err
		}
	}

	newVersionAvailable, newV, err := s.searchLatestVersionPerTool(svCurrentVersion, tool)
	if err != nil {
		return false, "", err
	}

	if newVersionAvailable && (!isHomebrew(tool) || isAtLeast24HoursPast(newV.PublishedAt)) {
		return newVersionAvailable, newV.Version, nil
	}

	return false, "", nil
}
