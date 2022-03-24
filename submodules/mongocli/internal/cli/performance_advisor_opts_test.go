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

package cli

import (
	"fmt"
	"testing"

	"github.com/stretchr/testify/assert"
)

func TestPerformanceAdvisorOpts_ValidateProcessName(t *testing.T) {
	type test struct {
		input string
		want  error
	}

	tests := []test{
		{input: "test:8080", want: nil},
		{input: "test:8080:9090", want: fmt.Errorf("'%v' is not valid", "test:8080:9090")},
		{input: "test:8080:test", want: fmt.Errorf("'%v' is not valid", "test:8080:test")},
		{input: "test", want: fmt.Errorf("'%v' is not valid", "test")},
	}

	for _, tc := range tests {
		opts := new(PerformanceAdvisorOpts)
		opts.ProcessName = tc.input
		got := opts.validateProcessName()
		assert.Equal(t, tc.want, got)
	}
}
