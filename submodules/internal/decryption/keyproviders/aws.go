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
	"errors"
	"fmt"

	"github.com/aws/aws-sdk-go/aws"
	"github.com/aws/aws-sdk-go/aws/credentials"
	"github.com/aws/aws-sdk-go/aws/session"
	"github.com/aws/aws-sdk-go/service/kms"
	"github.com/mongodb/mongodb-atlas-cli/internal/log"
)

type AWSKeyIdentifier struct {
	KeyStoreIdentifier
	// Header
	Key      string
	Region   string
	Endpoint string

	// CLI
	AccessKey       string
	SecretAccessKey string
	SessionToken    string

	credentials *credentials.Credentials
}

var (
	ErrAWSInit    = errors.New("failed to initialize AWS KMS Service")
	ErrAWSDecrypt = errors.New("unable to decrypt data key with AWS KMS Service")
)

func (ki *AWSKeyIdentifier) ValidateCredentials() error {
	p := &credentials.ChainProvider{
		VerboseErrors: false,
		Providers: []credentials.Provider{
			&credentials.StaticProvider{Value: credentials.Value{
				AccessKeyID:     ki.AccessKey,
				SecretAccessKey: ki.SecretAccessKey,
				SessionToken:    ki.SessionToken,
			}},
			&credentials.EnvProvider{},
			&credentials.SharedCredentialsProvider{},
		},
	}
	cred := credentials.NewCredentials(p)
	_, err := cred.Get()
	if err != nil {
		if !errors.Is(err, credentials.ErrNoValidProvidersFoundInChain) {
			return err
		}
		_, _ = log.Warningf(`No credentials found for resource: AWS region="%v" endpoint="%v" key="%v"
`, ki.Region, ki.Endpoint, ki.Key)
		_, _ = log.Warningf("Note: if you have an AWS session token leave AWS access key and AWS secret access key empty")
		ki.AccessKey, err = provideInput("Provide AWS access key:", ki.AccessKey)
		if err != nil {
			return err
		}
		ki.SecretAccessKey, err = provideInput("Provide AWS secret access key:", ki.SecretAccessKey)
		if err != nil {
			return err
		}
		ki.SessionToken, err = provideInput("Provide AWS session token:", ki.SessionToken)
		if err != nil {
			return err
		}
		cred = credentials.NewStaticCredentials(ki.AccessKey, ki.SecretAccessKey, ki.SessionToken)
		_, err = cred.Get()
		if err != nil {
			return err
		}
	}
	ki.credentials = cred
	return nil
}

// DecryptKey attempts to decrypt the encrypted key using AWS KMS.
func (ki *AWSKeyIdentifier) DecryptKey(encryptedKey []byte) ([]byte, error) {
	config := aws.NewConfig().WithCredentials(ki.credentials).WithRegion(ki.Region).WithEndpoint(ki.Endpoint)
	s, err := session.NewSession(config)
	if err != nil {
		return nil, fmt.Errorf("%w: %v", ErrAWSInit, err)
	}
	service := kms.New(s, config)

	input := (&kms.DecryptInput{}).SetCiphertextBlob(encryptedKey)
	output, err := service.Decrypt(input)
	if err != nil {
		return nil, fmt.Errorf("%w: %v", ErrAWSDecrypt, err)
	}

	return output.Plaintext, nil
}
