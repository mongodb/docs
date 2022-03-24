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
	"errors"
	"fmt"
	"io"

	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/spf13/cobra"
)

type whoOpts struct {
	OutWriter io.Writer
	account   string
}

func (opts *whoOpts) Run() error {
	_, _ = fmt.Fprintf(opts.OutWriter, "Logged in as %s\n", opts.account)

	return nil
}

func WhoAmIBuilder() *cobra.Command {
	opts := &whoOpts{}

	cmd := &cobra.Command{
		Use:   "whoami",
		Short: "Verifies and displays information about your authentication state.",
		Example: `  See the logged account:
  $ mongocli auth whoami
`,
		PreRun: func(cmd *cobra.Command, args []string) {
			opts.OutWriter = cmd.OutOrStdout()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			if config.AccessToken() == "" {
				return errors.New("not logged in")
			}
			s, err := config.AccessTokenSubject()
			if err != nil {
				return err
			}
			opts.account = s

			return opts.Run()
		},
		Args: require.NoArgs,
	}

	return cmd
}
