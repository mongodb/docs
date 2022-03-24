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

package alerts

import (
	"context"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

type UnacknowledgeOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	alertID string
	comment string
	store   store.AlertAcknowledger
}

func (opts *UnacknowledgeOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var unackTemplate = "Alert '{{.ID}}' unacknowledged\n"

func (opts *UnacknowledgeOpts) Run() error {
	body := opts.newAcknowledgeRequest()
	r, err := opts.store.AcknowledgeAlert(opts.ConfigProjectID(), opts.alertID, body)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *UnacknowledgeOpts) newAcknowledgeRequest() *atlas.AcknowledgeRequest {
	return &atlas.AcknowledgeRequest{
		AcknowledgedUntil:      nil,
		AcknowledgementComment: opts.comment,
	}
}

// mongocli atlas alerts unacknowledge <ID> --projectId projectId --comment comment.
func UnacknowledgeBuilder() *cobra.Command {
	opts := new(UnacknowledgeOpts)
	cmd := &cobra.Command{
		Use:     "unacknowledge <alertID>",
		Short:   "Unacknowledges one alert for the specified project.",
		Aliases: []string{"unack"},
		Args:    require.ExactArgs(1),
		Annotations: map[string]string{
			"args":        "alertId",
			"alertIdDesc": "ID of the alert you want to unacknowledge.",
		},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), unackTemplate),
			)
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.alertID = args[0]
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.comment, flag.Comment, "", usage.Comment)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
