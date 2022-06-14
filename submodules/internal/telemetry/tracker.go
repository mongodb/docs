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

package telemetry

import (
	"context"
	"encoding/json"
	"errors"
	"os"
	"path/filepath"

	"github.com/AlecAivazis/survey/v2"
	"github.com/mongodb/mongodb-atlas-cli/internal/config"
	"github.com/mongodb/mongodb-atlas-cli/internal/log"
	"github.com/mongodb/mongodb-atlas-cli/internal/store"
	"github.com/spf13/afero"
	"github.com/spf13/cobra"
)

const (
	cacheFilename           = "telemetry"
	dirPermissions          = 0700
	filePermissions         = 0600
	defaultMaxCacheFileSize = 500_000 // 500KB
)

type tracker struct {
	fs               afero.Fs
	maxCacheFileSize int64
	cacheDir         string
	store            store.EventsSender
	storeSet         bool
	cmd              *cobra.Command
	args             []string
}

func newTracker(ctx context.Context, cmd *cobra.Command, args []string) (*tracker, error) {
	cacheDir, err := os.UserCacheDir()
	if err != nil {
		return nil, err
	}

	cacheDir = filepath.Join(cacheDir, config.ToolName)

	storeSet := true
	telemetryStore, err := store.New(store.AuthenticatedPreset(config.Default()), store.WithContext(ctx), store.Telemetry())
	if err != nil {
		_, _ = log.Debugf("telemetry: failed to set store: %v\n", err)
		storeSet = false
	}

	return &tracker{
		fs:               afero.NewOsFs(),
		maxCacheFileSize: defaultMaxCacheFileSize,
		cacheDir:         cacheDir,
		store:            telemetryStore,
		storeSet:         storeSet,
		cmd:              cmd,
		args:             args,
	}, nil
}

func (t *tracker) defaultCommandOptions() []eventOpt {
	return []eventOpt{withCommandPath(t.cmd), withHelpCommand(t.cmd, t.args), withFlags(t.cmd), withProfile(), withVersion(), withOS(), withAuthMethod(), withService(), withProjectID(t.cmd), withOrgID(t.cmd), withTerminal(), withInstaller(t.fs)}
}

func (t *tracker) trackCommand(data TrackOptions) error {
	options := append(t.defaultCommandOptions(), withDuration(t.cmd))
	if data.Signal != "" {
		options = append(options, withSignal(data.Signal))
	}
	if data.Err != nil {
		options = append(options, withError(data.Err))
	}
	event := newEvent(options...)
	if !t.storeSet {
		return t.save(event)
	}
	events, err := t.read()
	if err != nil {
		_, _ = log.Debugf("telemetry: failed to read cache: %v\n", err)
	}
	events = append(events, event)
	err = t.store.SendEvents(events)
	if err != nil {
		return t.save(event)
	}
	return t.remove()
}

func (t *tracker) openCacheFile() (afero.File, error) {
	exists, err := afero.DirExists(t.fs, t.cacheDir)
	if err != nil {
		return nil, err
	}
	if !exists {
		if mkdirError := t.fs.MkdirAll(t.cacheDir, dirPermissions); mkdirError != nil {
			return nil, mkdirError
		}
	}
	filename := filepath.Join(t.cacheDir, cacheFilename)
	exists, err = afero.Exists(t.fs, filename)
	if err != nil {
		return nil, err
	}
	if exists {
		info, statError := t.fs.Stat(filename)
		if statError != nil {
			return nil, statError
		}
		size := info.Size()
		if size > t.maxCacheFileSize {
			return nil, errors.New("telemetry cache file too large")
		}
	}
	file, err := t.fs.OpenFile(filename, os.O_APPEND|os.O_WRONLY|os.O_CREATE, filePermissions)
	return file, err
}

// Append a single event to the cache file.
func (t *tracker) save(event Event) error {
	file, err := t.openCacheFile()
	if err != nil {
		return err
	}
	defer file.Close()
	data, err := json.Marshal(event)
	if err != nil {
		return err
	}
	data = append(data, '\n')
	_, err = file.Write(data)
	return err
}

// Read all events in the cache file.
func (t *tracker) read() ([]Event, error) {
	initialSize := 100
	events := make([]Event, 0, initialSize)
	filename := filepath.Join(t.cacheDir, cacheFilename)
	exists, err := afero.Exists(t.fs, filename)
	if err != nil {
		return events, err
	}
	if exists {
		file, err := t.fs.Open(filename)
		if err != nil {
			return events, err
		}
		defer file.Close()
		decoder := json.NewDecoder(file)
		for decoder.More() {
			var event Event
			err = decoder.Decode(&event)
			if err != nil {
				return events, err
			}
			events = append(events, event)
		}
	}
	return events, nil
}

// Removes the cache file.
func (t *tracker) remove() error {
	filename := filepath.Join(t.cacheDir, cacheFilename)
	exists, err := afero.Exists(t.fs, filename)
	if exists && err == nil {
		return t.fs.Remove(filename)
	}
	return err
}

func castBool(i interface{}) bool {
	b, ok := i.(bool)
	if ok {
		return b
	}

	p, ok := i.(*bool)

	var ret bool
	if ok && i != nil {
		ret = *p
	}

	return ret
}

func castString(i interface{}) string {
	s, ok := i.(string)
	if ok {
		return s
	}

	p, ok := i.(*string)

	var ret string
	if ok && i != nil {
		ret = *p
	}

	return ret
}

func (t *tracker) trackSurvey(p survey.Prompt, response interface{}, e error) error {
	options := t.defaultCommandOptions()

	if e != nil {
		options = append(options, withError(e))
	}

	switch v := p.(type) {
	case *survey.Confirm:
		choice := "false"
		if castBool(response) {
			choice = "true"
		}
		options = append(options, withPrompt(v.Message, "confirm"), withDefault(castBool(response) == v.Default), withChoice(choice))
	case *survey.Input:
		options = append(options, withPrompt(v.Message, "input"), withDefault(castString(response) == v.Default), withEmpty(castString(response) == ""))
	case *survey.Password:
		options = append(options, withPrompt(v.Message, "password"), withEmpty(castString(response) == ""))
	case *survey.Select:
		options = append(options, withPrompt(v.Message, "select"), withDefault(castString(response) == v.Default), withEmpty(castString(response) == ""), withChoice(castString(response)))
	default:
		return errors.New("unknown survey prompt")
	}

	event := newEvent(options...)

	// all sent at once via TrackCommand
	// assuming there is always a TrackCommand after many TrackAsk
	return t.save(event)
}
