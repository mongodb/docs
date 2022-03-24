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

package config

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	"go.mongodb.org/ops-manager/opsmngr"
)

const updateTemplate = "Backup Configuration updated.\n"

type UpdateOpts struct {
	cli.OutputOpts
	cli.GlobalOpts
	store             store.BackupConfigUpdater
	clusterID         string
	status            string
	storageEngine     string
	authMechanism     string
	username          string
	password          string
	encryption        bool
	ssl               bool
	syncSource        string
	provisioned       bool
	excludedNamespace []string
	includedNamespace []string
}

func (opts *UpdateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *UpdateOpts) Run() error {
	r, err := opts.store.UpdateBackupConfig(opts.newBackupConfig())

	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *UpdateOpts) newBackupConfig() *opsmngr.BackupConfig {
	backupConfig := &opsmngr.BackupConfig{
		GroupID:            opts.ConfigProjectID(),
		ClusterID:          opts.clusterID,
		StatusName:         opts.status,
		StorageEngineName:  opts.storageEngine,
		ExcludedNamespaces: opts.excludedNamespace,
		IncludedNamespaces: opts.includedNamespace,
		AuthMechanismName:  opts.authMechanism,
		Password:           opts.password,
		SyncSource:         opts.syncSource,
		Username:           opts.username,
	}

	if opts.ssl {
		backupConfig.SSLEnabled = &opts.ssl
	}

	if opts.encryption {
		backupConfig.EncryptionEnabled = &opts.encryption
	}

	if opts.provisioned {
		backupConfig.Provisioned = &opts.provisioned
	}

	return backupConfig
}

// mongocli ops-manager backup config update clusterID --status status --storageEngine storageEngine --authMechanism authMechanism
// --username username --password password --provisioned provisioned --encryption encryption
// --ssl ssl --syncSource syncSource --excludedNamespace excludedNamespace --includedNamespace includedNamespace[--projectId projectId].
func UpdateBuilder() *cobra.Command {
	opts := &UpdateOpts{}
	opts.Template = updateTemplate
	cmd := &cobra.Command{
		Use:   "update <clusterID>",
		Short: "Update a backup configuration.",
		Args:  require.ExactArgs(1),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.OutWriter = cmd.OutOrStdout()
			return opts.PreRunE(opts.ValidateProjectID, opts.initStore(cmd.Context()))
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.clusterID = args[0]
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.status, flag.Status, "", usage.BackupStatus)
	cmd.Flags().StringVar(&opts.storageEngine, flag.StorageEngine, "", usage.StorageEngine)
	cmd.Flags().StringVar(&opts.authMechanism, flag.AuthMechanism, "", usage.AuthMechanism)
	cmd.Flags().StringVar(&opts.username, flag.Username, "", usage.Username)
	cmd.Flags().StringVar(&opts.password, flag.Password, "", usage.Password)
	cmd.Flags().BoolVar(&opts.provisioned, flag.Provisioned, false, usage.Provisioned)
	cmd.Flags().BoolVar(&opts.encryption, flag.Encryption, false, usage.Encryption)
	cmd.Flags().BoolVar(&opts.ssl, flag.SSL, false, usage.SSL)
	cmd.Flags().StringVar(&opts.syncSource, flag.SyncSource, "", usage.SyncSource)
	cmd.Flags().StringSliceVar(&opts.excludedNamespace, flag.ExcludedNamespace, []string{}, usage.ExcludedNamespace)
	cmd.Flags().StringSliceVar(&opts.includedNamespace, flag.IncludedNamespace, []string{}, usage.IncludedNamespace)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
