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

package processes

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

type Opts struct {
	cli.GlobalOpts
	cli.OutputOpts
	cli.MetricsOpts
	host  string
	port  int
	store store.ProcessMeasurementLister
}

func (opts *Opts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *Opts) Run() error {
	listOpts := opts.NewProcessMetricsListOptions()
	r, err := opts.store.ProcessMeasurements(opts.ConfigProjectID(), opts.host, opts.port, listOpts)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

var metricTemplate = `NAME	UNITS	TIMESTAMP		VALUE{{range .Measurements}} {{if .DataPoints}}
{{- $name := .Name }}{{- $unit := .Units }}{{- range .DataPoints}}	
{{ $name }}	{{ $unit }}	{{.Timestamp}}	{{if .Value }}	{{ .Value }}{{else}}	N/A {{end}}{{end}}{{end}}{{end}}
`

// mongocli atlas metric(s) process(es) <hostname:port> [--granularity granularity] [--period period] [--start start] [--end end] [--type type][--projectId projectId].
func Builder() *cobra.Command {
	opts := &Opts{}
	cmd := &cobra.Command{
		Use:     "processes <hostname:port>",
		Short:   "Get MongoDB process metrics for a given host.",
		Aliases: []string{"process"},
		Args:    require.ExactArgs(1),
		Annotations: map[string]string{
			"args":              "hostname:port",
			"requiredArgs":      "hostname:port",
			"hostname:portDesc": "Hostname and port number of the instance running the Atlas MongoDB process.",
		},
		Example: `
  $ mongocli atlas metrics process atlas-lnmtkm-shard-00-00.ajlj3.mongodb.net:27017`,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.ValidatePeriodStartEnd,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), metricTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			var err error
			opts.host, opts.port, err = cli.GetHostnameAndPort(args[0])
			if err != nil {
				return err
			}

			return opts.Run()
		},
	}
	cmd.Flags().IntVar(&opts.PageNum, flag.Page, cli.DefaultPage, usage.Page)
	cmd.Flags().IntVar(&opts.ItemsPerPage, flag.Limit, cli.DefaultPageLimit, usage.Limit)

	cmd.Flags().StringVar(&opts.Granularity, flag.Granularity, "", usage.Granularity)
	cmd.Flags().StringVar(&opts.Period, flag.Period, "", usage.Period)
	cmd.Flags().StringVar(&opts.Start, flag.Start, "", usage.MeasurementStart)
	cmd.Flags().StringVar(&opts.End, flag.End, "", usage.MeasurementEnd)
	cmd.Flags().StringSliceVar(&opts.MeasurementType, flag.Type, nil, usage.MeasurementType)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	_ = cmd.MarkFlagRequired(flag.Granularity)

	return cmd
}
