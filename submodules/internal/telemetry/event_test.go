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
	"errors"
	"runtime"
	"testing"
	"time"

	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/flag"
	"github.com/mongodb/mongodb-atlas-cli/internal/test"
	"github.com/mongodb/mongodb-atlas-cli/internal/version"
	"github.com/spf13/cobra"
	"github.com/stretchr/testify/assert"
)

func TestWithCommandPath(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI
	testCmd := &cobra.Command{
		Use: "test",
	}
	rootCmd := &cobra.Command{
		Use: "root",
	}
	rootCmd.AddCommand(testCmd)

	e := newEvent(withCommandPath(testCmd))

	a := assert.New(t)
	a.Equal("root-test", e.Properties["command"])
}

func TestWithCommandPathAndAlias(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI
	rootCmd := &cobra.Command{
		Use: "root",
	}
	rootCmd.AddCommand(&cobra.Command{
		Use:     "test",
		Aliases: []string{"t"},
	})
	rootCmd.SetArgs([]string{"t"})
	calledCmd, _ := rootCmd.ExecuteContextC(NewContext())

	e := newEvent(withCommandPath(calledCmd))

	a := assert.New(t)
	a.Equal("root-test", e.Properties["command"])
	a.Equal("t", e.Properties["alias"])
}

func TestWithProfileDefault(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	e := newEvent(withProfile())

	a := assert.New(t)
	a.Equal(config.DefaultProfile, e.Properties["profile"])
}

func TestWithProfileCustom(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	const profile = "test"
	config.SetName(profile)

	e := newEvent(withProfile())

	a := assert.New(t)
	a.NotEqual(e.Properties["profile"], config.DefaultProfile)
	a.NotEqual(e.Properties["profile"], profile) // should be a base64
}

func TestWithDuration(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	cmd := &cobra.Command{
		Use: "test-command",
		Run: func(cmd *cobra.Command, args []string) {
			time.Sleep(10 * time.Millisecond)
		},
	}
	_ = cmd.ExecuteContext(NewContext())

	e := newEvent(withDuration(cmd))

	a := assert.New(t)
	a.GreaterOrEqual(e.Properties["duration"], int64(10))
}

func TestWithFlags(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	cmd := &cobra.Command{
		Use: "test-command",
		Run: func(cmd *cobra.Command, args []string) {
			time.Sleep(10 * time.Millisecond)
		},
	}
	_ = cmd.Flags().Bool("test", false, "")
	_ = cmd.Flags().Bool("test2", false, "")
	_ = cmd.ParseFlags([]string{"--test"})
	_ = cmd.ExecuteContext(NewContext())

	e := newEvent(withFlags(cmd))

	a := assert.New(t)
	a.Equal(e.Properties["flags"], []string{"test"})
}

func TestWithVersion(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	version.Version = "vTest"
	version.GitCommit = "sha-test"

	e := newEvent(withVersion())

	a := assert.New(t)
	a.Equal(e.Properties["version"], "vTest")
	a.Equal(e.Properties["git_commit"], "sha-test")
}

func TestWithOS(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	e := newEvent(withOS())

	a := assert.New(t)
	a.Equal(e.Properties["os"], runtime.GOOS)
	a.Equal(e.Properties["arch"], runtime.GOARCH)
}

func TestWithAuthMethod_apiKey(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	config.SetPublicAPIKey("test-public")
	config.SetPrivateAPIKey("test-private")

	e := newEvent(withAuthMethod())

	a := assert.New(t)
	a.Equal(e.Properties["auth_method"], "api_key")
}

func TestWithAuthMethod_oauth(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	config.SetPublicAPIKey("")
	config.SetPrivateAPIKey("")

	e := newEvent(withAuthMethod())

	a := assert.New(t)
	a.Equal(e.Properties["auth_method"], "oauth")
}

func TestWithService(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	const url = "http://host.test"
	config.SetService(config.CloudService)
	config.SetOpsManagerURL(url)

	e := newEvent(withService())

	a := assert.New(t)
	a.Equal(config.CloudService, e.Properties["service"])
	a.Equal(url, e.Properties["ops_manager_url"])
}

func TestWithProjectID_Flag(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	cmd := &cobra.Command{
		Use: "test-command",
		Run: func(cmd *cobra.Command, args []string) {
			time.Sleep(10 * time.Millisecond)
		},
	}

	const projectID = "test"
	var p string
	cmd.Flags().StringVarP(&p, flag.ProjectID, "", "", "")
	_ = cmd.ParseFlags([]string{"--" + flag.ProjectID, projectID})
	_ = cmd.ExecuteContext(NewContext())

	e := newEvent(withProjectID(cmd))

	a := assert.New(t)
	a.Equal(projectID, e.Properties["project_id"])
}

func TestWithProjectID_Config(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	cmd := &cobra.Command{
		Use: "test-command",
		Run: func(cmd *cobra.Command, args []string) {
			time.Sleep(10 * time.Millisecond)
		},
	}

	const projectID = "test"
	config.SetProjectID(projectID)
	var p string
	cmd.Flags().StringVarP(&p, flag.ProjectID, "", "", "")
	_ = cmd.ExecuteContext(NewContext())

	e := newEvent(withProjectID(cmd))

	a := assert.New(t)
	a.Equal(projectID, e.Properties["project_id"])
}

