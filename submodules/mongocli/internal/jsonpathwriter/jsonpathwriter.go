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

package jsonpathwriter

import (
	"encoding/json"
	"errors"
	"fmt"
	"io"

	"github.com/PaesslerAG/jsonpath"
)

func Print(w io.Writer, path string, obj interface{}) error {
	if path == "" {
		return errors.New("empty jsonpath")
	}

	jsonString, err := json.Marshal(obj)
	if err != nil {
		return err
	}

	var val interface{}
	if e := json.Unmarshal(jsonString, &val); e != nil {
		return e
	}

	v, err := jsonpath.Get(path, val)
	if err != nil {
		return err
	}

	_, err = fmt.Fprintln(w, v)
	return err
}
