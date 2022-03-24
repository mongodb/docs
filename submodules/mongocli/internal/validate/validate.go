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

package validate

import (
	"encoding/hex"
	"errors"
	"fmt"
	"net/url"
	"os"
	"regexp"
	"strings"

	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/search"
)

const minPasswordLength = 10

// toString tries to cast an interface to string.
func toString(val interface{}) (string, error) {
	var u string
	var ok bool
	if u, ok = val.(string); !ok {
		return "", fmt.Errorf("'%v' is not valid", val)
	}
	return u, nil
}

// URL validates a value is a valid URL for the cli store.
func URL(val interface{}) error {
	s, err := toString(val)
	if err != nil {
		return err
	}
	if !strings.HasSuffix(s, "/") {
		return fmt.Errorf("'%s' must have a trailing slash", s)
	}
	_, err = url.ParseRequestURI(s)
	if err != nil {
		return fmt.Errorf("'%s' is not a valid URL", s)
	}

	return nil
}

// OptionalURL validates a value is a valid URL for the cli store.
func OptionalURL(val interface{}) error {
	if val == nil {
		return nil
	}
	s, err := toString(val)
	if err != nil {
		return err
	}
	if s == "" {
		return nil
	}

	return URL(val)
}

// OptionalObjectID validates a value is a valid ObjectID.
func OptionalObjectID(val interface{}) error {
	if val == nil {
		return nil
	}
	s, err := toString(val)
	if err != nil || s == "" {
		return err
	}
	return ObjectID(s)
}

// ObjectID validates a value is a valid ObjectID.
func ObjectID(s string) error {
	b, err := hex.DecodeString(s)
	if err != nil || len(b) != 12 {
		return fmt.Errorf("the provided value '%s' is not a valid Id", s)
	}
	return nil
}

var ErrMissingCredentials = errors.New("missing credentials")

// Credentials validates public and private API keys have been set.
func Credentials() error {
	if t, err := config.Token(); t != nil {
		return err
	}
	if config.PrivateAPIKey() != "" && config.PublicAPIKey() != "" {
		return nil
	}

	configCMD := "config"
	if config.BinName() == "atlas" {
		configCMD += "init"
	}
	return fmt.Errorf(
		"%w\n\nTo set credentials, run: %s %s",
		ErrMissingCredentials,
		config.BinName(),
		configCMD,
	)
}

func FlagInSlice(value, flag string, validValues []string) error {
	if search.StringInSlice(validValues, value) {
		return nil
	}

	return fmt.Errorf(`invalid value for "%s", allowed values: "%s"`, flag, strings.Join(validValues, `", "`))
}

var ErrInvalidPath = errors.New("invalid path")

func Path(val interface{}) error {
	path, ok := val.(string)
	if !ok {
		return fmt.Errorf("%w: %v", ErrInvalidPath, val)
	}

	if _, err := os.Stat(path); err != nil {
		return fmt.Errorf("%w: %s", ErrInvalidPath, path)
	}

	return nil
}

func OptionalPath(val interface{}) error {
	if val == nil {
		return nil
	}
	s, err := toString(val)
	if err != nil || s == "" {
		return err
	}
	return Path(val)
}

var ErrInvalidClusterName = errors.New("invalid cluster name")

func ClusterName(val interface{}) error {
	name, ok := val.(string)
	if !ok {
		return fmt.Errorf("%w: %v", ErrInvalidClusterName, val)
	}
	match, _ := regexp.MatchString("^[a-zA-Z0-9][a-zA-Z0-9-]*$", name)
	if match {
		return nil
	}

	return fmt.Errorf("%w. Cluster names can only contain ASCII letters, numbers, and hyphens: %s", ErrInvalidClusterName, name)
}

var ErrInvalidDBUsername = errors.New("invalid db username")

func DBUsername(val interface{}) error {
	name, ok := val.(string)
	if !ok {
		return fmt.Errorf("%w: %v", ErrInvalidDBUsername, val)
	}
	match, _ := regexp.MatchString("^[a-zA-Z0-9]+[a-zA-Z0-9-_]*$", name)
	if match {
		return nil
	}

	return fmt.Errorf("%w: %s", ErrInvalidDBUsername, name)
}

var ErrWeakPassword = errors.New("the password provided is too common")
var ErrShortPassword = errors.New("the password provided is too short")

func WeakPassword(val interface{}) error {
	password, ok := val.(string)
	if !ok {
		return ErrWeakPassword
	}

	if len(password) < minPasswordLength {
		return fmt.Errorf("%w min: %d", ErrShortPassword, minPasswordLength)
	}

	if commonPasswords[strings.ToLower(password)] {
		return ErrWeakPassword
	}

	return nil
}
