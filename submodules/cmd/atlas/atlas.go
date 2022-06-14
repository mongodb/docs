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

package main

import (
	"fmt"
	"io"
	"log"
	"os"
	"path"

	"github.com/mongodb/mongodb-atlas-cli/internal/cli/root/atlas"
	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/telemetry"
	"github.com/spf13/cobra"
)

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute() {
	ctx := telemetry.NewContext()
	rootCmd := atlas.Builder()
	if cmd, err := rootCmd.ExecuteContextC(ctx); err != nil {
		if !telemetry.StartedTrackingCommand() {
			telemetry.StartTrackingCommand(cmd, os.Args[1:])
		}

		telemetry.FinishTrackingCommand(telemetry.TrackOptions{
			Err: err,
		})
		os.Exit(1)
	}
}

// loadConfig reads in config file and ENV variables if set.
func loadConfig() error {
	if err := config.LoadAtlasCLIConfig(); err != nil {
		return fmt.Errorf("error loading config: %w", err)
	}

	return nil
}

// createConfigFromMongoCLIConfig creates the atlasCLI config file from the mongocli config file.
func createConfigFromMongoCLIConfig() {
	atlasConfigHomePath, err := config.AtlasCLIConfigHome()
	if err != nil {
		return
	}

	atlasConfigPath := path.Join(atlasConfigHomePath, "config.toml")
	f, err := os.Open(atlasConfigPath) // if config.toml is already there, exit
	if err == nil {
		f.Close()
		return
	}

	p, err := mongoCLIConfigFilePath()
	if err != nil {
		return
	}

	in, err := os.Open(p)
	if err != nil {
		return
	}
	defer in.Close()

	_, _ = fmt.Fprintf(os.Stderr, `Atlas CLI has found an existing MongoDB CLI configuration file, copying its content to: %s
`, atlasConfigPath)
	_, err = os.Stat(atlasConfigHomePath) // check if the dir is already there
	if err != nil {
		defaultPermissions := 0700
		if err = os.Mkdir(atlasConfigHomePath, os.FileMode(defaultPermissions)); err != nil {
			return
		}
	}

	out, err := os.Create(atlasConfigPath)
	if err != nil {
		return
	}
	defer out.Close()

	if _, err = io.Copy(out, in); err != nil {
		_, _ = fmt.Fprintf(os.Stderr, "There was an error generating %s: %v", atlasConfigPath, err)
		return
	}

	_, _ = fmt.Fprintf(os.Stderr, `AtlasCLI has copied your MongoCLI configuration to: %s

`, atlasConfigPath)
}

func mongoCLIConfigFilePath() (configPath string, err error) {
	if configDir, err := config.MongoCLIConfigHome(); err == nil {
		configPath = path.Join(configDir, "config.toml")
	}

	// Check if file exists, if any error is detected try to get older file
	if _, err := os.Stat(configPath); err == nil {
		return configPath, nil
	}

	if configDir, err := config.OldMongoCLIConfigHome(); err == nil { //nolint:staticcheck // Deprecated before fully removing support in the future
		configPath = fmt.Sprintf("%s/mongocli.toml", configDir)
	}

	if _, err := os.Stat(configPath); err != nil {
		return "", err
	}
	return configPath, nil
}

func trackInitError(e error) {
	if e == nil {
		return
	}
	if cmd, args, err := atlas.Builder().Find(os.Args[1:]); err == nil {
		telemetry.StartTrackingCommand(cmd, args)
		telemetry.FinishTrackingCommand(telemetry.TrackOptions{
			Err: e,
		})
	}
	log.Fatal(e)
}

func main() {
	cobra.EnableCommandSorting = false

	createConfigFromMongoCLIConfig()
	trackInitError(loadConfig())

	Execute()
}
