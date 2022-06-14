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

package quickstart

import (
	"errors"
	"fmt"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/convert"
	"github.com/mongodb/mongodb-atlas-cli/internal/flag"
	"github.com/mongodb/mongodb-atlas-cli/internal/randgen"
	"github.com/mongodb/mongodb-atlas-cli/internal/telemetry"
	atlas "go.mongodb.org/atlas/mongodbatlas"
)

func (opts *Opts) createDatabaseUser() error {
	if _, err := opts.store.CreateDatabaseUser(opts.newDatabaseUser()); err != nil {
		return err
	}

	return nil
}

func (opts *Opts) askDBUserOptions() error {
	var qs []*survey.Question

	if opts.DBUsername == "" {
		opts.DBUsername = opts.defaultName
	}

	if opts.shouldAskForValue(flag.Username) {
		qs = append(qs, newDBUsernameQuestion(opts.DBUsername, opts.validateUniqueUsername))
	}

	if opts.shouldAskForValue(flag.Password) {
		if opts.DBUserPassword == "" {
			pwd, err := generatePassword()
			if err != nil {
				return err
			}
			opts.DBUserPassword = pwd
		}

		minLength := 10
		if config.Service() == config.CloudGovService {
			minLength = 12
		}
		message := fmt.Sprintf(" [Must be >%d characters. Press Enter to use an auto-generated password]", minLength)

		qs = append(qs, newDBUserPasswordQuestion(opts.DBUserPassword, message))
	}

	if len(qs) == 0 {
		return nil
	}

	fmt.Print(`
[Set up your database authentication access details. Store them in a secure location.]
`)
	return telemetry.TrackAsk(qs, opts)
}

func (opts *Opts) validateUniqueUsername(val interface{}) error {
	username, ok := val.(string)
	if !ok {
		return fmt.Errorf("the username %s is not valid", username)
	}

	_, err := opts.store.DatabaseUser(convert.AdminDB, opts.ConfigProjectID(), username)
	if err != nil {
		var target *atlas.ErrorResponse
		if errors.As(err, &target) && target.ErrorCode == "USERNAME_NOT_FOUND" {
			return nil
		}
		return err
	}
	return fmt.Errorf("a user with this username %s already exists", username)
}

func (opts *Opts) newDatabaseUser() *atlas.DatabaseUser {
	const none = "NONE"
	return &atlas.DatabaseUser{
		Roles:        convert.BuildAtlasRoles([]string{atlasAdmin}),
		GroupID:      opts.ConfigProjectID(),
		Password:     opts.DBUserPassword,
		X509Type:     none,
		AWSIAMType:   none,
		LDAPAuthType: none,
		DatabaseName: convert.AdminDB,
		Username:     opts.DBUsername,
	}
}

func generatePassword() (string, error) {
	const passwordLength = 12
	pwd, err := randgen.GenerateRandomBase64String(passwordLength)
	if err != nil {
		return "", err
	}

	return pwd, nil
}
