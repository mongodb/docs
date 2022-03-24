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

//go:build unit
// +build unit

package require

import (
	"bytes"
	"testing"

	"github.com/spf13/cobra"
)

func emptyRun(*cobra.Command, []string) {}

func executeCommand(root *cobra.Command, args ...string) (output string, err error) {
	_, output, err = executeCommandC(root, args...)
	return output, err
}

func executeCommandC(root *cobra.Command, args ...string) (c *cobra.Command, output string, err error) {
	buf := new(bytes.Buffer)
	root.SetOut(buf)
	root.SetErr(buf)
	root.SetArgs(args)

	c, err = root.ExecuteC()

	return c, buf.String(), err
}

func TestNoArgs(t *testing.T) {
	tests := []struct {
		name    string
		args    []string
		wantErr bool
	}{
		{
			name:    "no args",
			args:    []string{},
			wantErr: false,
		},
		{
			name:    "with args",
			args:    []string{"fail"},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		args := tt.args
		wantErr := tt.wantErr
		t.Run(tt.name, func(t *testing.T) {
			c := &cobra.Command{Use: "c", Args: NoArgs, Run: emptyRun}
			if _, err := executeCommand(c, args...); (err != nil) != wantErr {
				t.Errorf("NoArgs() error = %v, wantErr %v", err, wantErr)
			}
		})
	}
}

func TestExactArgs(t *testing.T) {
	tests := []struct {
		name    string
		args    []string
		wantErr bool
	}{
		{
			name:    "no args",
			args:    []string{},
			wantErr: true,
		},
		{
			name:    "with valid args",
			args:    []string{"a", "b", "c"},
			wantErr: false,
		},
		{
			name:    "with less args",
			args:    []string{"a", "b"},
			wantErr: true,
		},
		{
			name:    "with more args",
			args:    []string{"a", "b", "c", "d"},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		args := tt.args
		wantErr := tt.wantErr
		t.Run(tt.name, func(t *testing.T) {
			c := &cobra.Command{Use: "c", Args: ExactArgs(3), Run: emptyRun}
			if _, err := executeCommand(c, args...); (err != nil) != wantErr {
				t.Errorf("ExactArgs() error = %v, wantErr %v", err, wantErr)
			}
		})
	}
}

func TestExactObjectIDArgs(t *testing.T) {
	tests := []struct {
		name    string
		args    []string
		wantErr bool
	}{
		{
			name:    "no args",
			args:    []string{},
			wantErr: true,
		},
		{
			name:    "with valid args",
			args:    []string{"5dd56c847a3e5a1f363d424d"},
			wantErr: false,
		},
		{
			name:    "with invalid args",
			args:    []string{"a"},
			wantErr: true,
		},
		{
			name:    "with more args",
			args:    []string{"5dd56c847a3e5a1f363d424d", "5dd56c847a3e5a1f363d424d"},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		args := tt.args
		wantErr := tt.wantErr
		t.Run(tt.name, func(t *testing.T) {
			c := &cobra.Command{Use: "c", Args: ExactObjectIDArgs(1), Run: emptyRun}
			if _, err := executeCommand(c, args...); (err != nil) != wantErr {
				t.Errorf("ExactObjectIDArgs() error = %v, wantErr %v", err, wantErr)
			}
		})
	}
}

func TestMaximumNArgs(t *testing.T) {
	tests := []struct {
		name    string
		args    []string
		wantErr bool
	}{
		{
			name:    "no args",
			args:    []string{},
			wantErr: false,
		},
		{
			name:    "with valid args",
			args:    []string{"a", "b", "c"},
			wantErr: false,
		},
		{
			name:    "with less args",
			args:    []string{"a", "b"},
			wantErr: false,
		},
		{
			name:    "with more args",
			args:    []string{"a", "b", "c", "d"},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		args := tt.args
		wantErr := tt.wantErr
		t.Run(tt.name, func(t *testing.T) {
			c := &cobra.Command{Use: "c", Args: MaximumNArgs(3), Run: emptyRun}
			if _, err := executeCommand(c, args...); (err != nil) != wantErr {
				t.Errorf("MaximumNArgs() error = %v, wantErr %v", err, wantErr)
			}
		})
	}
}

func TestMinimumNArgs(t *testing.T) {
	tests := []struct {
		name    string
		args    []string
		wantErr bool
	}{
		{
			name:    "no args",
			args:    []string{},
			wantErr: true,
		},
		{
			name:    "with less args",
			args:    []string{"a"},
			wantErr: true,
		},
		{
			name:    "with valid args",
			args:    []string{"a", "b"},
			wantErr: false,
		},
		{
			name:    "with more args",
			args:    []string{"a", "b", "c"},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		args := tt.args
		wantErr := tt.wantErr
		t.Run(tt.name, func(t *testing.T) {
			c := &cobra.Command{Use: "c", Args: MinimumNArgs(2), Run: emptyRun}
			if _, err := executeCommand(c, args...); (err != nil) != wantErr {
				t.Errorf("MinimumNArgs() error = %v, wantErr %v", err, wantErr)
			}
		})
	}
}

func TestExactValidArgs(t *testing.T) {
	tests := []struct {
		name    string
		args    []string
		wantErr bool
	}{
		{
			name:    "no args",
			args:    []string{},
			wantErr: true,
		},
		{
			name:    "with correct args",
			args:    []string{"a"},
			wantErr: false,
		},
		{
			name:    "with invalid args",
			args:    []string{"b"},
			wantErr: true,
		},
		{
			name:    "with more args",
			args:    []string{"a", "b", "c"},
			wantErr: true,
		},
	}
	for _, tt := range tests {
		args := tt.args
		wantErr := tt.wantErr
		t.Run(tt.name, func(t *testing.T) {
			c := &cobra.Command{Use: "c", Args: ExactValidArgs(1), ValidArgs: []string{"a"}, Run: emptyRun}
			if _, err := executeCommand(c, args...); (err != nil) != wantErr {
				t.Errorf("ExactValidArgs() error = %v, wantErr %v", err, wantErr)
			}
		})
	}
}

func TestMinimumNObjectIDArgs(t *testing.T) {
	tests := []struct {
		name    string
		args    []string
		wantErr bool
	}{
		{
			name:    "no args",
			args:    []string{},
			wantErr: true,
		},
		{
			name:    "with correct args",
			args:    []string{"5dd56c847a3e5a1f363d424d"},
			wantErr: false,
		},
		{
			name:    "with invalid args",
			args:    []string{"b"},
			wantErr: true,
		},
		{
			name:    "with more args",
			args:    []string{"5dd56c847a3e5a1f363d424d", "5dd56c847a3e5a1f363d424e"},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		args := tt.args
		wantErr := tt.wantErr
		t.Run(tt.name, func(t *testing.T) {
			c := &cobra.Command{Use: "c", Args: MinimumNObjectIDArgs(1), ValidArgs: []string{"a"}, Run: emptyRun}
			if _, err := executeCommand(c, args...); (err != nil) != wantErr {
				t.Errorf("MinimumNObjectIDArgs() error = %v, wantErr %v", err, wantErr)
			}
		})
	}
}
