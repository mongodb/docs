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
	"bytes"
	"encoding/base64"
	"testing"
	"time"

	"github.com/go-test/deep"
	"github.com/mongodb/mongodb-atlas-cli/internal/decryption/keyproviders"
	"github.com/openlyinc/pointy"
)

func buildExpectedLog() []*AuditLogLine {
	ts := time.UnixMilli(1647253664552)
	provider := keyproviders.LocalKey
	encryptedKey, _ := base64.StdEncoding.DecodeString("9Jmg+S67unj4GfLfl4PxmSdo87e1dbtQ0UMrdid7tx7R42XhvtJnoLztSUhYQhWzIne/sNXvPIVl94M9VnXi+g==")
	mac := "OG/VwMlpPU9ChDmHAQAAAAAAAAAAAAAA"
	tsLog := time.UnixMilli(1647253664553)
	recordTypeLog := AuditLogRecord

	return []*AuditLogLine{
		{
			TS:              &ts,
			Version:         pointy.String("0.0"),
			CompressionMode: pointy.String("zstd"),
			KeyStoreIdentifier: AuditLogLineKeyStoreIdentifier{
				Provider: &provider,
				Filename: "localKey",
			},
			EncryptedKey:    encryptedKey,
			MAC:             &mac,
			AuditRecordType: AuditHeaderRecord,
		},
		{
			TS:              &tsLog,
			AuditRecordType: recordTypeLog,
			Log:             pointy.String("0QjwufYIydvNuDXTAQAAAAEAAAAAAAAAUZaMkB7yYllyHE8zES4A+BK5HODkhWjTBT9Yq/vwG3Tv8W4kEgED40aDMp8LLQbWzO/gTC+MzGSnHFqer6DgW9T1a7g4GqLlZBmP9WJhYxM+2yDURVsKuoghKlWlosXVGgd1GPD7PexRk8gytjVeFFxYTolPOwbLeek3feaMT1vThflfkAefc+VhUSfxkctX8NKvtY1CLLjrOyzXEG0OOBainbXiybCAyszDC9WdL0Cg8wx5kn4LXQHshFjCWA8GMIWQ8MNU7dmhx1mcEoKGrpdVeP/yQNOxSjkKDrC2o1P0wXigOZ8zRz/W"),
		},
	}
}

