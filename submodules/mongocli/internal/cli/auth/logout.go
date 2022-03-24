// Copyright 2022 MongoDB Inc
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

package auth

import (
	"context"
	"errors"
	"io"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/oauth"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

type logoutOpts struct {
	*cli.DeleteOpts
	OutWriter io.Writer
	config    ConfigDeleter
	flow      Revoker
}

//go:generate mockgen -destination=../../mocks/mock_logout.go -package=mocks github.com/mongodb/mongocli/internal/cli/auth Revoker,ConfigDeleter

type ConfigDeleter interface {
	Delete() error
}

type Revoker interface {
	RevokeToken(context.Context, string, string) (*atlas.Response, error)
}

func (opts *logoutOpts) initFlow() error {
	var err error
	opts.flow, err = oauth.FlowWithConfig(config.Default())
	return err
}

func (opts *logoutOpts) Run(ctx context.Context) error {
	// revoking a refresh token revokes the access token
	if _, err := opts.flow.RevokeToken(ctx, config.RefreshToken(), "refresh_token"); err != nil {
		return err
	}

	return opts.Delete(opts.config.Delete)
}

func LogoutBuilder() *cobra.Command {
	opts := &logoutOpts{
		DeleteOpts: cli.NewDeleteOpts("Successfully logged out of account %s\n", " "),
	}

	cmd := &cobra.Command{
		Use:   "logout",
		Short: "Log out of the CLI.",
		Example: `  To log out from the CLI:
  $ mongocli auth logout
`,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.OutWriter = cmd.OutOrStdout()
			opts.config = config.Default()
			return opts.initFlow()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			if config.RefreshToken() == "" {
				return errors.New("not logged in")
			}
			s, err := config.AccessTokenSubject()
			if err != nil {
				return err
			}
			opts.Entry = s
			if err := opts.PromptWithMessage("Are you sure you want to log out of account %s?"); err != nil {
				return err
			}
			return opts.Run(cmd.Context())
		},
		Args: require.NoArgs,
	}

	cmd.Flags().BoolVar(&opts.Confirm, flag.Force, false, usage.Force)

	return cmd
}
