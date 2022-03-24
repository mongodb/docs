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

package diagnosearchive

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/afero"
	"github.com/spf13/cobra"
	"go.mongodb.org/ops-manager/opsmngr"
)

type DownloadOpts struct {
	cli.GlobalOpts
	cli.DownloaderOpts
	limit   int64
	minutes int64
	store   store.ArchivesDownloader
}

func (opts *DownloadOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *DownloadOpts) Run() error {
	out, err := opts.NewWriteCloser()
	if err != nil {
		return err
	}

	if err := opts.store.DownloadArchive(opts.ConfigProjectID(), opts.newDiagnosticsListOpts(), out); err != nil {
		_ = opts.OnError(out)
		return err
	}

	return out.Close()
}

func (opts *DownloadOpts) newDiagnosticsListOpts() *opsmngr.DiagnosticsListOpts {
	return &opsmngr.DiagnosticsListOpts{
		Limit:   opts.limit,
		Minutes: opts.minutes,
	}
}

// mongocli om diagnose-archive download [--out out] [--projectId projectId].
func DownloadBuilder() *cobra.Command {
	opts := &DownloadOpts{}
	opts.Fs = afero.NewOsFs()
	cmd := &cobra.Command{
		Use:     "download",
		Aliases: []string{"get"},
		Short:   "Download diagnose archives.",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(opts.ValidateProjectID, opts.initStore(cmd.Context()))
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.Out, flag.Out, "diagnose-archive.tar.gz", usage.DiagnoseOut)
	cmd.Flags().Int64Var(&opts.limit, flag.Limit, 0, usage.ArchiveLimit)
	cmd.Flags().Int64Var(&opts.minutes, flag.Minutes, 0, usage.ArchiveMinutes)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)

	_ = cmd.MarkFlagFilename(flag.Out)

	return cmd
}
