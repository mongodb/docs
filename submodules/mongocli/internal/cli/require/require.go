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

package require

import (
	"fmt"

	"github.com/mongodb/mongocli/internal/validate"
	"github.com/spf13/cobra"
	"github.com/tangzero/inflector"
)

// NoArgs returns an error if any args are included.
func NoArgs(cmd *cobra.Command, args []string) error {
	if len(args) > 0 {
		return fmt.Errorf(
			"%q accepts no arguments\n\nUsage:  %s",
			cmd.CommandPath(),
			cmd.UseLine(),
		)
	}
	return nil
}

// ExactArgs returns an error if there are not exactly n args.
func ExactArgs(n int) cobra.PositionalArgs {
	return func(cmd *cobra.Command, args []string) error {
		if len(args) != n {
			return fmt.Errorf(
				"%q requires %d %s, received %d\n\nUsage:  %s",
				cmd.CommandPath(),
				n,
				pluralize("argument", n),
				len(args),
				cmd.UseLine(),
			)
		}
		return nil
	}
}

// ExactArgsObjectID returns an error if there are not exactly n args and
// any of those args is not an ObjectID.
func ExactObjectIDArgs(n int) cobra.PositionalArgs {
	return func(cmd *cobra.Command, args []string) error {
		if err := ExactArgs(n)(cmd, args); err != nil {
			return err
		}
		return objectIDArgs(args)
	}
}

// MaximumNArgs returns an error if there are more than N args.
func MaximumNArgs(n int) cobra.PositionalArgs {
	return func(cmd *cobra.Command, args []string) error {
		if len(args) > n {
			return fmt.Errorf(
				"%q accepts at most %d %s, received %d\n\nUsage:  %s",
				cmd.CommandPath(),
				n,
				pluralize("argument", n),
				len(args),
				cmd.UseLine(),
			)
		}
		return nil
	}
}

// MinimumNArgs returns an error if there is not at least N args.
func MinimumNArgs(n int) cobra.PositionalArgs {
	return func(cmd *cobra.Command, args []string) error {
		if len(args) < n {
			return fmt.Errorf(
				"%q requires at least %d %s, received %d\n\nUsage:  %s",
				cmd.CommandPath(),
				n,
				pluralize("argument", n),
				len(args),
				cmd.UseLine(),
			)
		}
		return nil
	}
}

// MinimumNObjectIDArgs returns an error if there is not at least N args and
// any of those args is not an ObjectID.
func MinimumNObjectIDArgs(n int) cobra.PositionalArgs {
	return func(cmd *cobra.Command, args []string) error {
		if err := MinimumNArgs(n)(cmd, args); err != nil {
			return err
		}
		return objectIDArgs(args)
	}
}

func objectIDArgs(args []string) error {
	for _, arg := range args {
		if err := validate.ObjectID(arg); err != nil {
			return err
		}
	}
	return nil
}

// ExactValidArgs returns an error if
// there are not exactly N positional args OR
// there are any positional args that are not in the `ValidArgs` field of `Command`.
func ExactValidArgs(n int) cobra.PositionalArgs {
	return func(cmd *cobra.Command, args []string) error {
		if err := ExactArgs(n)(cmd, args); err != nil {
			return err
		}
		return cobra.OnlyValidArgs(cmd, args)
	}
}

func pluralize(word string, n int) string {
	if n == 1 {
		return word
	}
	return inflector.Pluralize(word)
}
