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

package randgen

import (
	"crypto/rand"
	"encoding/base64"
	"math/big"
)

const asciiMax = 127

// generateRandomASCIIString generate a random string of printable ASCII characters.
func generateRandomASCIIString(length int) (string, error) {
	result := ""
	for {
		if len(result) >= length {
			return result, nil
		}
		num, err := rand.Int(rand.Reader, big.NewInt(int64(asciiMax)))
		if err != nil {
			return "", err
		}
		n := num.Int64()
		// Make sure that the number/byte/letter is inside
		// the range of printable ASCII characters (excluding space and DEL)
		if n > 64 && n < asciiMax {
			result += string(rune(n))
		}
	}
}

// GenerateRandomBase64String generate a random ASCII string encoded using base64.
func GenerateRandomBase64String(length int) (string, error) {
	result, err := generateRandomASCIIString(length)
	return base64.StdEncoding.EncodeToString([]byte(result))[:length], err
}
