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

package file_test

import (
	"fmt"
	"testing"

	"github.com/mongodb/mongocli/internal/file"
	"github.com/spf13/afero"
)

func TestLoad(t *testing.T) {
	t.Run("file does not exists", func(t *testing.T) {
		appFS := afero.NewMemMapFs()
		filename := "test.xml"
		err := file.Load(appFS, filename, nil)
		if err == nil || err.Error() != fmt.Sprintf("file not found: %s", filename) {
			t.Errorf("Load() unexpected error: %v", err)
		}
	})
	t.Run("file with no ext", func(t *testing.T) {
		appFS := afero.NewMemMapFs()
		filename := "test"
		_ = afero.WriteFile(appFS, filename, []byte(""), 0600)
		err := file.Load(appFS, filename, nil)
		if err == nil || err.Error() != fmt.Sprintf("filename: %s requires valid extension", filename) {
			t.Errorf("Load() unexpected error: %v", err)
		}
	})
	t.Run("file with invalid ext", func(t *testing.T) {
		appFS := afero.NewMemMapFs()
		filename := "test.test"
		_ = afero.WriteFile(appFS, filename, []byte(""), 0600)
		err := file.Load(appFS, filename, nil)
		if err == nil || err.Error() != "unsupported file type: test" {
			t.Errorf("Load() unexpected error: %v", err)
		}
	})
	t.Run("valid json file", func(t *testing.T) {
		appFS := afero.NewMemMapFs()
		filename := "test.json"
		_ = afero.WriteFile(appFS, filename, []byte("{}"), 0600)
		out := new(map[string]interface{})
		err := file.Load(appFS, filename, out)
		if err != nil {
			t.Fatalf("Load() unexpected error: %v", err)
		}
	})
	t.Run("valid yaml file", func(t *testing.T) {
		appFS := afero.NewMemMapFs()
		filename := "test.yaml"
		_ = afero.WriteFile(appFS, filename, []byte(""), 0600)
		out := new(map[string]interface{})
		err := file.Load(appFS, filename, out)
		if err != nil {
			t.Fatalf("Load() unexpected error: %v", err)
		}
	})
}
