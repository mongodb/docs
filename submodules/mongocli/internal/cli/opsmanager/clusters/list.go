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

package clusters

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/convert"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
)

type ListOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	store store.CloudManagerClustersLister
}

func (opts *ListOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

// listTemplate used when project ID is given.
var listTemplate = `ID	NAME	TYPE	REPLICASET NAME{{range .Results}}
{{.ID}}	{{.ClusterName}}	{{.TypeName}}	{{.ReplicaSetName}}{{end}}
`

// listAllTemplate used fetching all clusters for all projects.
var listAllTemplate = `ID	NAME	TYPE{{range .Results}}{{range .Clusters}}
{{.ClusterID}}	{{.Name}}	{{.Type}}{{end}}{{end}}
`

func (opts *ListOpts) Run() error {
	r, err := opts.clusters()
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *ListOpts) template() string {
	if opts.ConfigProjectID() == "" {
		return listAllTemplate
	}
	return listTemplate
}

func (opts *ListOpts) clusters() (interface{}, error) {
	if opts.ConfigProjectID() == "" {
		return opts.store.ListAllProjectClusters()
	}
	if opts.ConfigOutput() == "" {
		return opts.store.ProjectClusters(opts.ConfigProjectID(), nil)
	}
	c, err := opts.store.GetAutomationConfig(opts.ConfigProjectID())
	if err != nil {
		return nil, err
	}
	r := convert.FromAutomationConfig(c)

	return r, nil
}

// mongocli cloud-manager cluster(s) list --projectId projectId.
func ListBuilder() *cobra.Command {
	opts := &ListOpts{}
	cmd := &cobra.Command{
		Use:     "list",
		Aliases: []string{"ls"},
		Short:   "List clusters for your project.",
		Long: `When listing clusters with no output format the information provided is defined by monitoring.
When using an output format the information will be provided by automation.`,
		Args: require.NoArgs,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			_ = opts.InitOutput(cmd.OutOrStdout(), opts.template())()
			return opts.PreRunE(opts.ValidateProjectID, opts.initStore(cmd.Context()))
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
