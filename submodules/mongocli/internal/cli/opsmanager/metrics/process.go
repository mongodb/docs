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

package metrics

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

type ProcessOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	cli.MetricsOpts
	hostID string
	store  store.HostMeasurementLister
}

func (opts *ProcessOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var metricTemplate = `NAME	UNITS	TIMESTAMP		VALUE{{range .Measurements}} {{if .DataPoints}}
{{- $name := .Name }}{{- $unit := .Units }}{{- range .DataPoints}}	
{{ $name }}	{{ $unit }}	{{.Timestamp}}	{{if .Value }}	{{ .Value }}{{else}}	N/A {{end}}{{end}}{{end}}{{end}}
`

func (opts *ProcessOpts) Run() error {
	listOpts := opts.NewProcessMetricsListOptions()
	r, err := opts.store.HostMeasurements(opts.ConfigProjectID(), opts.hostID, listOpts)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

// mongocli om|cm metric(s) process(es) <ID> [--granularity granularity] [--period period] [--start start] [--end end] [--type type][--projectId projectId].
func ProcessBuilder() *cobra.Command {
	opts := &ProcessOpts{}
	cmd := &cobra.Command{
		Use:     "process <ID>",
		Short:   "Get measurements for a given host.",
		Aliases: []string{"processes"},
		Args:    require.ExactArgs(1),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.ValidatePeriodStartEnd,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), metricTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.hostID = args[0]
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.Granularity, flag.Granularity, "", usage.Granularity)
	cmd.Flags().StringVar(&opts.Period, flag.Period, "", usage.Period)
	cmd.Flags().StringVar(&opts.Start, flag.Start, "", usage.MeasurementStart)
	cmd.Flags().StringVar(&opts.End, flag.End, "", usage.MeasurementEnd)
	cmd.Flags().StringSliceVar(&opts.MeasurementType, flag.Type, nil, usage.MeasurementType)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
