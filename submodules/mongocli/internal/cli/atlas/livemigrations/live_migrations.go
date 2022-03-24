// Copyright 2021 MongoDB Inc
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

package livemigrations

import (
	"github.com/mongodb/mongocli/internal/cli"
	"github.com/mongodb/mongocli/internal/cli/atlas/livemigrations/link"
	"github.com/mongodb/mongocli/internal/cli/atlas/livemigrations/validation"
	"github.com/spf13/cobra"
)

func Builder() *cobra.Command {
	const use = "liveMigrations"
	cmd := &cobra.Command{
		Use:     use,
		Aliases: cli.GenerateAliases(use, "lm"),
		Short:   "Manage a Live Migration to Atlas for your organization.",
	}

	cmd.AddCommand(
		link.Builder(),
		validation.Builder(),
		CreateBuilder(),
		DescribeBuilder(),
		CutoverBuilder(),
	)

	return cmd
}
