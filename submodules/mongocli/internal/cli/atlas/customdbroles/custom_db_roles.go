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

package customdbroles

import (
	"github.com/mongodb/mongocli/internal/cli"
	"github.com/spf13/cobra"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

func Builder() *cobra.Command {
	const use = "customDbRoles"
	cmd := &cobra.Command{
		Use:     use,
		Aliases: cli.GenerateAliases(use, "customDBRoles"),
		Short:   "Manage custom database roles for your project.",
	}
	cmd.AddCommand(
		CreateBuilder(),
		DescribeBuilder(),
		ListBuilder(),
		DeleteBuilder(),
		UpdateBuilder(),
	)

	return cmd
}

// appendActions adds existing actions to the request, ti will also take care in.
func appendActions(existingActions, newActions []atlas.Action) []atlas.Action {
	out := make([]atlas.Action, 0)
	actionMap := make(map[string]atlas.Action)
	for _, action := range existingActions {
		actionMap[action.Action] = action
	}
	for _, action := range newActions {
		if a, ok := actionMap[action.Action]; ok {
			action.Resources = append(action.Resources, a.Resources...)
			out = append(out, action)
			delete(actionMap, action.Action)
			continue
		}
		out = append(out, action)
	}
	for _, action := range actionMap {
		out = append(out, action)
	}
	return out
}

// joinActions will merge the resources for a same action given actions must be unique.
func joinActions(newActions []atlas.Action) []atlas.Action {
	out := make([]atlas.Action, 0)
	actionMap := make(map[string]atlas.Action)
	for _, action := range newActions {
		if a, ok := actionMap[action.Action]; ok {
			action.Resources = append(action.Resources, a.Resources...)
		}
		actionMap[action.Action] = action
	}
	for _, action := range actionMap {
		out = append(out, action)
	}
	return out
}
