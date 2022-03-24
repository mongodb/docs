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
package serverless

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

var describeTemplate = `ID	NAME	MDB VER	STATE
{{.ID}}	{{.Name}}	{{.MongoDBVersion}}	{{.StateName}}
`

type DescribeOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	store        store.ServerlessInstanceDescriber
	instanceName string
}

func (opts *DescribeOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *DescribeOpts) Run() error {
	r, err := opts.store.ServerlessInstance(opts.ConfigProjectID(), opts.instanceName)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

// mongocli atlas serverless|sl describe <instanceName> --projectId projectId.
func DescribeBuilder() *cobra.Command {
	opts := new(DescribeOpts)
	cmd := &cobra.Command{
		Use:   "describe <instanceName>",
		Short: "Return one serverless instance in the specified project.",
		Long:  "Your API Key must have the Project Read Only role to successfully call this resource.",
		Args:  require.ExactArgs(1),
		Annotations: map[string]string{
			"args":             "instanceName",
			"instanceNameDesc": "Human-readable label that identifies your serverless instance.",
		},
		Aliases: []string{"get"},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.instanceName = args[0]
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), describeTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
