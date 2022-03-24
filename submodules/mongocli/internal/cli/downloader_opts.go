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

package cli

import (
	"io"
	"os"

	"github.com/spf13/afero"
)

// DownloaderOpts options required when deleting a resource.
// A command can compose this struct and then safely rely on the methods Prompt, or Delete
// to manage the interactions with the user.
type DownloaderOpts struct {
	Out   string
	Force bool
	Fs    afero.Fs
}

// NewWriteCloser creates a new file, if Force is false then don't allow to overwrite the file.
func (opts *DownloaderOpts) NewWriteCloser() (io.WriteCloser, error) {
	ff := os.O_CREATE | os.O_TRUNC | os.O_WRONLY
	if !opts.Force {
		ff |= os.O_EXCL
	}
	const defaultPermissions = 0766
	f, err := opts.Fs.OpenFile(opts.Out, ff, defaultPermissions)
	return f, err
}

func (opts *DownloaderOpts) OnError(f io.Closer) error {
	_ = f.Close()
	return opts.Fs.Remove(opts.Out)
}
