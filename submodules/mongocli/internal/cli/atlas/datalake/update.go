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
	"errors"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	"go.mongodb.org/atlas/mongodbatlas"
)

const aws = "AWS"

type UpdateOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	store      store.DataLakeUpdater
	name       string
	region     string
	role       string
	testBucket string
}

func (opts *UpdateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *UpdateOpts) newUpdateRequest() *mongodbatlas.DataLakeUpdateRequest {
	updateRequest := &mongodbatlas.DataLakeUpdateRequest{}

	if opts.region != "" {
		updateRequest.DataProcessRegion = &mongodbatlas.DataProcessRegion{
			CloudProvider: aws,
			Region:        opts.region,
		}
	}

	if opts.role != "" || opts.testBucket != "" {
		updateRequest.CloudProviderConfig = &mongodbatlas.CloudProviderConfig{
			AWSConfig: mongodbatlas.AwsCloudProviderConfig{
				IAMAssumedRoleARN: opts.role,
				TestS3Bucket:      opts.testBucket,
			},
		}
	}

	return updateRequest
}

var updateTemplate = "Data lake '{{.Name}}' updated.\n"

func (opts *UpdateOpts) Run() error {
	updateRequest := opts.newUpdateRequest()

	r, err := opts.store.UpdateDataLake(opts.ConfigProjectID(), opts.name, updateRequest)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

// mongocli atlas datalake(s) update <name> --projectId projectId [--role role] [--testBucket bucket] [--region region].
func UpdateBuilder() *cobra.Command {
	opts := &UpdateOpts{}
	cmd := &cobra.Command{
		Use:   "update <name>",
		Short: "Update a data lake for your project.",
		Args:  require.ExactArgs(1),
		Annotations: map[string]string{
			"args":     "name",
			"nameDesc": "Name of the Atlas Data Lake to update.",
		},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.name = args[0]

			if opts.region == "" && opts.role == "" && opts.testBucket == "" {
				return errors.New("nothing to update")
			}

			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), updateTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.region, flag.Region, "", usage.DataLakeRegion)
	cmd.Flags().StringVar(&opts.role, flag.Role, "", usage.DataLakeRole)
	cmd.Flags().StringVar(&opts.testBucket, flag.TestBucket, "", usage.DataLakeTestBucket)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
