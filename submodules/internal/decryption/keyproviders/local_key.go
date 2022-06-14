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

package keyproviders

import (
	"encoding/base64"
	"errors"
	"os"

	"github.com/mongodb/mongodb-atlas-cli/internal/decryption/aes"
	"github.com/mongodb/mongodb-atlas-cli/internal/log"
)

// LocalKeyIdentifier config for the localKey used to encrypt the Log Encryption Key (LEK).
type LocalKeyIdentifier struct {
	KeyStoreIdentifier

	// Header
	HeaderFilename string

	// CLI
	Filename string
}

var ErrLocalKeyCredentialMissing = errors.New("filename missing")

func (ki *LocalKeyIdentifier) ValidateCredentials() error {
	if ki.Filename == "" {
		_, _ = log.Warningf(`No credentials found for resource: LocalKey filename="%v"
`, ki.HeaderFilename)

		f, err := provideInput("Provide key filename:", "")
		if err != nil {
			return err
		}
		ki.Filename = f
		if ki.Filename == "" {
			return ErrLocalKeyCredentialMissing
		}
	}
	return nil
}

// DecryptKey decrypts LEK using KMIP get or decrypt methods.
func (ki *LocalKeyIdentifier) DecryptKey(encryptedKey []byte) ([]byte, error) {
	encodedKEK, err := os.ReadFile(ki.Filename)
	if err != nil {
		return nil, err
	}

	kek, err := base64.StdEncoding.DecodeString(string(encodedKEK))
	if err != nil {
		return nil, err
	}

	iv := encryptedKey[:16]
	encryptedLEK := encryptedKey[16:48]

	cbc := &aes.CBCInput{
		Key: kek,
		IV:  iv,
	}
	return cbc.Decrypt(encryptedLEK)
}
