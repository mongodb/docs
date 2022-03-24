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

package security

import (
	"context"
	"fmt"

	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
	"go.mongodb.org/ops-manager/atmcfg"
)

const (
	cr     = "MONGODB-CR"
	sha1   = "SCRAM-SHA-1"
	sha256 = "SCRAM-SHA-256"
)

type EnableOpts struct {
	cli.GlobalOpts
	mechanisms []string
	store      store.AutomationPatcher
}

func (opts *EnableOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		return err
	}
}

func (opts *EnableOpts) Run() error {
	current, err := opts.store.GetAutomationConfig(opts.ConfigProjectID())

	if err != nil {
		return err
	}

	if err := atmcfg.EnableMechanism(current, opts.mechanisms); err != nil {
		return err
	}
	if err := opts.store.UpdateAutomationConfig(opts.ConfigProjectID(), current); err != nil {
		return err
	}

	fmt.Print(cli.DeploymentStatus(config.OpsManagerURL(), opts.ConfigProjectID()))

	return nil
}

// mongocli ops-manager security enable <MONGODB-CR|SCRAM-SHA-256>  [--projectId projectId].
func EnableBuilder() *cobra.Command {
	opts := &EnableOpts{}
	cmd := &cobra.Command{
		Use:       fmt.Sprintf("enable <%s|%s>", cr, sha256),
		Short:     "Enable authentication mechanisms for your project.",
		Args:      cobra.OnlyValidArgs,
		ValidArgs: []string{cr, sha1, sha256},
		PreRunE: func(cmd *cobra.Command, args []string) error {
			return opts.PreRunE(opts.ValidateProjectID, opts.initStore(cmd.Context()))
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.mechanisms = args
			return opts.Run()
		},
	}

	cmd.Flags().StringVar(&opts.ProjectID, flag.ProjectID, "", usage.ProjectID)

	return cmd
}
