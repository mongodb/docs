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

package filesystem

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/opsmanager/admin/backup"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	"go.mongodb.org/ops-manager/opsmngr"
)

var createTemplate = "File System configuration '{{.ID}}' created.\n"

type CreateOpts struct {
	cli.OutputOpts
	backup.AdminOpts
	store                    store.FileSystemsCreator
	mmapv1CompressionSetting string
	storePath                string
	wtCompressionSetting     string
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *CreateOpts) Run() error {
	r, err := opts.store.CreateFileSystems(opts.newFileSystemConfiguration())
	if err != nil {
		return err
	}
	return opts.Print(r)
}

func (opts *CreateOpts) newFileSystemConfiguration() *opsmngr.FileSystemStoreConfiguration {
	return &opsmngr.FileSystemStoreConfiguration{
		BackupStore:              *opts.NewBackupStore(),
		MMAPV1CompressionSetting: opts.mmapv1CompressionSetting,
		StorePath:                opts.storePath,
		WTCompressionSetting:     opts.wtCompressionSetting,
	}
}

// mongocli ops-manager admin backup fileSystem(s) create [--assignment][--encryptedCredentials]
// [--label label][--loadFactor loadFactor][--name name][--storePath storePath][--mmapv1CompressionSetting mmapv1CompressionSetting]
// [--wtCompressionSetting wtCompressionSetting].
func CreateBuilder() *cobra.Command {
	opts := &CreateOpts{}
	opts.Template = createTemplate
	cmd := &cobra.Command{
		Use:   "create",
		Short: "Create a file system configuration.",
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.OutWriter = cmd.OutOrStdout()
			return opts.initStore(cmd.Context())()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().BoolVar(&opts.Assignment, flag.Assignment, false, usage.FileSystemAssignment)
	cmd.Flags().BoolVar(&opts.EncryptedCredentials, flag.EncryptedCredentials, false, usage.EncryptedCredentials)
	cmd.Flags().StringVar(&opts.ID, flag.Name, "", usage.FileSystemName)
	cmd.Flags().StringSliceVar(&opts.Label, flag.Label, []string{}, usage.Label)
	cmd.Flags().Int64Var(&opts.LoadFactor, flag.LoadFactor, 0, usage.LoadFactor)
	cmd.Flags().StringVar(&opts.mmapv1CompressionSetting, flag.MMAPV1CompressionSetting, "", usage.MMAPV1CompressionSetting)
	cmd.Flags().StringVar(&opts.wtCompressionSetting, flag.WTCompressionSetting, "", usage.WTCompressionSetting)
	cmd.Flags().StringVar(&opts.storePath, flag.StorePath, "", usage.StorePath)

	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.Name)
	_ = cmd.MarkFlagRequired(flag.StorePath)
	_ = cmd.MarkFlagRequired(flag.MMAPV1CompressionSetting)
	_ = cmd.MarkFlagRequired(flag.WTCompressionSetting)

	return cmd
}