func Test_readAuditLogFile(t *testing.T) {
	inputJSON := []byte(`{"ts":{"$date":{"$numberLong":"1647253664552"}},"auditrecordtype":"header","version":"0.0","compressionmode":"zstd","keystoreidentifier":{"provider":"local","filename":"localKey"},"encryptedkey":{"$binary":{"base64":"9Jmg+S67unj4GfLfl4PxmSdo87e1dbtQ0UMrdid7tx7R42XhvtJnoLztSUhYQhWzIne/sNXvPIVl94M9VnXi+g==","subType":"00"}},"mac":"OG/VwMlpPU9ChDmHAQAAAAAAAAAAAAAA"}
{"ts":{"$date":{"$numberLong":"1647253664553"}},"log":"0QjwufYIydvNuDXTAQAAAAEAAAAAAAAAUZaMkB7yYllyHE8zES4A+BK5HODkhWjTBT9Yq/vwG3Tv8W4kEgED40aDMp8LLQbWzO/gTC+MzGSnHFqer6DgW9T1a7g4GqLlZBmP9WJhYxM+2yDURVsKuoghKlWlosXVGgd1GPD7PexRk8gytjVeFFxYTolPOwbLeek3feaMT1vThflfkAefc+VhUSfxkctX8NKvtY1CLLjrOyzXEG0OOBainbXiybCAyszDC9WdL0Cg8wx5kn4LXQHshFjCWA8GMIWQ8MNU7dmhx1mcEoKGrpdVeP/yQNOxSjkKDrC2o1P0wXigOZ8zRz/W"}`)
	inputBSON, _ := base64.StdEncoding.DecodeString(`GQEAAAl0cwAoM/iHfwEAAAJ2ZXJzaW9uAAQAAAAwLjAAAmNvbXByZXNzaW9uTW9kZQAFAAAAenN0ZAADa2V5U3RvcmVJZGVudGlmaWVyADAAAAACcHJvdmlkZXIABgAAAGxvY2FsAAJmaWxlbmFtZQAJAAAAbG9jYWxLZXkAAAVlbmNyeXB0ZWRLZXkAQAAAAAD0maD5Lru6ePgZ8t+Xg/GZJ2jzt7V1u1DRQyt2J3u3HtHjZeG+0megvO1JSFhCFbMid7+w1e88hWX3gz1WdeL6Ak1BQwAhAAAAT0cvVndNbHBQVTlDaERtSEFRQUFBQUFBQUFBQUFBQUEAAmF1ZGl0UmVjb3JkVHlwZQAHAAAAaGVhZGVyAABzAQAACXRzACkz+Id/AQAAAmxvZwBZAQAAMFFqd3VmWUl5ZHZOdURYVEFRQUFBQUVBQUFBQUFBQUFVWmFNa0I3eVlsbHlIRTh6RVM0QStCSzVIT0RraFdqVEJUOVlxL3Z3RzNUdjhXNGtFZ0VENDBhRE1wOExMUWJXek8vZ1RDK016R1NuSEZxZXI2RGdXOVQxYTdnNEdxTGxaQm1QOVdKaFl4TSsyeURVUlZzS3VvZ2hLbFdsb3NYVkdnZDFHUEQ3UGV4Ums4Z3l0alZlRkZ4WVRvbFBPd2JMZWVrM2ZlYU1UMXZUaGZsZmtBZWZjK1ZoVVNmeGtjdFg4Tkt2dFkxQ0xManJPeXpYRUcwT09CYWluYlhpeWJDQXlzekRDOVdkTDBDZzh3eDVrbjRMWFFIc2hGakNXQThHTUlXUThNTlU3ZG1oeDFtY0VvS0dycGRWZVAveVFOT3hTamtLRHJDMm8xUDB3WGlnT1o4elJ6L1cAAA==`)

	expectedLog := buildExpectedLog()
	testCases := []struct {
		name           string
		input          []byte
		expectedFormat AuditLogFormat
		expectedLog    []*AuditLogLine
	}{
		{
			name:           "json",
			input:          inputJSON,
			expectedFormat: JSON,
			expectedLog:    expectedLog,
		},
		{
			name:           "bson",
			input:          inputBSON,
			expectedFormat: BSON,
			expectedLog:    expectedLog,
		},
	}
	for _, tt := range testCases {
		input := tt.input
		expectedFormat := tt.expectedFormat
		el := expectedLog
		t.Run(tt.name, func(t *testing.T) {
			format, scanner, err := readAuditLogFile(bytes.NewReader(input))
			if err != nil {
				t.Fatal(err)
			}
			if expectedFormat != format {
				t.Fatalf("expected: %v got: %v", expectedFormat, format)
			}
			var logs []*AuditLogLine
			for scanner.Scan() {
				log, err2 := scanner.AuditLogLine()
				if err2 != nil {
					t.Fatal(err2)
				}
				logs = append(logs, log)
			}
			if scanner.Err() != nil {
				t.Fatal(scanner.Err())
			}

			if diff := deep.Equal(el, logs); diff != nil {
				t.Error(diff)
			}
		})
	}
}

