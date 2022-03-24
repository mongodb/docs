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

package store

import (
	"fmt"
	"io"

	"github.com/mongodb/mongocli/internal/config"
	"go.mongodb.org/ops-manager/opsmngr"
)

//go:generate mockgen -destination=../mocks/mock_diagnose_archive.go -package=mocks github.com/mongodb/mongocli/internal/store ArchivesDownloader

type ArchivesDownloader interface {
	DownloadArchive(string, *opsmngr.DiagnosticsListOpts, io.Writer) error
}

// DownloadArchive encapsulate the logic to manage different cloud providers.
func (s *Store) DownloadArchive(groupID string, opts *opsmngr.DiagnosticsListOpts, out io.Writer) error {
	switch s.service {
	case config.OpsManagerService, config.CloudManagerService:
		_, err := s.client.(*opsmngr.Client).Diagnostics.Get(s.ctx, groupID, opts, out)
		return err
	default:
		return fmt.Errorf("%w: %s", errUnsupportedService, s.service)
	}
}
