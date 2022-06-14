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
	"fmt"
	"io"

	"github.com/mongodb/mongodb-atlas-cli/internal/cli"
	"github.com/mongodb/mongodb-atlas-cli/internal/cli/require"
	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/spf13/cobra"
	"go.mongodb.org/atlas/auth"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

//go:generate mockgen -destination=../../mocks/mock_register.go -package=mocks github.com/mongodb/mongodb-atlas-cli/internal/cli/auth RegisterFlow

const (
	baseURI        = "https://account.mongodb.com/"
	govBaseURI     = "https://account.mongodbgov.com/"
	accountParams  = "account/register/cli?n=/account/connect&nRegister=/account/connect"
	WithProfileMsg = `run "atlas auth register --profile <profile_name>" to create a new Atlas account on a new Atlas CLI profile`
)

type registerOpts struct {
	cli.DefaultSetterOpts
	login *LoginOpts
}

func newRegisterOpts(l *LoginOpts) *registerOpts {
	return &registerOpts{
		login: l,
	}
}

type RegisterFlow interface {
	Run(ctx context.Context) error
	PreRun(outWriter io.Writer) error
}

func NewRegisterFlow(l *LoginOpts) RegisterFlow {
	return newRegisterOpts(l)
}

func (opts *registerOpts) Run(ctx context.Context) error {
	if err := opts.login.oauthFlow(ctx); err != nil {
		return err
	}

	opts.login.SetUpOAuthAccess()
	s, err := opts.login.config.AccessTokenSubject()
	if err != nil {
		return err
	}
	_, _ = fmt.Fprintf(opts.OutWriter, "Successfully logged in as %s.\n", s)

	return opts.login.setUpProfile(ctx)
}

type registerAuthenticator struct {
	isGov         bool
	authenticator Authenticator
}

func (ra *registerAuthenticator) RequestCode(ctx context.Context) (*auth.DeviceCode, *atlas.Response, error) {
	// TODO:CLOUDP-121210 - Replace with new request and remove URI override.
	code, response, err := ra.authenticator.RequestCode(ctx)
	if err != nil {
		return code, response, err
	}

	if config.OpsManagerURL() == "" {
		if ra.isGov {
			code.VerificationURI = govBaseURI + accountParams
		} else {
			code.VerificationURI = baseURI + accountParams
		}
	} else {
		code.VerificationURI = config.OpsManagerURL() + accountParams
	}

	return code, response, nil
}

func (ra *registerAuthenticator) PollToken(ctx context.Context, code *auth.DeviceCode) (*auth.Token, *atlas.Response, error) {
	return ra.authenticator.PollToken(ctx, code)
}

func (opts *registerOpts) PreRun(outWriter io.Writer) error {
	opts.OutWriter = outWriter
	opts.login.OutWriter = outWriter
	opts.login.config = config.Default()
	if config.OpsManagerURL() != "" {
		opts.login.OpsManagerURL = config.OpsManagerURL()
	}

	if err := opts.login.initFlow(); err != nil {
		return err
	}
	opts.login.flow = &registerAuthenticator{
		authenticator: opts.login.flow,
		isGov:         opts.login.IsGov,
	}

	return nil
}

func registerPreRun() error {
	if hasUserProgrammaticKeys() {
		msg := fmt.Sprintf(AlreadyAuthenticatedError, config.PublicAPIKey())
		return fmt.Errorf(`%s

%s`, msg, WithProfileMsg)
	}

	if account, err := AccountWithAccessToken(); err == nil {
		msg := fmt.Sprintf(AlreadyAuthenticatedEmailError, account)
		return fmt.Errorf(`%s

%s`, msg, WithProfileMsg)
	}
	return nil
}

func RegisterBuilder() *cobra.Command {
	opts := newRegisterOpts(NewLoginOpts())
	cmd := &cobra.Command{
		Use:    "register",
		Short:  "Register with MongoDB Atlas.",
		Hidden: false,
		Example: fmt.Sprintf(`  To start the interactive setup:
  $ %s auth register
`, config.BinName()),
		PreRunE: func(cmd *cobra.Command, args []string) error {
			if err := registerPreRun(); err != nil {
				return err
			}

			return opts.PreRun(cmd.OutOrStdout())
		},
		RunE: func(cmd *cobra.Command, args []string) error {
			_, _ = fmt.Fprintf(opts.OutWriter, "Create and verify your MongoDB Atlas account from the web browser and return to Atlas CLI after activation.\n")

			return opts.Run(cmd.Context())
		},
		Args: require.NoArgs,
	}

	cmd.Flags().BoolVar(&opts.login.IsGov, "gov", false, "Register with Atlas for Government.")
	cmd.Flags().BoolVar(&opts.login.NoBrowser, "noBrowser", false, "Don't try to open a browser session.")

	return cmd
}
