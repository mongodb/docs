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

package jsonwriter

import (
	"encoding/json"
	"fmt"
	"io"
)

const (
	prefix = ""
	indent = "  "
)

func Print(w io.Writer, obj interface{}) error {
	prettyJSON, err := json.MarshalIndent(obj, prefix, indent)
	if err != nil {
		return err
	}
	_, err = fmt.Fprintln(w, string(prettyJSON))

	return err
}
