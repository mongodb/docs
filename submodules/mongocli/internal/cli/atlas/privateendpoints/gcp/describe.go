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

package gcp

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

var describeTemplate = `ID	GROUP NAME	REGION	STATUS	ERROR{{if .EndpointGroupNames}}{{range .EndpointGroupNames}}
{{$.ID}}	{{.}}	{{$.RegionName}}	{{$.Status}}	{{$.ErrorMessage}}{{end}}{{else}}
{{$.ID}}	N/A	{{$.RegionName}}	{{$.Status}}	{{$.ErrorMessage}}{{end}}
`

type DescribeOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	id    string
	store store.PrivateEndpointDescriber
}

func (opts *DescribeOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *DescribeOpts) Run() error {
	r, err := opts.store.PrivateEndpoint(opts.ConfigProjectID(), provider, opts.id)

	if err != nil {
		return err
	}

	return opts.Print(r)
}

// mongocli atlas privateEndpoint(s)|privateendpoint(s) gcp describe|get <ID> [--projectId projectId].
func DescribeBuilder() *cobra.Command {
	opts := new(DescribeOpts)
	cmd := &cobra.Command{
		Use:     "describe <privateEndpointId>",
		Aliases: []string{"get"},
		Args:    require.ExactArgs(1),
		Short:   "Return a specific GCP private endpoint for your project.",
		Annotations: map[string]string{
			"args":                  "privateEndpointId",
			"requiredArgs":          "privateEndpointId",
			"privateEndpointIdDesc": "Unique 22-character alphanumeric string that identifies the private endpoint.",
		},
		Example: `$ mongocli atlas privateEndpoint gcp describe vpce-abcdefg0123456789`,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.id = args[0]
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
