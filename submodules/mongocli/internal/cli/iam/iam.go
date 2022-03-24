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

package iam

import (
	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/iam/globalaccesslists"
	"github.com/mongodb/mongocli/internal/cli/iam/globalapikeys"
	"github.com/mongodb/mongocli/internal/cli/iam/organizations"
	"github.com/mongodb/mongocli/internal/cli/iam/projects"
	"github.com/mongodb/mongocli/internal/cli/iam/teams"
	"github.com/mongodb/mongocli/internal/cli/iam/users"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/validate"
	"github.com/spf13/cobra"
)

func Builder() *cobra.Command {
	opts := &cli.RefresherOpts{}
	cmd := &cobra.Command{
		Use: "iam",
		PersistentPreRunE: func(cmd *cobra.Command, args []string) error {
			if err := opts.InitFlow(); err != nil {
				return err
			}
			if err := opts.RefreshAccessToken(cmd.Context()); err != nil {
				return err
			}
			if config.Service() == "" {
				config.SetService(config.CloudService)
			}
			return validate.Credentials()
		},
		Short: "Organization and projects operations.",
		Long:  "Identity and Access Management.",
		Annotations: map[string]string{
			"toc": "true",
		},
	}
	cmd.AddCommand(
		projects.Builder(),
		organizations.Builder(),
		globalapikeys.Builder(),
		globalaccesslists.Builder(),
		users.Builder(),
		teams.Builder(),
	)

	return cmd
}
