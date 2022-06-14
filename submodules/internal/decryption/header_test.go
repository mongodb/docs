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

//go:build unit

package decryption

import (
	"encoding/base64"
	"testing"
	"time"

	"github.com/mongodb/mongodb-atlas-cli/internal/decryption/keyproviders"
	"github.com/openlyinc/pointy"
)

func Test_validateMAC(t *testing.T) {
	validKey, _ := base64.StdEncoding.DecodeString("pnvb++3sbhxIJdfODOq5uIaUX8yxTuWS95VLgES30FM=")
	invalidKey, _ := base64.StdEncoding.DecodeString("pnvb++4sbhxIJdfODOq5uIaUX8yxTuWS95VLgES30FM=")
	validTimestamp := time.UnixMilli(1644232049921)
	invalidTimestamp := time.UnixMilli(0)

	testCases := []struct {
		input       HeaderRecord
		inputKey    []byte
		expectedErr bool
	}{
		{
			input: HeaderRecord{
				Timestamp: validTimestamp,
				Version:   "0.0",
				MAC:       "qE9fUsGK0EuRrrCRAQAAAAAAAAAAAAAA",
			},
			inputKey:    validKey,
			expectedErr: false,
		},
		{
			input: HeaderRecord{
				Timestamp: invalidTimestamp,
				Version:   "0.0",
				MAC:       "qE9fUsGK0EuRrrCRAQAAAAAAAAAAAAAA",
			},
			inputKey:    validKey,
			expectedErr: true,
		},
		{
			input: HeaderRecord{
				Timestamp: validTimestamp,
				Version:   "0.1",
				MAC:       "qE9fUsGK0EuRrrCRAQAAAAAAAAAAAAAA",
			},
			inputKey:    validKey,
			expectedErr: true,
		},
		{
			input: HeaderRecord{
				Timestamp: validTimestamp,
				Version:   "0.0",
				MAC:       "wrongAAAAAAAAAAAAAAAAAAAAAAAAAAA",
			},
			inputKey:    validKey,
			expectedErr: true,
		},
		{
			input: HeaderRecord{
				Timestamp: validTimestamp,
				Version:   "0.0",
				MAC:       "qE9fUsGK0EuRrrCRAQAAAAAAAAAAAAAA",
			},
			inputKey:    invalidKey,
			expectedErr: true,
		},
	}

	for _, testCase := range testCases {
		err := testCase.input.validateMAC(testCase.inputKey)
		if testCase.expectedErr && err == nil {
			t.Errorf("expected: not nil got: %v", err)
		} else if !testCase.expectedErr && err != nil {
			t.Errorf("expected: nil got: %v", err)
		}
	}
}

func Test_validateHeaderFields(t *testing.T) {
	ts := time.Now()
	invalidCompressionMode := "foo"
	provider := keyproviders.LocalKey
	encryptedKey := []byte{0, 1, 2, 3}

	testCases := []struct {
		input     AuditLogLine
		expectErr bool
	}{
		{
			input:     AuditLogLine{},
			expectErr: true,
		},
		{
			input: AuditLogLine{
				TS:              &ts,
				Version:         pointy.String("0.0"),
				CompressionMode: pointy.String("none"),
				KeyStoreIdentifier: AuditLogLineKeyStoreIdentifier{
					Provider: &provider,
				},
				EncryptedKey:    encryptedKey,
				MAC:             pointy.String("mac"),
				AuditRecordType: AuditHeaderRecord,
			},
			expectErr: false,
		},
		{
			input: AuditLogLine{
				TS:              &ts,
				Version:         pointy.String("0.0"),
				CompressionMode: pointy.String("none"),
				KeyStoreIdentifier: AuditLogLineKeyStoreIdentifier{
					Provider: &provider,
				},
				EncryptedKey: encryptedKey,
				MAC:          pointy.String("mac"),
			},
			expectErr: true,
		},
		{
			input: AuditLogLine{
				TS:              &ts,
				Version:         pointy.String("0.0"),
				CompressionMode: pointy.String("none"),
				KeyStoreIdentifier: AuditLogLineKeyStoreIdentifier{
					Provider: &provider,
				},
				EncryptedKey:    encryptedKey,
				AuditRecordType: AuditHeaderRecord,
			},
			expectErr: true,
		},
		{
			input: AuditLogLine{
				TS:              &ts,
				Version:         pointy.String("0.0"),
				CompressionMode: pointy.String("none"),
				KeyStoreIdentifier: AuditLogLineKeyStoreIdentifier{
					Provider: &provider,
				},
				MAC:             pointy.String("mac"),
				AuditRecordType: AuditHeaderRecord,
			},
			expectErr: true,
		},
		{
			input: AuditLogLine{
				TS:              &ts,
				Version:         pointy.String("0.0"),
				CompressionMode: pointy.String("none"),
				MAC:             pointy.String("mac"),
				EncryptedKey:    encryptedKey,
				AuditRecordType: AuditHeaderRecord,
			},
			expectErr: true,
		},
		{
			input: AuditLogLine{
				TS:              &ts,
				CompressionMode: pointy.String("none"),
				KeyStoreIdentifier: AuditLogLineKeyStoreIdentifier{
					Provider: &provider,
				},
				MAC:             pointy.String("mac"),
				EncryptedKey:    encryptedKey,
				AuditRecordType: AuditHeaderRecord,
			},
			expectErr: true,
		},
		{
			input: AuditLogLine{
				Version:         pointy.String("0.0"),
				CompressionMode: pointy.String("none"),
				KeyStoreIdentifier: AuditLogLineKeyStoreIdentifier{
					Provider: &provider,
				},
				MAC:             pointy.String("mac"),
				EncryptedKey:    encryptedKey,
				AuditRecordType: AuditHeaderRecord,
			},
			expectErr: true,
		},
		{
			input: AuditLogLine{
				TS:      &ts,
				Version: pointy.String("0.0"),
				KeyStoreIdentifier: AuditLogLineKeyStoreIdentifier{
					Provider: &provider,
				},
				EncryptedKey:    encryptedKey,
				MAC:             pointy.String("mac"),
				AuditRecordType: AuditHeaderRecord,
			},
			expectErr: true,
		},
		{
			input: AuditLogLine{
				TS:              &ts,
				Version:         pointy.String("0.0"),
				CompressionMode: &invalidCompressionMode,
				KeyStoreIdentifier: AuditLogLineKeyStoreIdentifier{
					Provider: &provider,
				},
				MAC:             pointy.String("mac"),
				EncryptedKey:    encryptedKey,
				AuditRecordType: AuditHeaderRecord,
			},
			expectErr: true,
		},
	}
	for _, testCase := range testCases {
		err := validateHeaderFields(&testCase.input)
		if testCase.expectErr && err == nil {
			t.Errorf("expected: not nil got: %v", err)
		} else if !testCase.expectErr && err != nil {
			t.Errorf("expected: nil got: %v", err)
		}
	}
}
