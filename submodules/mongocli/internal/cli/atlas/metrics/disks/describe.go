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

package disks

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

type DescribeOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	cli.MetricsOpts
	host  string
	port  int
	name  string
	store store.ProcessDiskMeasurementsLister
}

func (opts *DescribeOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *DescribeOpts) Run() error {
	listOpts := opts.NewProcessMetricsListOptions()
	r, err := opts.store.ProcessDiskMeasurements(opts.ConfigProjectID(), opts.host, opts.port, opts.name, listOpts)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

var diskMetricTemplate = `NAME	UNITS	TIMESTAMP		VALUE{{range .ProcessMeasurements.Measurements}}  {{if .DataPoints}}
{{- $name := .Name }}{{- $unit := .Units }}{{- range .DataPoints}}	
{{ $name }}	{{ $unit }}	{{.Timestamp}}	{{if .Value }}	{{ .Value }}{{else}}	N/A {{end}}{{end}}{{end}}{{end}}
`

// mcli atlas metric(s) disk(s) describe <host:port> <diskName> --granularity g --period p --start start --end end [--type type] [--projectId projectId].
func DescribeBuilder() *cobra.Command {
	const argsN = 2
	opts := &DescribeOpts{}
	cmd := &cobra.Command{
		Use:   "describe <hostname:port> <diskName>",
		Long:  `To retrieve the hostname and port needed for this command, run mongocli atlas process list.`,
		Short: "Describe disk partition metrics for a disk partition on a specified host.",
		Args:  require.ExactArgs(argsN),
		Annotations: map[string]string{
			"args":              "hostname:port,diskName",
			"requiredArgs":      "hostname:port,diskName",
			"hostname:portDesc": "Hostname and port number of the instance running the Atlas MongoDB process.",
			"diskNameDesc":      "Label that identifies the disk or partition from which you want to retrieve metrics.",
		},
		Example: `This example retrieves disks metrics for the database "testDB" in the host "atlas-lnmtkm-shard-00-00.ajlj3.mongodb.net:27017"
  $ mongocli atlas metrics disk describe atlas-lnmtkm-shard-00-00.ajlj3.mongodb.net:27017 testDB --granularity PT1M --period P1DT12H`,
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.ValidatePeriodStartEnd,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), diskMetricTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			var err error
			opts.host, opts.port, err = cli.GetHostnameAndPort(args[0])
			if err != nil {
				return err
			}
			opts.name = args[1]
			return opts.Run()
		},
	}

	cmd.Flags().IntVar(&opts.PageNum, flag.Page, 0, usage.Page)
	cmd.Flags().IntVar(&opts.ItemsPerPage, flag.Limit, 0, usage.Limit)

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
