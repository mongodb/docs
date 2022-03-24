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

//go:build integration
// +build integration

package config

import (
	"path/filepath"
	"testing"

	"github.com/spf13/afero"
	"github.com/stretchr/testify/assert"
)

const (
	newProfileName = "newProfileName"
	atlas          = "atlas"
)

func testProfile(profileContents string) *Profile {
	fs := afero.NewMemMapFs()
	testConfigDir, _ := filepath.Abs("test")

	p := &Profile{
		name:      DefaultProfile,
		configDir: testConfigDir,
		fs:        fs,
	}

	if err := afero.WriteFile(fs, p.Filename(), []byte(profileContents), 0600); err != nil {
		panic(err)
	}

	return p
}

func profileWithOneNonDefaultUser() *Profile {
	const contents = `
[atlas]
  base_url = "http://base_url.com/"
  ops_manager_skip_verify = "false"
  org_id = "5cac6a2179358edabd12b572"
`
	return testProfile(contents)
}

func profileWithOneDefaultUserOneNonDefault() *Profile {
	const contents = `
[default]
  base_url = "http://base_url.com/"
  ops_manager_skip_verify = "false"
  org_id = "5cac6a2179358edabd12b572"
  profile_id = "5cac6a2179358edabd12b572"

[atlas]
  base_url = "http://atlas.com/"
  ops_manager_skip_verify = "false"
  org_id = "5cac6a2179358edabd12b572"
`
	return testProfile(contents)
}

func profileWithFullDescription() *Profile {
	const contents = `
[default]
  base_url = "http://base_url.com/"
  ops_manager_url = "http://om_url.com/"
  ops_manager_ca_certificate = "/path/to/certificate"
  ops_manager_skip_verify = "false"
  public_api_key = "some_public_key"
  private_api_key = "some_private_key"
  org_id = "5cac6a2179358edabd12b572"
  profile_id = "5cac6a2179358edabd12b572"
  service = "cloud"
`
	return testProfile(contents)
}

func TestProfile_Get_FullProfile(t *testing.T) {
	profile := profileWithFullDescription()
	a := assert.New(t)
	a.NoError(profile.LoadMongoCLIConfig(false))

	desc := profile.Map()
	a.Equal("default", profile.Name())
	a.Len(desc, 9)
	a.Equal("cloud", profile.Service())
	a.Equal("some_public_key", profile.PublicAPIKey())
	a.Equal("some_private_key", profile.PrivateAPIKey())
	a.Equal("http://om_url.com/", profile.OpsManagerURL())
	a.Equal("/path/to/certificate", profile.OpsManagerCACertificate())
	a.Equal("false", profile.OpsManagerSkipVerify())
}

func TestProfile_Get_Default(t *testing.T) {
	profile := profileWithOneDefaultUserOneNonDefault()
	a := assert.New(t)
	a.NoError(profile.LoadMongoCLIConfig(false))
	desc := profile.Map()
	a.Equal(DefaultProfile, profile.Name())
	a.Len(desc, 4)
}

func TestProfile_Get_NonDefault(t *testing.T) {
	profile := profileWithOneNonDefaultUser()
	profile.SetName(atlas)

	a := assert.New(t)

	a.NoError(profile.LoadMongoCLIConfig(false))

	desc := profile.Map()

	a.Equal(atlas, profile.Name(), "expected atlas Profile to be described")
	a.Len(desc, 3)
	a.Equal("5cac6a2179358edabd12b572", profile.OrgID(), "project id should match")
	a.Empty(profile.ProjectID(), "project id should not be set")
}

func TestProfile_Delete_NonDefault(t *testing.T) {
	profile := profileWithOneDefaultUserOneNonDefault()

	a := assert.New(t)

	a.NoError(profile.LoadMongoCLIConfig(false))

	profile.SetName(atlas)

	if a.NoError(profile.Delete()) {
		a.NoError(profile.LoadMongoCLIConfig(false))
		desc := profile.Map()
		a.Len(desc, 0, "Profile should have no properties")
	}
}

func TestProfile_Rename(t *testing.T) {
	profile := profileWithOneDefaultUserOneNonDefault()
	profile.SetName(DefaultProfile)

	a := assert.New(t)
	a.NoError(profile.LoadMongoCLIConfig(false))
	defaultDescription := profile.Map()
	if a.NoError(profile.Rename(newProfileName)) {
		a.NoError(profile.LoadMongoCLIConfig(false))
		profile.SetName(DefaultProfile)
		a.Empty(profile.Map())
		profile.SetName(newProfileName)
		descriptionAfterRename := profile.Map()
		// after renaming, one Profile should exist
		a.Equal(defaultDescription, descriptionAfterRename, "descriptions should be equal after renaming")
	}
}

func TestProfile_Rename_OverwriteExisting(t *testing.T) {
	profile := profileWithOneDefaultUserOneNonDefault()
	profile.SetName(DefaultProfile)

	a := assert.New(t)
	a.NoError(profile.LoadMongoCLIConfig(false))
	defaultDescription := profile.Map()

	if a.NoError(profile.Rename(atlas)) {
		a.NoError(profile.LoadMongoCLIConfig(false))
		profile.SetName(atlas)

		descriptionAfterRename := profile.Map()

		// after renaming, one Profile should exist
		a.Equal(defaultDescription, descriptionAfterRename, "descriptions should be equal after renaming")
	}
}

func TestProfile_Set(t *testing.T) {
	profile := profileWithOneDefaultUserOneNonDefault()
	a := assert.New(t)
	a.NoError(profile.LoadMongoCLIConfig(false))

	profile.SetName(DefaultProfile)

	profile.Set(projectID, "newProjectId")

	a.Equal("newProjectId", profile.ProjectID(), "project id should be set to new value")
}
