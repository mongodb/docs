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

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongocli/internal/cli/require"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/prompt"
	"github.com/spf13/cobra"
)

type RenameOpts struct {
	oldName string
	newName string
}

func (opts *RenameOpts) Run() error {
	if !config.Exists(opts.oldName) {
		return fmt.Errorf("profile %s does not exist", opts.oldName)
	}

	if config.Exists(opts.newName) {
		replaceExistingProfile := false
		p := prompt.NewProfileReplaceConfirm(opts.newName)
		if err := survey.AskOne(p, &replaceExistingProfile); err != nil {
			return err
		}

		if !replaceExistingProfile {
			fmt.Printf("Profile was not renamed.\n")
			return nil
		}
	}

	config.SetName(opts.oldName)
	if err := config.Rename(opts.newName); err != nil {
		return err
	}

	fmt.Printf("The profile %v was renamed to %v.\n", opts.oldName, opts.newName)
	return nil
}

func RenameBuilder() *cobra.Command {
	const argsN = 2
	opts := &RenameOpts{}
	cmd := &cobra.Command{
		Use:     "rename <oldName> <newName>",
		Aliases: []string{"mv"},
		Short:   "Rename a profile.",
		Args:    require.ExactArgs(argsN),
		RunE: func(cmd *cobra.Command, args []string) error {
			opts.oldName = args[0]
			opts.newName = args[1]
			return opts.Run()
		},
	}

	return cmd
}
