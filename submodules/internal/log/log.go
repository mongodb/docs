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

package log

import (
	"fmt"
	"io"
	"os"
)

type Level int

const (
	NoneLevel Level = iota
	WarningLevel
	DebugLevel
)

type Logger struct {
	w     io.Writer
	level Level
}

func New(w io.Writer, l Level) *Logger {
	return &Logger{
		level: l,
		w:     w,
	}
}

func (l *Logger) SetOutput(w io.Writer) {
	l.w = w
}

func (l *Logger) SetLevel(level Level) {
	l.level = level
}

func (l *Logger) Level() Level {
	return l.level
}

func (l *Logger) IsDebugLevel() bool {
	return l.level >= DebugLevel
}

func (l *Logger) IsWarningLevel() bool {
	return l.level >= WarningLevel
}

func (l Logger) Debug(a ...any) (int, error) {
	if !l.IsDebugLevel() {
		return 0, nil
	}
	return fmt.Fprint(l.w, a...)
}

func (l Logger) Debugln(a ...any) (int, error) {
	if !l.IsDebugLevel() {
		return 0, nil
	}
	return fmt.Fprintln(l.w, a...)
}

func (l Logger) Debugf(format string, a ...any) (int, error) {
	if !l.IsDebugLevel() {
		return 0, nil
	}
	return fmt.Fprintf(l.w, format, a...)
}

func (l Logger) Warning(a ...any) (int, error) {
	if !l.IsWarningLevel() {
		return 0, nil
	}
	return fmt.Fprint(l.w, a...)
}

func (l Logger) Warningln(a ...any) (int, error) {
	if !l.IsWarningLevel() {
		return 0, nil
	}
	return fmt.Fprintln(l.w, a...)
}

func (l Logger) Warningf(format string, a ...any) (int, error) {
	if !l.IsWarningLevel() {
		return 0, nil
	}
	return fmt.Fprintf(l.w, format, a...)
}

var std = New(os.Stderr, WarningLevel)

func SetOutput(w io.Writer) {
	std.SetOutput(w)
}

func SetLevel(level Level) {
	std.SetLevel(level)
}

func IsDebugLevel() bool {
	return std.IsDebugLevel()
}

func IsWarningLevel() bool {
	return std.IsWarningLevel()
}

func Default() *Logger {
	return std
}

func Debug(a ...any) (int, error) {
	return std.Debug(a...)
}

func Debugln(a ...any) (int, error) {
	return std.Debugln(a...)
}

func Debugf(format string, a ...any) (int, error) {
	return std.Debugf(format, a...)
}

func Warning(a ...any) (int, error) {
	return std.Warning(a...)
}

func Warningln(a ...any) (int, error) {
	return std.Warningln(a...)
}

func Warningf(format string, a ...any) (int, error) {
	return std.Warningf(format, a...)
}
