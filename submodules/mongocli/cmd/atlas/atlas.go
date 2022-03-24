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
	"context"
	"fmt"
	"io"
	"log"
	"os"

	"github.com/mongodb/mongocli/internal/cli/root/atlas"
	"github.com/mongodb/mongocli/internal/config"
	"github.com/mongodb/mongocli/internal/flag"
	"github.com/spf13/cobra"
)

var (
	profile string
)

// Execute adds all child commands to the root command and sets flags appropriately.
// This is called by main.main(). It only needs to happen once to the rootCmd.
func Execute(ctx context.Context) {
	rootCmd := atlas.Builder(&profile)
	if err := rootCmd.ExecuteContext(ctx); err != nil {
		os.Exit(1)
	}
}

// initConfig reads in config file and ENV variables if set.
func initConfig() {
	if err := config.LoadAtlasCLIConfig(); err != nil {
		log.Fatalf("Error loading config: %v", err)
	}

	if profile != "" {
		config.SetName(profile)
	} else if profile = config.GetString(flag.Profile); profile != "" {
		config.SetName(profile)
	} else if availableProfiles := config.List(); len(availableProfiles) == 1 {
		config.SetName(availableProfiles[0])
	}
}

// createConfigFromMongoCLIConfig creates the atlasCLI config file from the mongocli.toml.
func createConfigFromMongoCLIConfig() {
	atlasConfigHomePath, err := config.AtlasCLIConfigHome()
	if err != nil {
		return
	}

	atlasConfigPath := fmt.Sprintf("%s/%s", atlasConfigHomePath, "config.toml")
	f, err := os.Open(atlasConfigPath) // if config.toml is already there, exit
	if err == nil {
		return
	}
	defer f.Close()

	mongoCLIConfigPath := mongoCLIConfigPath()
	if mongoCLIConfigPath == "" {
		return
	}

	in, err := os.Open(mongoCLIConfigPath)
	if err != nil {
		return
	}
	defer in.Close()

	_, _ = fmt.Fprintf(os.Stderr, `AtlasCLI has found an existing MongoCLI configuration file, copying its content to: %s
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

	_, err = io.Copy(out, in)
	if err != nil {
		log.Printf("There was an error generating %s: %v", atlasConfigPath, err)
	}

	_, _ = fmt.Fprintf(os.Stderr, `AtlasCLI has copied your MongoCLI configuration to: %s

`, atlasConfigPath)
}

func mongoCLIConfigPath() string {
	configDir, err := config.MongoCLIConfigHome()
	if err != nil {
		return ""
	}

	configPath := fmt.Sprintf("%s/mongocli.toml", configDir)
	return configPath
}

func main() {
	cobra.EnableCommandSorting = false
	cobra.OnInitialize(createConfigFromMongoCLIConfig, initConfig)

	Execute(context.Background())
}
