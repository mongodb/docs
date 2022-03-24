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

package settings

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
)

type FieldsTypeOpts struct {
	cli.OutputOpts
	store store.MatcherFieldsLister
}

func (opts *FieldsTypeOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var matcherFieldsTemplate = "{{range .}}{{.}}\n{{end}}"

func (opts *FieldsTypeOpts) Run() error {
	r, err := opts.store.MatcherFields()
	if err != nil {
		return err
	}

	return opts.Print(r)
}

// mongocli atlas alerts config(s) fields type.
func FieldsTypeBuilder() *cobra.Command {
	opts := &FieldsTypeOpts{}
	opts.Template = matcherFieldsTemplate
	cmd := &cobra.Command{
		Use:     "type",
		Short:   "Lists available field types for your alert configurations.",
		Aliases: []string{"types"},
		Args:    require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.OutWriter = cmd.OutOrStdout()
			return opts.initStore(cmd.Context())()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