func Test_readAuditLogFile_corruptedBSON(t *testing.T) {
	expectedLog := buildExpectedLog()

	testCases := []struct {
		name        string
		input       string
		expectErr   bool
		expectedLog []*AuditLogLine
	}{
		{
			name:      "valid",
			input:     `GQEAAAl0cwAoM/iHfwEAAAJ2ZXJzaW9uAAQAAAAwLjAAAmNvbXByZXNzaW9uTW9kZQAFAAAAenN0ZAADa2V5U3RvcmVJZGVudGlmaWVyADAAAAACcHJvdmlkZXIABgAAAGxvY2FsAAJmaWxlbmFtZQAJAAAAbG9jYWxLZXkAAAVlbmNyeXB0ZWRLZXkAQAAAAAD0maD5Lru6ePgZ8t+Xg/GZJ2jzt7V1u1DRQyt2J3u3HtHjZeG+0megvO1JSFhCFbMid7+w1e88hWX3gz1WdeL6Ak1BQwAhAAAAT0cvVndNbHBQVTlDaERtSEFRQUFBQUFBQUFBQUFBQUEAAmF1ZGl0UmVjb3JkVHlwZQAHAAAAaGVhZGVyAABzAQAACXRzACkz+Id/AQAAAmxvZwBZAQAAMFFqd3VmWUl5ZHZOdURYVEFRQUFBQUVBQUFBQUFBQUFVWmFNa0I3eVlsbHlIRTh6RVM0QStCSzVIT0RraFdqVEJUOVlxL3Z3RzNUdjhXNGtFZ0VENDBhRE1wOExMUWJXek8vZ1RDK016R1NuSEZxZXI2RGdXOVQxYTdnNEdxTGxaQm1QOVdKaFl4TSsyeURVUlZzS3VvZ2hLbFdsb3NYVkdnZDFHUEQ3UGV4Ums4Z3l0alZlRkZ4WVRvbFBPd2JMZWVrM2ZlYU1UMXZUaGZsZmtBZWZjK1ZoVVNmeGtjdFg4Tkt2dFkxQ0xManJPeXpYRUcwT09CYWluYlhpeWJDQXlzekRDOVdkTDBDZzh3eDVrbjRMWFFIc2hGakNXQThHTUlXUThNTlU3ZG1oeDFtY0VvS0dycGRWZVAveVFOT3hTamtLRHJDMm8xUDB3WGlnT1o4elJ6L1cAAA==`,
			expectErr: false,
		},
		{
			name:      "tampered first byte, doc size would be wrong 279 instead of 281",
			input:     `FwEAAAl0cwAoM/iHfwEAAAJ2ZXJzaW9uAAQAAAAwLjAAAmNvbXByZXNzaW9uTW9kZQAFAAAAenN0ZAADa2V5U3RvcmVJZGVudGlmaWVyADAAAAACcHJvdmlkZXIABgAAAGxvY2FsAAJmaWxlbmFtZQAJAAAAbG9jYWxLZXkAAAVlbmNyeXB0ZWRLZXkAQAAAAAD0maD5Lru6ePgZ8t+Xg/GZJ2jzt7V1u1DRQyt2J3u3HtHjZeG+0megvO1JSFhCFbMid7+w1e88hWX3gz1WdeL6Ak1BQwAhAAAAT0cvVndNbHBQVTlDaERtSEFRQUFBQUFBQUFBQUFBQUEAAmF1ZGl0UmVjb3JkVHlwZQAHAAAAaGVhZGVyAABzAQAACXRzACkz+Id/AQAAAmxvZwBZAQAAMFFqd3VmWUl5ZHZOdURYVEFRQUFBQUVBQUFBQUFBQUFVWmFNa0I3eVlsbHlIRTh6RVM0QStCSzVIT0RraFdqVEJUOVlxL3Z3RzNUdjhXNGtFZ0VENDBhRE1wOExMUWJXek8vZ1RDK016R1NuSEZxZXI2RGdXOVQxYTdnNEdxTGxaQm1QOVdKaFl4TSsyeURVUlZzS3VvZ2hLbFdsb3NYVkdnZDFHUEQ3UGV4Ums4Z3l0alZlRkZ4WVRvbFBPd2JMZWVrM2ZlYU1UMXZUaGZsZmtBZWZjK1ZoVVNmeGtjdFg4Tkt2dFkxQ0xManJPeXpYRUcwT09CYWluYlhpeWJDQXlzekRDOVdkTDBDZzh3eDVrbjRMWFFIc2hGakNXQThHTUlXUThNTlU3ZG1oeDFtY0VvS0dycGRWZVAveVFOT3hTamtLRHJDMm8xUDB3WGlnT1o4elJ6L1cAAA==`,
			expectErr: true,
		},
		{
			name:      "tampered first byte, doc size would be wrong 283 instead of 281",
			input:     `GwEAAAl0cwAoM/iHfwEAAAJ2ZXJzaW9uAAQAAAAwLjAAAmNvbXByZXNzaW9uTW9kZQAFAAAAenN0ZAADa2V5U3RvcmVJZGVudGlmaWVyADAAAAACcHJvdmlkZXIABgAAAGxvY2FsAAJmaWxlbmFtZQAJAAAAbG9jYWxLZXkAAAVlbmNyeXB0ZWRLZXkAQAAAAAD0maD5Lru6ePgZ8t+Xg/GZJ2jzt7V1u1DRQyt2J3u3HtHjZeG+0megvO1JSFhCFbMid7+w1e88hWX3gz1WdeL6Ak1BQwAhAAAAT0cvVndNbHBQVTlDaERtSEFRQUFBQUFBQUFBQUFBQUEAAmF1ZGl0UmVjb3JkVHlwZQAHAAAAaGVhZGVyAABzAQAACXRzACkz+Id/AQAAAmxvZwBZAQAAMFFqd3VmWUl5ZHZOdURYVEFRQUFBQUVBQUFBQUFBQUFVWmFNa0I3eVlsbHlIRTh6RVM0QStCSzVIT0RraFdqVEJUOVlxL3Z3RzNUdjhXNGtFZ0VENDBhRE1wOExMUWJXek8vZ1RDK016R1NuSEZxZXI2RGdXOVQxYTdnNEdxTGxaQm1QOVdKaFl4TSsyeURVUlZzS3VvZ2hLbFdsb3NYVkdnZDFHUEQ3UGV4Ums4Z3l0alZlRkZ4WVRvbFBPd2JMZWVrM2ZlYU1UMXZUaGZsZmtBZWZjK1ZoVVNmeGtjdFg4Tkt2dFkxQ0xManJPeXpYRUcwT09CYWluYlhpeWJDQXlzekRDOVdkTDBDZzh3eDVrbjRMWFFIc2hGakNXQThHTUlXUThNTlU3ZG1oeDFtY0VvS0dycGRWZVAveVFOT3hTamtLRHJDMm8xUDB3WGlnT1o4elJ6L1cAAA==`,
			expectErr: true,
		},
		{
			name:      "tampered last byte to be 1 instead of 0",
			input:     `GQEAAAl0cwAoM/iHfwEAAAJ2ZXJzaW9uAAQAAAAwLjAAAmNvbXByZXNzaW9uTW9kZQAFAAAAenN0ZAADa2V5U3RvcmVJZGVudGlmaWVyADAAAAACcHJvdmlkZXIABgAAAGxvY2FsAAJmaWxlbmFtZQAJAAAAbG9jYWxLZXkAAAVlbmNyeXB0ZWRLZXkAQAAAAAD0maD5Lru6ePgZ8t+Xg/GZJ2jzt7V1u1DRQyt2J3u3HtHjZeG+0megvO1JSFhCFbMid7+w1e88hWX3gz1WdeL6Ak1BQwAhAAAAT0cvVndNbHBQVTlDaERtSEFRQUFBQUFBQUFBQUFBQUEAAmF1ZGl0UmVjb3JkVHlwZQAHAAAAaGVhZGVyAABzAQAACXRzACkz+Id/AQAAAmxvZwBZAQAAMFFqd3VmWUl5ZHZOdURYVEFRQUFBQUVBQUFBQUFBQUFVWmFNa0I3eVlsbHlIRTh6RVM0QStCSzVIT0RraFdqVEJUOVlxL3Z3RzNUdjhXNGtFZ0VENDBhRE1wOExMUWJXek8vZ1RDK016R1NuSEZxZXI2RGdXOVQxYTdnNEdxTGxaQm1QOVdKaFl4TSsyeURVUlZzS3VvZ2hLbFdsb3NYVkdnZDFHUEQ3UGV4Ums4Z3l0alZlRkZ4WVRvbFBPd2JMZWVrM2ZlYU1UMXZUaGZsZmtBZWZjK1ZoVVNmeGtjdFg4Tkt2dFkxQ0xManJPeXpYRUcwT09CYWluYlhpeWJDQXlzekRDOVdkTDBDZzh3eDVrbjRMWFFIc2hGakNXQThHTUlXUThNTlU3ZG1oeDFtY0VvS0dycGRWZVAveVFOT3hTamtLRHJDMm8xUDB3WGlnT1o4elJ6L1cAAQ==`,
			expectErr: true,
		},
		{
			name:      "tampered ts type from 0x9 UTC datetime to 0x13 decimal128",
			input:     `GQEAABN0cwAoM/iHfwEAAAJ2ZXJzaW9uAAQAAAAwLjAAAmNvbXByZXNzaW9uTW9kZQAFAAAAenN0ZAADa2V5U3RvcmVJZGVudGlmaWVyADAAAAACcHJvdmlkZXIABgAAAGxvY2FsAAJmaWxlbmFtZQAJAAAAbG9jYWxLZXkAAAVlbmNyeXB0ZWRLZXkAQAAAAAD0maD5Lru6ePgZ8t+Xg/GZJ2jzt7V1u1DRQyt2J3u3HtHjZeG+0megvO1JSFhCFbMid7+w1e88hWX3gz1WdeL6Ak1BQwAhAAAAT0cvVndNbHBQVTlDaERtSEFRQUFBQUFBQUFBQUFBQUEAAmF1ZGl0UmVjb3JkVHlwZQAHAAAAaGVhZGVyAABzAQAACXRzACkz+Id/AQAAAmxvZwBZAQAAMFFqd3VmWUl5ZHZOdURYVEFRQUFBQUVBQUFBQUFBQUFVWmFNa0I3eVlsbHlIRTh6RVM0QStCSzVIT0RraFdqVEJUOVlxL3Z3RzNUdjhXNGtFZ0VENDBhRE1wOExMUWJXek8vZ1RDK016R1NuSEZxZXI2RGdXOVQxYTdnNEdxTGxaQm1QOVdKaFl4TSsyeURVUlZzS3VvZ2hLbFdsb3NYVkdnZDFHUEQ3UGV4Ums4Z3l0alZlRkZ4WVRvbFBPd2JMZWVrM2ZlYU1UMXZUaGZsZmtBZWZjK1ZoVVNmeGtjdFg4Tkt2dFkxQ0xManJPeXpYRUcwT09CYWluYlhpeWJDQXlzekRDOVdkTDBDZzh3eDVrbjRMWFFIc2hGakNXQThHTUlXUThNTlU3ZG1oeDFtY0VvS0dycGRWZVAveVFOT3hTamtLRHJDMm8xUDB3WGlnT1o4elJ6L1cAAA==`,
			expectErr: true,
		},
	}
	for _, tt := range testCases {
		input := tt.input
		expectErr := tt.expectErr
		t.Run(tt.name, func(t *testing.T) {
			buf, err := base64.StdEncoding.DecodeString(input)
			if err != nil {
				t.Fatal(err)
			}

			format, scanner, err := readAuditLogFile(bytes.NewReader(buf))
			if err != nil && !expectErr {
				t.Fatal(err)
			}
			if format != BSON {
				t.Errorf("expected: BSON got: %v", format)
			}

			var logs []*AuditLogLine
			for scanner.Scan() {
				log, err2 := scanner.AuditLogLine()
				if err2 != nil && !expectErr {
					t.Fatal(err2)
				}
				logs = append(logs, log)
			}
			if scanner.Err() != nil && !expectErr {
				t.Fatal(scanner.Err())
			}

			if diff := deep.Equal(expectedLog, logs); expectErr && diff == nil {
				t.Error("expected failure but decrypted correctly")
			}
		})
	}
}
