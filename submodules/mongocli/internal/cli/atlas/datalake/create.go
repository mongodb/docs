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

package datalake

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	"go.mongodb.org/atlas/mongodbatlas"
)

type CreateOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	store      store.DataLakeCreator
	name       string
	awsRoleID  string
	testBucket string
}

func (opts *CreateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var createTemplate = "Data lake '{{.Name}}' created.\n"

func (opts *CreateOpts) Run() error {
	createRequest := opts.newDataLakeRequest()

	r, err := opts.store.CreateDataLake(opts.ConfigProjectID(), createRequest)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *CreateOpts) newDataLakeRequest() *mongodbatlas.DataLakeCreateRequest {
	return &mongodbatlas.DataLakeCreateRequest{
		Name: opts.name,
		CloudProviderConfig: &mongodbatlas.CloudProviderConfig{
			AWSConfig: mongodbatlas.AwsCloudProviderConfig{
				RoleID:       opts.awsRoleID,
				TestS3Bucket: opts.testBucket,
			},
		},
	}
}

// mongocli atlas datalake(s) create <name> --projectId projectId.
func CreateBuilder() *cobra.Command {
	opts := &CreateOpts{}
	cmd := &cobra.Command{
		Use:   "create <name>",
		Short: "Create a new data lake for your project.",
		Args:  require.ExactArgs(1),
		Annotations: map[string]string{
			"args":     "name",
			"nameDesc": "Name of the Atlas Data Lake to create.",
		},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.name = args[0]
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), createTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.awsRoleID, flag.Role, "", usage.DataLakeRole)
	cmd.Flags().StringVar(&opts.testBucket, flag.TestBucket, "", usage.DataLakeTestBucket)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.Role)
	_ = cmd.MarkFlagRequired(flag.TestBucket)

	return cmd
}
