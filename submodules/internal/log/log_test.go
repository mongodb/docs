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
	"bytes"
	"fmt"
	"os"
	"testing"
)

const debugF = "Debug"
const debuglnF = "Debugln"
const debugfF = "Debugf"
const warningF = "Warning"
const warninglnF = "Warningln"
const warningfF = "Warningf"

func TestLogger(t *testing.T) {
	testCases := []struct {
		input    []any
		level    Level
		f        string
		expected string
	}{
		{input: []any{"test"}, level: NoneLevel, f: debugF, expected: ""},
		{input: []any{"test"}, level: NoneLevel, f: debuglnF, expected: ""},
		{input: []any{"test%v", 1}, level: NoneLevel, f: debugfF, expected: ""},

		{input: []any{"test"}, level: DebugLevel, f: debugF, expected: "test"},
		{input: []any{"test"}, level: DebugLevel, f: debuglnF, expected: "test\n"},
		{input: []any{"test%v", 1}, level: DebugLevel, f: debugfF, expected: "test1"},

		{input: []any{"test"}, level: WarningLevel, f: debugF, expected: ""},
		{input: []any{"test"}, level: WarningLevel, f: debuglnF, expected: ""},
		{input: []any{"test%v", 1}, level: WarningLevel, f: debugfF, expected: ""},

		{input: []any{"test"}, level: NoneLevel, f: warningF, expected: ""},
		{input: []any{"test"}, level: NoneLevel, f: warninglnF, expected: ""},
		{input: []any{"test%v", 1}, level: NoneLevel, f: warningfF, expected: ""},

		{input: []any{"test"}, level: DebugLevel, f: warningF, expected: "test"},
		{input: []any{"test"}, level: DebugLevel, f: warninglnF, expected: "test\n"},
		{input: []any{"test%v", 1}, level: DebugLevel, f: warningfF, expected: "test1"},

		{input: []any{"test"}, level: DebugLevel, f: warningF, expected: "test"},
		{input: []any{"test"}, level: DebugLevel, f: warninglnF, expected: "test\n"},
		{input: []any{"test%v", 1}, level: DebugLevel, f: warningfF, expected: "test1"},
	}

	for i, testCase := range testCases {
		t.Run(fmt.Sprintf("%v %v", i, testCase.f), func(t *testing.T) {
			buf := new(bytes.Buffer)
			logger := New(buf, testCase.level)
			var err error
			switch testCase.f {
			case debugF:
				_, err = logger.Debug(testCase.input...)
			case debuglnF:
				_, err = logger.Debugln(testCase.input...)
			case debugfF:
				_, err = logger.Debugf(testCase.input[0].(string), testCase.input[1:]...)
			case warningF:
				_, err = logger.Warning(testCase.input...)
			case warninglnF:
				_, err = logger.Warningln(testCase.input...)
			case warningfF:
				_, err = logger.Warningf(testCase.input[0].(string), testCase.input[1:]...)
			}
			if err != nil {
				t.Fatal(err)
			}
			got := buf.String()
			if got != testCase.expected {
				t.Fatalf("expected %v got %v", testCase.expected, got)
			}
		})
	}
}

func TestPackage(t *testing.T) {
	testCases := []struct {
		input    []any
		level    Level
		f        string
		expected string
	}{
		{input: []any{"test"}, level: NoneLevel, f: debugF, expected: ""},
		{input: []any{"test"}, level: NoneLevel, f: debuglnF, expected: ""},
		{input: []any{"test%v", 1}, level: NoneLevel, f: debugfF, expected: ""},

		{input: []any{"test"}, level: DebugLevel, f: debugF, expected: "test"},
		{input: []any{"test"}, level: DebugLevel, f: debuglnF, expected: "test\n"},
		{input: []any{"test%v", 1}, level: DebugLevel, f: debugfF, expected: "test1"},

		{input: []any{"test"}, level: WarningLevel, f: debugF, expected: ""},
		{input: []any{"test"}, level: WarningLevel, f: debuglnF, expected: ""},
		{input: []any{"test%v", 1}, level: WarningLevel, f: debugfF, expected: ""},

		{input: []any{"test"}, level: NoneLevel, f: warningF, expected: ""},
		{input: []any{"test"}, level: NoneLevel, f: warninglnF, expected: ""},
		{input: []any{"test%v", 1}, level: NoneLevel, f: warningfF, expected: ""},

		{input: []any{"test"}, level: DebugLevel, f: warningF, expected: "test"},
		{input: []any{"test"}, level: DebugLevel, f: warninglnF, expected: "test\n"},
		{input: []any{"test%v", 1}, level: DebugLevel, f: warningfF, expected: "test1"},

		{input: []any{"test"}, level: DebugLevel, f: warningF, expected: "test"},
		{input: []any{"test"}, level: DebugLevel, f: warninglnF, expected: "test\n"},
		{input: []any{"test%v", 1}, level: DebugLevel, f: warningfF, expected: "test1"},
	}

	for i, testCase := range testCases {
		t.Run(fmt.Sprintf("%v %v", i, testCase.f), func(t *testing.T) {
			buf := new(bytes.Buffer)
			SetOutput(buf)
			SetLevel(testCase.level)
			var err error
			switch testCase.f {
			case debugF:
				_, err = Debug(testCase.input...)
			case debuglnF:
				_, err = Debugln(testCase.input...)
			case debugfF:
				_, err = Debugf(testCase.input[0].(string), testCase.input[1:]...)
			case warningF:
				_, err = Warning(testCase.input...)
			case warninglnF:
				_, err = Warningln(testCase.input...)
			case warningfF:
				_, err = Warningf(testCase.input[0].(string), testCase.input[1:]...)
			}
			if err != nil {
				t.Fatal(err)
			}
			got := buf.String()
			if got != testCase.expected {
				t.Fatalf("expected %v got %v", testCase.expected, got)
			}
		})
	}
	SetLevel(WarningLevel)
	SetOutput(os.Stderr)
}
