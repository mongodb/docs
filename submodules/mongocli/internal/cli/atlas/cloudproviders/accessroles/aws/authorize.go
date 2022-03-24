// Copyright 2021 MongoDB Inc
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

package aws

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

const authorizeTemplate = "AWS IAM role '{{.RoleID}} successfully authorized.\n"

type AuthorizeOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	store             store.CloudProviderAccessRoleAuthorizer
	roleID            string
	IAMAssumedRoleARN string
}

func (opts *AuthorizeOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *AuthorizeOpts) Run() error {
	r, err := opts.store.AuthorizeCloudProviderAccessRole(opts.ConfigProjectID(), opts.roleID, opts.newCloudProviderAuthorizationRequest())
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *AuthorizeOpts) newCloudProviderAuthorizationRequest() *atlas.CloudProviderAuthorizationRequest {
	return &atlas.CloudProviderAuthorizationRequest{
		ProviderName:      provider,
		IAMAssumedRoleARN: opts.IAMAssumedRoleARN,
	}
}

// mongocli atlas cloudProvider aws accessRoles authorize <roleId> --iamAssumedRoleArn iamAssumedRoleArn [--projectId projectId].
func AuthorizeBuilder() *cobra.Command {
	opts := &AuthorizeOpts{}
	cmd := &cobra.Command{
		Use:   "authorize <roleId>",
		Short: "Authorize an AWS IAM role.",
		Args:  require.ExactArgs(1),
		Annotations: map[string]string{
			"args":       "roleId",
			"roleIdDesc": "Unique ID of the role to authorize.",
		},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), authorizeTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.roleID = args[0]
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.IAMAssumedRoleARN, flag.IAMAssumedRoleARN, "", usage.IAMAssumedRoleARN)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagFilename(flag.IAMAssumedRoleARN)
	return cmd
}
