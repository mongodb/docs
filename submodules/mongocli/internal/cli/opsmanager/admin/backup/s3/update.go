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

package s3

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
	"go.mongodb.org/ops-manager/opsmngr"
)

var updateTemplate = "S3 blockstore configuration '{{.ID}}' updated.\n"

type UpdateOpts struct {
	cli.OutputOpts
	backup.AdminOpts
	store                  store.S3BlockstoresUpdater
	awsAccessKey           string
	awsSecretKey           string
	s3AuthMethod           string
	s3BucketEndpoint       string
	s3BucketName           string
	s3MaxConnections       int64
	disableProxyS3         bool
	acceptedTos            bool
	sseEnabled             bool
	pathStyleAccessEnabled bool
}

func (opts *UpdateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *UpdateOpts) Run() error {
	r, err := opts.store.UpdateS3Blockstores(opts.ID, opts.newS3Blockstore())
	if err != nil {
		return err
	}
	return opts.Print(r)
}

func (opts *UpdateOpts) newS3Blockstore() *opsmngr.S3Blockstore {
	return &opsmngr.S3Blockstore{
		BackupStore:            *opts.NewBackupStore(),
		AWSAccessKey:           opts.awsAccessKey,
		AWSSecretKey:           opts.awsSecretKey,
		S3AuthMethod:           opts.s3AuthMethod,
		S3BucketEndpoint:       opts.s3BucketEndpoint,
		S3BucketName:           opts.s3BucketName,
		S3MaxConnections:       opts.s3MaxConnections,
		AcceptedTos:            &opts.acceptedTos,
		SSEEnabled:             &opts.sseEnabled,
		DisableProxyS3:         &opts.disableProxyS3,
		PathStyleAccessEnabled: &opts.pathStyleAccessEnabled,
	}
}

// mongocli ops-manager admin backup blockstore(s) update name [--assignment][--encryptedCredentials]
// [--label label][--loadFactor loadFactor][--uri uri][--ssl][--writeConcern writeConcern] [--awsAccessKey awsAccessKey]
// [--awsSecretKey awsSecretKey] [--s3AuthMethod s3AuthMethod] [--s3BucketEndpoint s3BucketEndpoint] [--s3BucketName s3BucketName]
// [--s3MaxConnections s3MaxConnections] [--disableProxyS3 disableProxyS3] [--acceptedTos acceptedTos] [--sseEnabled sseEnabled]
// [--pathStyleAccessEnabled pathStyleAccessEnabled]

func UpdateBuilder() *cobra.Command {
	opts := &UpdateOpts{}
	opts.Template = updateTemplate
	cmd := &cobra.Command{
		Use:   "update <name>",
		Args:  require.ExactArgs(1),
		Short: "Update a backup S3 blockstore configuration.",
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
	cmd.Flags().BoolVar(&opts.Assignment, flag.Assignment, false, usage.BlockstoreAssignment)
	cmd.Flags().BoolVar(&opts.EncryptedCredentials, flag.EncryptedCredentials, false, usage.EncryptedCredentials)
	cmd.Flags().Int64Var(&opts.LoadFactor, flag.LoadFactor, 0, usage.LoadFactor)
	cmd.Flags().StringVar(&opts.URI, flag.URI, "", usage.BlockstoreURI)
	cmd.Flags().StringVar(&opts.WriteConcern, flag.WriteConcern, "", usage.WriteConcern)
	cmd.Flags().StringVar(&opts.awsAccessKey, flag.AWSAccessKey, "", usage.AWSAccessKey)
	cmd.Flags().StringVar(&opts.awsSecretKey, flag.AWSSecretKey, "", usage.AWSSecretKey)
	cmd.Flags().StringVar(&opts.s3AuthMethod, flag.S3AuthMethod, "", usage.S3AuthMethod)
	cmd.Flags().StringVar(&opts.s3BucketEndpoint, flag.S3BucketEndpoint, "", usage.S3BucketEndpoint)
	cmd.Flags().StringVar(&opts.s3BucketName, flag.S3BucketName, "", usage.S3BucketName)
	cmd.Flags().Int64Var(&opts.s3MaxConnections, flag.S3MaxConnections, 0, usage.S3MaxConnections)
	cmd.Flags().BoolVar(&opts.disableProxyS3, flag.DisableProxyS3, false, usage.DisableProxyS3)
	cmd.Flags().BoolVar(&opts.acceptedTos, flag.AcceptedTos, false, usage.AcceptedTos)
	cmd.Flags().BoolVar(&opts.sseEnabled, flag.SSEEnabled, false, usage.SSEEnabled)
	cmd.Flags().BoolVar(&opts.pathStyleAccessEnabled, flag.PathStyleAccessEnabled, false, usage.PathStyleAccessEnabled)

	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.URI)
	_ = cmd.MarkFlagRequired(flag.AcceptedTos)
	_ = cmd.MarkFlagRequired(flag.S3BucketName)
	_ = cmd.MarkFlagRequired(flag.S3BucketEndpoint)
	_ = cmd.MarkFlagRequired(flag.S3AuthMethod)

	return cmd
}
