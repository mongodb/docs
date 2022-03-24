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

package cli

import (
	"io"
	"os"

	"github.com/mattn/go-isatty"
)

type InputOpts struct {
	InReader io.Reader
}

// InitInput allow to init the InputOpts in a functional way.
func (opts *InputOpts) InitInput(r io.Reader) func() error {
	return func() error {
		opts.InReader = r
		return nil
	}
}

// ConfigReader returns the io.Reader.
// If the reader is nil, it defaults to os.Stdin and caches it.
func (opts *InputOpts) ConfigReader() io.Reader {
	if opts.InReader != nil {
		return opts.InReader
	}
	opts.InReader = os.Stdin
	return opts.InReader
}

// IsTerminalInput returns true is the current file descriptor is TTY kind of terminal.
func (opts *InputOpts) IsTerminalInput() bool {
	return IsTerminalInput(opts.InReader)
}

// IsTerminalInput returns true is the current file descriptor is TTY kind of terminal.
func IsTerminalInput(r io.Reader) bool {
	if f, isFile := r.(*os.File); isFile {
		return isatty.IsTerminal(f.Fd()) || IsCygwinTerminalInput(r)
	}

	return false
}

// IsCygwinTerminalInput returns true is the current file descriptor is cygwin.
func (opts *InputOpts) IsCygwinTerminalInput() bool {
	return IsCygwinTerminalInput(opts.InReader)
}

// IsCygwinTerminal returns true is the current file descriptor is cygwin.
func IsCygwinTerminalInput(r io.Reader) bool {
	if f, isFile := r.(*os.File); isFile {
		return isatty.IsCygwinTerminal(f.Fd())
	}

	return false
}
