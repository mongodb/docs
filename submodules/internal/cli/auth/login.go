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

package auth

import (
	"context"
	"errors"
	"fmt"
	"time"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/require"
	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/flag"
	"github.com/mongodb/mongodb-atlas-cli/internal/log"
	"github.com/mongodb/mongodb-atlas-cli/internal/oauth"
	"github.com/mongodb/mongodb-atlas-cli/internal/telemetry"
	"github.com/mongodb/mongodb-atlas-cli/internal/validate"
	"github.com/pkg/browser"
	"github.com/spf13/cobra"
	"go.mongodb.org/atlas/auth"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

//go:generate mockgen -destination=../../mocks/mock_login.go -package=mocks github.com/mongodb/mongodb-atlas-cli/internal/cli/auth Authenticator,LoginConfig,LoginFlow

type Authenticator interface {
	RequestCode(context.Context) (*auth.DeviceCode, *atlas.Response, error)
	PollToken(context.Context, *auth.DeviceCode) (*auth.Token, *atlas.Response, error)
}

type LoginConfig interface {
	config.SetSaver
	AccessTokenSubject() (string, error)
}

const (
	AlreadyAuthenticatedError      = "you are already authenticated with an API key (Public key: %s)"
	AlreadyAuthenticatedMsg        = "You are already authenticated with an API key (Public key: %s)."
	AlreadyAuthenticatedEmailError = "you are already authenticated with an account (%s)"
	AlreadyAuthenticatedEmailMsg   = "You are already authenticated with an account (%s)."
	LoginWithProfileMsg            = `run "atlas auth login --profile <profile_name>"  to authenticate using your Atlas username and password on a new profile`
	LogoutToLoginAccountMsg        = `run "atlas auth logout" first if you want to login with another Atlas account on the same Atlas CLI profile`
)

var (
	ErrProjectIDNotFound = errors.New("you don't have access to this or it doesn't exist")
	ErrOrgIDNotFound     = errors.New("you don't have access to this organization ID or it doesn't exist")
)

type LoginOpts struct {
	cli.DefaultSetterOpts
	AccessToken          string
	RefreshToken         string
	IsGov                bool
	isCloudManager       bool
	NoBrowser            bool
	SkipConfig           bool
	config               LoginConfig
	flow                 Authenticator
	regenerateCodePrompt userSurvey
}

func NewLoginOpts() *LoginOpts {
	return &LoginOpts{
		regenerateCodePrompt: &confirmPrompt{
			message:         "Your one-time verification code is expired. Would you like to generate a new one?",
			defaultResponse: true,
		},
	}
}

type userSurvey interface {
	confirm() (response bool, err error)
}

type confirmPrompt struct {
	message         string
	defaultResponse bool
}

func (c *confirmPrompt) confirm() (response bool, err error) {
	p := &survey.Confirm{
		Message: c.message,
		Default: c.defaultResponse,
	}
	err = telemetry.TrackAskOne(p, &response)
	return response, err
}

type LoginFlow interface {
	Run(ctx context.Context) error
	PreRun() error
}

func NewLoginFlow(opts *LoginOpts) LoginFlow {
	return opts
}

func (opts *LoginOpts) initFlow() error {
	var err error
	opts.flow, err = oauth.FlowWithConfig(config.Default())
	return err
}

func (opts *LoginOpts) SetUpOAuthAccess() {
	switch {
	case opts.IsGov:
		opts.Service = config.CloudGovService
	case opts.isCloudManager:
		opts.Service = config.CloudManagerService
	default:
		opts.Service = config.CloudService
	}
	opts.config.Set("service", opts.Service)

	if opts.AccessToken != "" {
		opts.config.Set(config.AccessTokenField, opts.AccessToken)
	}
	if opts.RefreshToken != "" {
		opts.config.Set(config.RefreshTokenField, opts.RefreshToken)
	}
	if opts.OpsManagerURL != "" {
		opts.config.Set(config.OpsManagerURLField, opts.OpsManagerURL)
	}
	if config.ClientID() != "" {
		opts.config.Set(config.ClientIDField, config.ClientID())
	}
}

func (opts *LoginOpts) Run(ctx context.Context) error {
	if err := opts.oauthFlow(ctx); err != nil {
		return err
	}
	opts.SetUpOAuthAccess()
	s, err := opts.config.AccessTokenSubject()
	if err != nil {
		return err
	}
	_, _ = fmt.Fprintf(opts.OutWriter, "Successfully logged in as %s.\n", s)
	if opts.SkipConfig {
		return opts.config.Save()
	}

	if err := opts.setUpProfile(ctx); err != nil {
		return err
	}

	if config.Name() != config.DefaultProfile {
		_, _ = fmt.Fprintf(opts.OutWriter, "To use this profile, you must set the flag [-%s %s] for every command.\n", flag.ProfileShort, config.Name())
	}

	return nil
}

func (opts *LoginOpts) setUpProfile(ctx context.Context) error {
	if err := opts.InitStore(ctx); err != nil {
		return err
	}
	// Initialize the text to be displayed if users are asked to select orgs or projects
	opts.OnMultipleOrgsOrProjects = func() {
		if !opts.AskedOrgsOrProjects {
			_, _ = fmt.Fprintf(opts.OutWriter, "\nYou have multiple organizations or projects, select one to proceed.\n")
		}
	}

	if config.OrgID() == "" || !opts.OrgExists(config.OrgID()) {
		if err := opts.AskOrg(); err != nil {
			return err
		}
	}

	opts.SetUpOrg()

	if config.ProjectID() == "" || !opts.ProjectExists(config.ProjectID()) {
		if err := opts.AskProject(); err != nil {
			return err
		}
	}
	opts.SetUpProject()

	// Only make references to profile if user was asked about org or projects
	if opts.AskedOrgsOrProjects && opts.ProjectID != "" && opts.OrgID != "" {
		if !opts.ProjectExists(config.ProjectID()) {
			return ErrProjectIDNotFound
		}

		if !opts.OrgExists(config.OrgID()) {
			return ErrOrgIDNotFound
		}

		_, _ = fmt.Fprint(opts.OutWriter, "\nYour profile is now configured.\n")
		_, _ = fmt.Fprintf(opts.OutWriter, "You can use [%s config set] to change these settings at a later time.\n", config.BinName())
	}

	opts.SetUpMongoSHPath()
	return opts.config.Save()
}

func (opts *LoginOpts) printAuthInstructions(code *auth.DeviceCode) {
	codeDuration := time.Duration(code.ExpiresIn) * time.Second
	_, _ = fmt.Fprintf(opts.OutWriter, `
To verify your account, copy your one-time verification code:
`)

	userCode := fmt.Sprintf("%s-%s", code.UserCode[0:len(code.UserCode)/2], code.UserCode[len(code.UserCode)/2:])
	_, _ = fmt.Fprintln(opts.OutWriter, userCode)

	_, _ = fmt.Fprintf(opts.OutWriter, `
Paste the code in the browser when prompted to activate your Atlas CLI. Your code will expire after %.0f minutes.

To continue, go to `,
		codeDuration.Minutes(),
	)
	_, _ = fmt.Fprintln(opts.OutWriter, code.VerificationURI)
}

func (opts *LoginOpts) handleBrowser(uri string) {
	if opts.NoBrowser {
		return
	}

	if errBrowser := browser.OpenURL(uri); errBrowser != nil {
		_, _ = log.Warningln("There was an issue opening your browser")
	}
}

func (opts *LoginOpts) oauthFlow(ctx context.Context) error {
	askedToOpenBrowser := false
	for {
		code, _, err := opts.flow.RequestCode(ctx)
		if err != nil {
			return err
		}

		opts.printAuthInstructions(code)
		if !askedToOpenBrowser {
			opts.handleBrowser(code.VerificationURI)
			askedToOpenBrowser = true
		}

		accessToken, _, err := opts.flow.PollToken(ctx, code)
		if retry, errRetry := opts.shouldRetryAuthenticate(err); errRetry != nil {
			return errRetry
		} else if retry {
			continue
		}

		if err != nil {
			return err
		}

		opts.AccessToken = accessToken.AccessToken
		opts.RefreshToken = accessToken.RefreshToken
		return nil
	}
}

func (opts *LoginOpts) shouldRetryAuthenticate(err error) (retry bool, errSurvey error) {
	if err == nil || !auth.IsTimeoutErr(err) {
		return false, nil
	}

	return opts.regenerateCodePrompt.confirm()
}

func hasUserProgrammaticKeys() bool {
	return config.PublicAPIKey() != "" && config.PrivateAPIKey() != ""
}

func loginPreRun(ctx context.Context) error {
	if hasUserProgrammaticKeys() {
		msg := fmt.Sprintf(AlreadyAuthenticatedError, config.PublicAPIKey())
		return fmt.Errorf(`%s

%s`, msg, LoginWithProfileMsg)
	}

	if account, err := AccountWithAccessToken(); err == nil {
		if err := cli.RefreshToken(ctx); err == nil && validate.Token() == nil {
			msg := fmt.Sprintf(AlreadyAuthenticatedEmailError, account)
			return fmt.Errorf(`%s

%s`, msg, LogoutToLoginAccountMsg)
		}
	}
	return nil
}

func (opts *LoginOpts) PreRun() error {
	opts.config = config.Default()
	if config.OpsManagerURL() != "" {
		opts.OpsManagerURL = config.OpsManagerURL()
	}
	return opts.initFlow()
}

func Tool() string {
	if config.ToolName == config.MongoCLI {
		return "Atlas or Cloud Manager"
	}
	return "Atlas"
}

func LoginBuilder() *cobra.Command {
	opts := NewLoginOpts()

	cmd := &cobra.Command{
		Use:   "login",
		Short: "Authenticate with MongoDB Atlas.",
		Example: fmt.Sprintf(`  To start the interactive login for your MongoDB %s account:
  $ %s auth login
`, Tool(), config.BinName()),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			opts.OutWriter = cmd.OutOrStdout()
			if err := loginPreRun(cmd.Context()); err != nil {
				return err
			}
			return opts.PreRun()
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			return opts.Run(cmd.Context())
		},
		Args: require.NoArgs,
	}

	if config.ToolName == config.MongoCLI {
		cmd.Flags().BoolVar(&opts.isCloudManager, "cm", false, "Log in to Cloud Manager.")
	}

	cmd.Flags().BoolVar(&opts.IsGov, "gov", false, "Log in to Atlas for Government.")
	cmd.Flags().BoolVar(&opts.NoBrowser, "noBrowser", false, "Don't try to open a browser session.")
	cmd.Flags().BoolVar(&opts.SkipConfig, "skipConfig", false, "Skip profile configuration.")
	_ = cmd.Flags().MarkDeprecated("skipConfig", "if profile is configured, the login flow will skip the config step by default.")
	return cmd
}

func Builder() *cobra.Command {
	cmd := &cobra.Command{
		Use:   "auth",
		Short: "Manage the CLI's authentication state.",
		Annotations: map[string]string{
			"toc": "true",
		},
	}
	cmd.AddCommand(
		LoginBuilder(),
		WhoAmIBuilder(),
		LogoutBuilder(),
	)

	if config.ToolName == config.AtlasCLI {
		cmd.AddCommand(RegisterBuilder())
	}

	return cmd
}
