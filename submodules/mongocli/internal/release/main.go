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

package main

import (
	"encoding/json"
	"fmt"
	"os"
	"strings"
	"time"

	"github.com/mongodb/mongocli/internal/flag"
	"github.com/spf13/cobra"
)

const mongocli = "mongocli"

type Opts struct {
	fileName string
	version  string
}

type DownloadArchive struct {
	PreviousReleasesLink string     `json:"previous_releases_link"`
	ReleaseDate          time.Time  `json:"release_date"`
	ReleaseNotesLink     string     `json:"release_notes_link"`
	TutorialLink         string     `json:"tutorial_link"`
	Version              string     `json:"version"`
	ManualLink           string     `json:"manual_link"`
	Platform             []Platform `json:"platform"`
}

type Platform struct {
	Arch          string  `json:"arch,omitempty"`
	OS            string  `json:"os"`
	PackageFormat string  `json:"package_format,omitempty"`
	Packages      Package `json:"packages"`
}

type Package struct {
	Title string `json:"title"`
	Links []Link `json:"links"`
}

type Link struct {
	DownloadLink string `json:"download_link"`
	Name         string `json:"name"`
}

func newPlatform(packageName, version, arch, system, distro string, formats []string) *Platform {
	p := &Platform{}
	p.Arch = arch
	p.OS = distro

	links := make([]Link, len(formats))
	for i, f := range formats {
		links[i] = Link{
			DownloadLink: fmt.Sprintf("https://fastdl.mongodb.org/mongocli/%s_%s_%s_%s.%s", packageName, version, system, arch, f),
			Name:         f,
		}
	}

	title := "MongoDB Atlas CLI"
	if packageName == mongocli {
		title = "MongoDB CLI"
	}
	p.Packages = Package{
		Title: title,
		Links: links,
	}
	return p
}

func main() {
	cmd := Builder()
	if err := cmd.Execute(); err != nil {
		fmt.Printf("error encoding file: %v\n", err)
		os.Exit(1)
	}
}

func generateFile(name, version string) error {
	packageName := mongocli
	if strings.Contains(name, "atlas") {
		packageName = "mongodb-atlas-cli"
	}
	feedFile, err := os.Create(name)
	if err != nil {
		return err
	}
	defer feedFile.Close()
	downloadArchive := &DownloadArchive{
		ReleaseDate:          time.Now().UTC(),
		Version:              version,
		ManualLink:           fmt.Sprintf("https://docs.mongodb.com/mongocli/v%s/", version),
		PreviousReleasesLink: "https://github.com/mongodb/mongocli/releases",
		ReleaseNotesLink:     fmt.Sprintf("https://docs.mongodb.com/mongocli/v%s/release-notes/", version),
		TutorialLink:         fmt.Sprintf("https://docs.mongodb.com/mongocli/v%s/quick-start/", version),
		Platform: []Platform{
			*newPlatform(packageName, version, "x86_64", "linux", "Linux (x86_64)", []string{"tar.gz"}),
			*newPlatform(packageName, version, "x86_64", "linux", "Debian 9, 10 / Ubuntu 18.04, 20.04", []string{"deb"}),
			*newPlatform(packageName, version, "x86_64", "linux", "Red Hat + CentOS 6, 7, 8 / SUSE 12 + 15 / Amazon Linux", []string{"rpm"}),
			*newPlatform(packageName, version, "x86_64", "windows", "Microsoft Windows", []string{"zip", "msi"}),
			*newPlatform(packageName, version, "x86_64", "macos", "macOS (x86_64)", []string{"zip"}),
			*newPlatform(packageName, version, "arm64", "macos", "macOS (arm64)", []string{"zip"}),
		},
	}
	jsonEncoder := json.NewEncoder(feedFile)
	jsonEncoder.SetIndent("", "  ")
	return jsonEncoder.Encode(downloadArchive)
}

func Builder() *cobra.Command {
	opts := Opts{}
	cmd := &cobra.Command{
		Use:   "main",
		Short: "Generate the download center json file",
		Example: `
  Generate the download center json file for mongocli
  $ main --version 1.23.0 --file mongocli.json`,
		RunE: func(cmd *cobra.Command, args []string) error {
			fmt.Printf("Generating JSON: %s\n", opts.fileName)
			return generateFile(opts.fileName, opts.version)
		},
		PostRun: func(cmd *cobra.Command, args []string) {
			fmt.Printf("File %s has been generated\n", opts.fileName)
		},
	}

	cmd.Flags().StringVar(&opts.version, flag.Version, "", "release version.")
	cmd.Flags().StringVar(&opts.fileName, flag.File, "mongocli.json", "file name of the download center json file.")

	_ = cmd.MarkFlagFilename(flag.File)
	_ = cmd.MarkFlagRequired(flag.Version)
	return cmd
}
