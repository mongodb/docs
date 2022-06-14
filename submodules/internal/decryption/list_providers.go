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

package decryption

import (
	"io"

	"github.com/mongodb/mongodb-atlas-cli/internal/log"
)

func ListKeyProviders(logReader io.ReadSeeker) ([]*AuditLogLineKeyStoreIdentifier, error) {
	_, logLineScanner, err := readAuditLogFile(logReader)
	if err != nil {
		return nil, err
	}

	var ret []*AuditLogLineKeyStoreIdentifier
	idx := 0
	for ; logLineScanner.Scan(); idx++ {
		lineNb := idx + 1
		logLine, err := logLineScanner.AuditLogLine()
		if err != nil {
			if _, printErr := log.Warningf("error parsing line %d, %v", lineNb, err); printErr != nil {
				return nil, printErr
			}
			continue
		}

		if logLine.AuditRecordType != AuditHeaderRecord {
			continue
		}

		ret = append(ret, &logLine.KeyStoreIdentifier)
	}
	if err := logLineScanner.Err(); err != nil {
		lineNb := idx + 1
		if _, printErr := log.Warningf("error parsing line %d, %v", lineNb, err); printErr != nil {
			return nil, printErr
		}
	}

	return ret, nil
}
