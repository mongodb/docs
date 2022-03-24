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

package logs

import (
	"context"
	"fmt"
	"strings"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/search"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/afero"
	"github.com/spf13/cobra"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

type DownloadOpts struct {
	cli.GlobalOpts
	cli.DownloaderOpts
	host  string
	name  string
	start string
	end   string
	store store.LogsDownloader
}

var downloadMessage = "Download of %s completed.\n"

func (opts *DownloadOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *DownloadOpts) Run() error {
	f, err := opts.NewWriteCloser()
	if err != nil {
		return err
	}

	r := opts.newDateRangeOpts()
	if err := opts.store.DownloadLog(opts.ConfigProjectID(), opts.host, opts.name, f, r); err != nil {
		_ = opts.OnError(f)
		return err
	}
	if opts.Out != "/dev/stdout" {
		fmt.Printf(downloadMessage, opts.Out)
	}
	return f.Close()
}

func (opts *DownloadOpts) initDefaultOut() error {
	if opts.Out == "" {
		opts.Out = strings.ReplaceAll(opts.name, ".gz", ".log.gz")
	}
	return nil
}

func (opts *DownloadOpts) newDateRangeOpts() *atlas.DateRangetOptions {
	return &atlas.DateRangetOptions{
		StartDate: opts.start,
		EndDate:   opts.end,
	}
}

// mongocli atlas logs download <hostname> <mongodb.gz|mongos.gz|mongosqld.gz|mongodb-audit-log.gz|mongos-audit-log.gz> [--force] [--output destination] [--projectId projectId].
func DownloadBuilder() *cobra.Command {
	const argsN = 2
	opts := &DownloadOpts{}
	opts.Fs = afero.NewOsFs()
	cmd := &cobra.Command{
		Use:   "download <hostname> <mongodb.gz|mongos.gz|mongosqld.gz|mongodb-audit-log.gz|mongos-audit-log.gz>",
		Short: "Download a host mongodb logs.",
		Long: `Download a gzipped file containing the logs for the selected hostname.
To find the hostnames for an Atlas project, you can use the process list command.`,
		Args: require.ExactArgs(argsN),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.host = args[0]
			opts.name = args[1]
			return opts.PreRunE(opts.ValidateProjectID, opts.initStore(cmd.Context()), opts.initDefaultOut)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			if !search.StringInSlice(cmd.ValidArgs, opts.name) {
				return fmt.Errorf("<logname> must be one of %s", cmd.ValidArgs)
			}
			return opts.Run()
		},
		ValidArgs: []string{"mongodb.gz", "mongos.gz", "mongosqld.gz", "mongodb-audit-log.gz", "mongos-audit-log.gz"},
	}

	cmd.Flags().StringVar(&opts.Out, flag.Out, "", usage.LogOut)
	cmd.Flags().StringVar(&opts.start, flag.Start, "", usage.LogStart)
	cmd.Flags().StringVar(&opts.end, flag.End, "", usage.LogEnd)
	cmd.Flags().BoolVar(&opts.Force, flag.Force, false, usage.ForceFile)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)

	_ = cmd.MarkFlagFilename(flag.Out)

	return cmd
}