func TestWithProjectID_NoFlagOrConfig(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	cmd := &cobra.Command{
		Use: "test-command",
		Run: func(cmd *cobra.Command, args []string) {
			time.Sleep(10 * time.Millisecond)
		},
	}

	config.SetProjectID("")
	_ = cmd.ExecuteContext(NewContext())

	e := newEvent(withProjectID(cmd))

	a := assert.New(t)
	_, ok := e.Properties["project_id"]
	a.Equal(false, ok)
}

func TestWithOrgID_Flag(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	cmd := &cobra.Command{
		Use: "test-command",
		Run: func(cmd *cobra.Command, args []string) {
			time.Sleep(10 * time.Millisecond)
		},
	}

	const orgID = "test"
	var p string
	cmd.Flags().StringVarP(&p, flag.OrgID, "", "", "")
	_ = cmd.ParseFlags([]string{"--" + flag.OrgID, orgID})
	_ = cmd.ExecuteContext(NewContext())

	e := newEvent(withOrgID(cmd))

	a := assert.New(t)
	a.Equal(orgID, e.Properties["org_id"])
}

func TestWithOrgID_Config(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	cmd := &cobra.Command{
		Use: "test-command",
		Run: func(cmd *cobra.Command, args []string) {
			time.Sleep(10 * time.Millisecond)
		},
	}

	const orgID = "test"
	config.SetOrgID(orgID)
	var p string
	cmd.Flags().StringVarP(&p, flag.OrgID, "", "", "")
	_ = cmd.ExecuteContext(NewContext())

	e := newEvent(withOrgID(cmd))

	a := assert.New(t)
	a.Equal(orgID, e.Properties["org_id"])
}

func TestWithOrgID_NoFlagOrConfig(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	cmd := &cobra.Command{
		Use: "test-command",
		Run: func(cmd *cobra.Command, args []string) {
			time.Sleep(10 * time.Millisecond)
		},
	}

	config.SetOrgID("")
	_ = cmd.ExecuteContext(NewContext())

	e := newEvent(withOrgID(cmd))

	a := assert.New(t)
	_, ok := e.Properties["org_id"]
	a.Equal(false, ok)
}

func TestWithError(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	e := newEvent(withError(errors.New("test")))

	a := assert.New(t)
	a.Equal("ERROR", e.Properties["result"])
	a.Equal("test", e.Properties["error"])
}

func TestSanitizePrompt(t *testing.T) {
	testCases := []struct {
		input    string
		expected string
	}{
		{
			input:    "Test",
			expected: "Test",
		},
		{
			input:    "Test [test1]",
			expected: "Test []",
		},
		{
			input:    "Test [test1] test2 [test3]",
			expected: "Test [] test2 []",
		},
	}

	for _, testCase := range testCases {
		got := sanitizePrompt(testCase.input)
		if got != testCase.expected {
			t.Errorf("expected: %v, got %v", testCase.expected, got)
		}
	}
}

func TestSanitizeSelectOption(t *testing.T) {
	testCases := []struct {
		input    string
		expected string
	}{
		{
			input:    "Test",
			expected: "Test",
		},
		{
			input:    "Test (test1)", // org id or projet id
			expected: "test1",
		},
	}

	for _, testCase := range testCases {
		got := sanitizeSelectOption(testCase.input)
		if got != testCase.expected {
			t.Errorf("expected: %v, got %v", testCase.expected, got)
		}
	}
}

func TestWithPrompt(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	q := "random question"
	k := "select"

	e := newEvent(withPrompt(q, k))

	a := assert.New(t)
	a.Equal(q, e.Properties["prompt"])
	a.Equal(k, e.Properties["prompt_type"])
}

func TestWithChoice(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	c := "test choice"

	e := newEvent(withChoice(c))

	a := assert.New(t)
	a.Equal(c, e.Properties["choice"])
}

func TestWithDefault(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	q := true

	e := newEvent(withDefault(q))

	a := assert.New(t)
	a.Equal(q, e.Properties["default"])
}

func TestWithEmpty(t *testing.T) {
	t.Cleanup(test.CleanupConfig)
	config.ToolName = config.AtlasCLI

	q := true

	e := newEvent(withEmpty(q))

	a := assert.New(t)
	a.Equal(q, e.Properties["empty"])
}

func TestWithSignal(t *testing.T) {
	config.ToolName = config.AtlasCLI

	q := "interrupt"

	e := newEvent(withSignal(q))

	a := assert.New(t)
	a.Equal(q, e.Properties["signal"])
}

func TestWithHelpCommand(t *testing.T) {
	config.ToolName = config.AtlasCLI
	testCmd := &cobra.Command{
		Use: "test",
	}
	rootCmd := &cobra.Command{
		Use: "root",
	}
	rootCmd.AddCommand(testCmd)
	rootCmd.InitDefaultHelpCmd()
	helpCmd := rootCmd.Commands()[0]

	args := []string{"test"}

	e := newEvent(withHelpCommand(helpCmd, args))

	a := assert.New(t)
	a.Equal("root-test", e.Properties["help_command"])
}

func TestWithHelpCommand_NotFound(t *testing.T) {
	config.ToolName = config.AtlasCLI
	testCmd := &cobra.Command{
		Use: "test",
	}
	rootCmd := &cobra.Command{
		Use: "root",
	}
	rootCmd.AddCommand(testCmd)
	rootCmd.InitDefaultHelpCmd()
	helpCmd := rootCmd.Commands()[0]

	args := []string{"test2"}

	e := newEvent(withHelpCommand(helpCmd, args))

	a := assert.New(t)
	_, ok := e.Properties["help_command"]
	a.False(ok)
}
