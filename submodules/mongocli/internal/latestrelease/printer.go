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

package latestrelease

import (
	"context"
	"fmt"
	"io"
	"os"
	"os/exec"
	"path/filepath"
	"strings"
	"time"

	"github.com/mongodb/mongocli/internal/version"
)

const (
	minPageSize       = 5
	atlasToolFullName = "mongodb-atlas"
)

type Printer interface {
	PrintNewVersionAvailable(w io.Writer, v, tool, bin string) error
}

func NewPrinter(ctx context.Context) Printer {
	return &printer{c: ctx, finder: NewVersionFinder(ctx, version.NewReleaseVersionDescriber())}
}

func NewPrinterWithFinder(ctx context.Context, f VersionFinder) Printer {
	return &printer{c: ctx, finder: f}
}

type printer struct {
	c      context.Context
	finder VersionFinder
}

func isAtLeast24HoursPast(t time.Time) bool {
	return !t.IsZero() && time.Since(t) >= time.Hour*24
}

func isHomebrew(tool string) bool {
	brewFormulaPath, err := homebrewFormulaPath(tool)
	if err != nil {
		return false
	}

	executablePath, err := executableCurrentPath()
	if err != nil {
		return false
	}

	return strings.HasPrefix(executablePath, brewFormulaPath)
}

func homebrewFormulaPath(tool string) (string, error) {
	formula := tool
	brewFormulaPathBytes, err := exec.Command("brew", "--prefix", "--installed", formula).Output()
	if err != nil {
		return "", err
	}

	brewFormulaPath := strings.TrimSpace(string(brewFormulaPathBytes))

	brewFormulaPath, err = filepath.EvalSymlinks(brewFormulaPath)
	if err != nil {
		return "", err
	}

	return brewFormulaPath, nil
}

func executableCurrentPath() (string, error) {
	executablePath, err := os.Executable()
	if err != nil {
		return "", err
	}
	return filepath.EvalSymlinks(executablePath)
}

func homebrewCommand(tool string) string {
	if strings.Contains(tool, "atlas") {
		return atlasToolFullName
	}
	return tool
}

func (p *printer) PrintNewVersionAvailable(w io.Writer, v, tool, bin string) error {
	newVersionAvailable, latestVersion, err := p.finder.HasNewVersionAvailable(v, tool)

	if err != nil {
		return err
	}
	if newVersionAvailable {
		var upgradeInstructions string
		if isHomebrew(tool) {
			upgradeInstructions = fmt.Sprintf(`To upgrade, run "brew update && brew upgrade %s".`, homebrewCommand(tool))
		} else {
			upgradeInstructions = fmt.Sprintf(`To upgrade, see: https://dochub.mongodb.org/core/%s-install.`, tool)
		}

		newVersionTemplate := `
A new version of %s is available '%s'!
%s

To disable this alert, run "%s config set skip_update_check true".
`
		_, err = fmt.Fprintf(w, newVersionTemplate, tool, latestVersion, upgradeInstructions, bin)
		return err
	}
	return nil
}
