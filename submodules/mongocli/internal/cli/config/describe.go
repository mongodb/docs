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

package config

import (
	"fmt"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
)

type describeOpts struct {
	name string
	cli.OutputOpts
}

var descTemplate = `SETTING	VALUE{{ range $key, $value := . }}
{{$key}}	{{$value}}{{end}}
`

func (opts *describeOpts) Run() error {
	if !config.Exists(opts.name) {
		return fmt.Errorf("no profile with name '%s'", opts.name)
	}
	config.SetName(opts.name)
	return opts.Print(config.Map())
}

func DescribeBuilder() *cobra.Command {
	opts := &describeOpts{}
	opts.Template = descTemplate
	cmd := &cobra.Command{
		Use:     "describe <name>",
		Aliases: []string{"get"},
		Short:   "Return a specific profile.",
		Args:    require.ExactArgs(1),
		PreRun: func(cmd *cobra.Command, args []string) {
			opts.OutWriter = cmd.OutOrStdout()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.name = args[0]
			return opts.Run()
		},
	}

	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
