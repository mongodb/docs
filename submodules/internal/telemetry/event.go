// Copyright 2022 MongoDB Inc
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

package telemetry

import (
	"crypto/sha256"
	"encoding/base64"
	"os"
	"regexp"
	"runtime"
	"strings"
	"time"

	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/flag"
	"github.com/mongodb/mongodb-atlas-cli/internal/homebrew"
	"github.com/mongodb/mongodb-atlas-cli/internal/log"
	"github.com/mongodb/mongodb-atlas-cli/internal/terminal"
	"github.com/mongodb/mongodb-atlas-cli/internal/version"
	"github.com/spf13/afero"
	"github.com/spf13/cobra"
	"github.com/spf13/pflag"
)

type Event struct {
	Timestamp  time.Time              `json:"timestamp"`
	Source     string                 `json:"source"`
	Properties map[string]interface{} `json:"properties"`
}

type eventOpt func(Event)

func withHelpCommand(cmd *cobra.Command, args []string) eventOpt {
	return func(event Event) {
		if cmd.Name() != "help" {
			return
		}

		helpCmd, _, err := cmd.Root().Find(args)
		if err != nil {
			_, _ = log.Debugf("telemetry: failed to find help command: %v\n", err)
			return
		}

		event.Properties["help_command"] = strings.ReplaceAll(helpCmd.CommandPath(), " ", "-")
	}
}

func withProfile() eventOpt { // either "default" or base64 hash
	return func(event Event) {
		if config.Name() == config.DefaultProfile {
			event.Properties["profile"] = config.DefaultProfile
			return
		}

		h := sha256.Sum256([]byte(config.Name()))
		event.Properties["profile"] = base64.StdEncoding.EncodeToString(h[:])
	}
}

func withPrompt(p, k string) eventOpt {
	return func(event Event) {
		event.Properties["prompt"] = sanitizePrompt(p)
		event.Properties["prompt_type"] = k
	}
}

func withChoice(c string) eventOpt {
	return func(event Event) {
		event.Properties["choice"] = sanitizeSelectOption(c)
	}
}

func sanitizeSelectOption(v string) string {
	parenthesesRegex := regexp.MustCompile(`^.*\(([^\(\)]*)\)$`)

	return parenthesesRegex.ReplaceAllString(v, "$1")
}

func sanitizePrompt(q string) string {
	bracketsRegex := regexp.MustCompile(`\[[^\]\[]*\]`)

	return bracketsRegex.ReplaceAllString(q, "[]")
}

func withDefault(d bool) eventOpt {
	return func(event Event) {
		event.Properties["default"] = d
	}
}

func withEmpty(e bool) eventOpt {
	return func(event Event) {
		event.Properties["empty"] = e
	}
}

func withCommandPath(cmd *cobra.Command) eventOpt {
	return func(event Event) {
		cmdPath := cmd.CommandPath()
		event.Properties["command"] = strings.ReplaceAll(cmdPath, " ", "-")
		if cmd.CalledAs() != "" {
			event.Properties["alias"] = cmd.CalledAs()
		}
	}
}

func withDuration(cmd *cobra.Command) eventOpt {
	return func(event Event) {
		if cmd.Context() == nil {
			_, _ = log.Debugln("telemetry: context not found")
			return
		}

		ctxValue, found := cmd.Context().Value(contextKey).(telemetryContextValue)
		if !found {
			_, _ = log.Debugln("telemetry: context not found")
			return
		}

		event.Properties["duration"] = event.Timestamp.Sub(ctxValue.startTime).Milliseconds()
	}
}

func withFlags(cmd *cobra.Command) eventOpt {
	return func(event Event) {
		setFlags := make([]string, 0, cmd.Flags().NFlag())
		cmd.Flags().Visit(func(f *pflag.Flag) {
			setFlags = append(setFlags, f.Name)
		})

		if len(setFlags) > 0 {
			event.Properties["flags"] = setFlags
		}
	}
}

func withVersion() eventOpt {
	return func(event Event) {
		event.Properties["version"] = version.Version
		event.Properties["git_commit"] = version.GitCommit
	}
}

func withOS() eventOpt {
	return func(event Event) {
		event.Properties["os"] = runtime.GOOS
		event.Properties["arch"] = runtime.GOARCH
	}
}

func withAuthMethod() eventOpt {
	return func(event Event) {
		if config.PublicAPIKey() != "" && config.PrivateAPIKey() != "" {
			event.Properties["auth_method"] = "api_key"
			return
		}

		event.Properties["auth_method"] = "oauth"
	}
}

func withService() eventOpt {
	return func(event Event) {
		event.Properties["service"] = config.Service()
		if config.OpsManagerURL() != "" {
			event.Properties["ops_manager_url"] = config.OpsManagerURL()
		}
	}
}

func withProjectID(cmd *cobra.Command) eventOpt {
	return func(event Event) {
		fromFlag, _ := cmd.Flags().GetString(flag.ProjectID)

		if fromFlag != "" {
			event.Properties["project_id"] = fromFlag
			return
		}

		if config.ProjectID() != "" {
			event.Properties["project_id"] = config.ProjectID()
		}
	}
}

func withOrgID(cmd *cobra.Command) eventOpt {
	return func(event Event) {
		fromFlag, _ := cmd.Flags().GetString(flag.OrgID)

		if fromFlag != "" {
			event.Properties["org_id"] = fromFlag
			return
		}

		if config.OrgID() != "" {
			event.Properties["org_id"] = config.OrgID()
		}
	}
}

func withTerminal() eventOpt {
	return func(event Event) {
		if terminal.IsCygwinTerminal(os.Stdout) {
			event.Properties["terminal"] = "cygwin"
		}

		if terminal.IsTerminal(os.Stdout) {
			event.Properties["terminal"] = "tty"
			return
		}
	}
}

func withInstaller(fs afero.Fs) eventOpt {
	return func(event Event) {
		c, err := homebrew.NewChecker(fs)
		if err != nil {
			_, _ = log.Debugf("telemetry: failed to generate homebrew checker: %v\n", err)
			return
		}
		if c.IsHomebrew() {
			event.Properties["installer"] = "brew"
		}
	}
}

func withError(err error) eventOpt {
	return func(event Event) {
		event.Properties["result"] = "ERROR"

		errorMessage := strings.Split(err.Error(), "\n")[0] // only first line

		event.Properties["error"] = errorMessage
	}
}

func withSignal(s string) eventOpt {
	return func(event Event) {
		event.Properties["signal"] = s
	}
}

func newEvent(opts ...eventOpt) Event {
	var event = Event{
		Timestamp: time.Now(),
		Source:    config.ToolName,
		Properties: map[string]interface{}{
			"result": "SUCCESS",
		},
	}

	for _, fn := range opts {
		fn(event)
	}

	return event
}
