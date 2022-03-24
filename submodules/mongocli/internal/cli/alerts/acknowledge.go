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
	"fmt"
	"time"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

type AcknowledgeOpts struct {
	cli.GlobalOpts
	cli.OutputOpts
	alertID string
	until   string
	comment string
	forever bool
	store   store.AlertAcknowledger
}

func (opts *AcknowledgeOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

var ackTemplate = "Alert '{{.ID}}' acknowledged until {{.AcknowledgedUntil}}\n"

func (opts *AcknowledgeOpts) Run() error {
	body := opts.newAcknowledgeRequest()
	r, err := opts.store.AcknowledgeAlert(opts.ConfigProjectID(), opts.alertID, body)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *AcknowledgeOpts) newAcknowledgeRequest() *atlas.AcknowledgeRequest {
	if opts.forever {
		// To acknowledge an alert “forever”, set the field value to 100 years in the future.
		years := 100
		opts.until = time.Now().AddDate(years, 1, 1).Format(time.RFC3339)
	}

	return &atlas.AcknowledgeRequest{
		AcknowledgedUntil:      &opts.until,
		AcknowledgementComment: opts.comment,
	}
}

// mongocli atlas alerts acknowledge <ID> --projectId projectId --forever --comment comment --until until.
func AcknowledgeBuilder() *cobra.Command {
	opts := new(AcknowledgeOpts)
	opts.Template = ackTemplate
	cmd := &cobra.Command{
		Use:     "acknowledge <alertID>",
		Short:   "Acknowledges one alert for the specified project.",
		Aliases: []string{"ack"},
		Args:    require.ExactArgs(1),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if opts.forever && opts.until != "" {
				return fmt.Errorf("--%s and --%s are exclusive", flag.Forever, flag.Until)
			}
			return opts.PreRunE(
				opts.ValidateProjectID,
				opts.initStore(cmd.Context()),
				opts.InitOutput(cmd.OutOrStdout(), ackTemplate),
			)
		},
		Annotations: map[string]string{
			"args":        "alertId",
			"alertIdDesc": "ID of the alert you want to acknowledge or un-acknowledge.",
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.alertID = args[0]
			return opts.Run()
		},
	}
	cmd.OutOrStdout()
	cmd.Flags().BoolVarP(&opts.forever, flag.Forever, flag.ForeverShort, false, usage.Forever)
	cmd.Flags().StringVar(&opts.until, flag.Until, "", usage.Until)
	cmd.Flags().StringVar(&opts.comment, flag.Comment, "", usage.Comment)

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
