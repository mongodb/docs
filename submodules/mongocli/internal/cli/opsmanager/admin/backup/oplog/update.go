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

package oplog

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/opsmanager/admin/backup"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
)

var updateTemplate = "Oplog configuration '{{.ID}}' updated.\n"

type UpdateOpts struct {
	cli.OutputOpts
	backup.AdminOpts
	store store.OplogsUpdater
	ID    string
}

func (opts *UpdateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *UpdateOpts) Run() error {
	r, err := opts.store.UpdateOplog(opts.ID, opts.NewBackupStore())
	if err != nil {
		return err
	}
	return opts.Print(r)
}

// mongocli ops-manager admin backup oplog(s) update <name> [--assignment]
// [--label label][--loadFactor loadFactor][--uri uri][--ssl][--writeConcern writeConcern]
// [--encryptedCredentials encryptedCredentials]

func UpdateBuilder() *cobra.Command {
	opts := &UpdateOpts{}
	opts.Template = updateTemplate
	cmd := &cobra.Command{
		Use:   "update <name>",
		Short: "Update a backup oplog configuration.",
		Args:  require.ExactArgs(1),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.OutWriter = cmd.OutOrStdout()
			return opts.initStore(cmd.Context())()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.ID = args[0]
			return opts.Run()
		},
	}

	cmd.Flags().StringSliceVar(&opts.Label, flag.Label, []string{}, usage.Label)
	cmd.Flags().BoolVar(&opts.Assignment, flag.Assignment, false, usage.OplogAssignment)
	cmd.Flags().Int64Var(&opts.MaxCapacityGB, flag.MaxCapacityGB, 0, usage.MaxCapacityGB)
	cmd.Flags().StringVar(&opts.URI, flag.URI, "", usage.BlockstoreURI)
	cmd.Flags().StringVar(&opts.WriteConcern, flag.WriteConcern, "", usage.WriteConcern)
	cmd.Flags().BoolVar(&opts.SSL, flag.SSL, false, usage.OplogSSL)
	cmd.Flags().BoolVar(&opts.EncryptedCredentials, flag.EncryptedCredentials, false, usage.EncryptedCredentials)

	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.Name)
	_ = cmd.MarkFlagRequired(flag.URI)

	return cmd
}
