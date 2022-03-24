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

package prompt

import (
	"fmt"

	"github.com/AlecAivazis/survey/v2"
)

// NewDeleteConfirm creates a prompt to confirm if the entry should be deleted.
func NewDeleteConfirm(entry string) survey.Prompt {
	prompt := &survey.Confirm{
		Message: fmt.Sprintf("Are you sure you want to delete: %s", entry),
	}
	return prompt
}

// NewConfirm creates a prompt to confirm if the entry should be deleted.
func NewConfirm(message string) survey.Prompt {
	prompt := &survey.Confirm{
		Message: message,
	}
	return prompt
}
