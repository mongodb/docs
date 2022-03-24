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

package versionmanifest

import (
	"context"
	"fmt"
	"strings"

	"github.com/Masterminds/semver/v3"
	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/mongodb/mongocli/internal/store"
	"github.com/mongodb/mongocli/internal/usage"
	"github.com/spf13/cobra"
)

const updateTemplate = "Version manifest updated.\n"

type UpdateOpts struct {
	cli.OutputOpts
	versionManifest       string
	SkipVersionValidation bool
	store                 store.VersionManifestUpdaterServiceVersionDescriber
	storeStaticPath       store.VersionManifestGetter
}

func (opts *UpdateOpts) initStore(ctx context.Context) func() error {
	return func() error {
		var err error
		opts.store, err = store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx))
		if err != nil {
			return err
		}
		opts.storeStaticPath, err = store.NewVersionManifest(ctx, config.Default())
		return err
	}
}

func (opts *UpdateOpts) Run() error {
	svManifest, err := semver.NewVersion(opts.versionManifest)
	if err != nil {
		return fmt.Errorf("version '%s' is invalid, use the format x.y", opts.versionManifest)
	}

	if !opts.SkipVersionValidation {
		v, e := opts.store.ServiceVersion()
		if e != nil {
			return e
		}

		svOM, e := cli.ParseServiceVersion(v)
		if e != nil {
			return err
		}

		if svOM.Compare(svManifest) != 0 {
			return fmt.Errorf("version '%s' is incompatible with Ops Manager version '%s'", opts.versionManifest, v.Version)
		}
	}

	versionManifest, err := opts.storeStaticPath.GetVersionManifest(opts.version())
	if err != nil {
		return err
	}

	r, err := opts.store.UpdateVersionManifest(versionManifest)
	if err != nil {
		return err
	}

	return opts.Print(r)
}

func (opts *UpdateOpts) version() string {
	if strings.Contains(opts.versionManifest, ".json") {
		return opts.versionManifest
	}
	return opts.versionManifest + ".json"
}

// mongocli om versionManifest(s) update <version>.
func UpdateBuilder() *cobra.Command {
	opts := &UpdateOpts{}
	opts.Template = updateTemplate
	cmd := &cobra.Command{
		Use:   "update <version>",
		Short: "Update Ops Manager version manifest.",
		Args:  require.ExactArgs(1),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.OutWriter = cmd.OutOrStdout()
			return opts.initStore(cmd.Context())()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.versionManifest = args[0]
			return opts.Run()
		},
	}

	cmd.Flags().BoolVar(&opts.SkipVersionValidation, flag.Force, false, usage.ForceVersionManifest)
	cmd.Flags().StringVarP(&opts.Output, flag.Output, flag.OutputShort, "", usage.FormatOut)

	return cmd
}
