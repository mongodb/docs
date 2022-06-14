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
	"os"
	"strings"

	"github.com/mongodb/mongodb-atlas-cli/internal/decryption/aes"
	"github.com/mongodb/mongodb-atlas-cli/internal/decryption/kmip"
	"github.com/mongodb/mongodb-atlas-cli/internal/decryption/pem"
	"github.com/mongodb/mongodb-atlas-cli/internal/log"
	"go.mongodb.org/mongo-driver/bson"
)

type KMIPKeyWrapMethod string

const (
	KMIPKeyWrapMethodGet     KMIPKeyWrapMethod = "get"
	KMIPKeyWrapMethodEncrypt KMIPKeyWrapMethod = "encrypt"
)

// LocalKeyIdentifier config for the KMIP speaking server used to encrypt the Log Encryption Key (LEK).
type KMIPKeyIdentifier struct {
	KeyStoreIdentifier

	// Header
	UniqueKeyID   string
	ServerNames   []string
	ServerPort    int
	KeyWrapMethod KMIPKeyWrapMethod

	// CLI
	ServerCAFileName          string
	ClientCertificateFileName string
	ClientCertificatePassword string
	Username                  string
	Password                  string
}

// KMIPEncryptedKey encrypted LEK and tag, BSON marshaled.
type KMIPEncryptedKey struct {
	IV  []byte
	Key []byte
}

var (
	ErrKMIPServerCAMissing                  = errors.New("server CA missing")
	ErrKMIPClientCertificateMissing         = errors.New("client certificate missing")
	ErrKMIPServerNamesMissing               = errors.New("server name is not provided")
	ErrKMIPPasswordMissing                  = errors.New("password is not provided")
	ErrKMIPClientCertificatePasswordMissing = errors.New("password for client certificate is not provided")
)

func (ki *KMIPKeyIdentifier) ValidateCredentials() error {
	if ki.ServerCAFileName == "" || ki.ClientCertificateFileName == "" {
		_, err := log.Warningf(`No credentials found for resource: KMIP uniqueKeyID="%v" serverNames="%v" serverPort="%v" keyWrapMethod="%v"
`, ki.UniqueKeyID, strings.Join(ki.ServerNames, "; "), ki.ServerPort, ki.KeyWrapMethod)
		if err != nil {
			return err
		}
	}

	if err := ki.validateServerCA(); err != nil {
		return err
	}

	if err := ki.validateClientCert(); err != nil {
		return err
	}

	return ki.validateUsernameAndPassword()
}

// DecryptKey decrypts LEK using KMIP get or decrypt methods.
func (ki *KMIPKeyIdentifier) DecryptKey(encryptedKey []byte) ([]byte, error) {
	if len(ki.ServerNames) == 0 {
		return nil, ErrKMIPServerNamesMissing
	}

	kmipEncryptedKey, err := decodeEncryptedKey(encryptedKey)
	if err != nil {
		return nil, err
	}

	var clientError error
	collectErr := func(err error, serverName string) {
		if clientError == nil {
			clientError = err
		} else {
			clientError = fmt.Errorf("'%s': %w", serverName, err)
		}
	}

	for _, serverName := range ki.ServerNames {
		kmipClient, err := ki.kmipClient(serverName)
		if err != nil {
			// init KMIP client error (invalid config), skip other KMIP servers
			return nil, err
		}

		var key []byte
		if ki.KeyWrapMethod == KMIPKeyWrapMethodEncrypt {
			key, err = ki.decryptWithKeyWrapMethodEncrypt(kmipClient, kmipEncryptedKey)
		} else {
			key, err = ki.decryptWithKeyWrapMethodGet(kmipClient, kmipEncryptedKey)
		}

		if err == nil {
			// key successfully decrypted, skip other KMIP servers and return decrypted key
			return key, nil
		}
		collectErr(err, serverName)
	}

	return nil, clientError
}

func (ki *KMIPKeyIdentifier) validateUsernameAndPassword() error {
	if ki.Username != "" && ki.Password == "" {
		p, err := provideInput("Provide password for \""+ki.Username+"\":", "")
		if err != nil {
			return err
		}
		ki.Password = p
		if ki.Password == "" {
			return ErrKMIPPasswordMissing
		}
	}
	return nil
}

func (ki *KMIPKeyIdentifier) validateServerCA() error {
	if ki.ServerCAFileName == "" {
		f, err := provideInput("Provide server CA filename:", "")
		if err != nil {
			return err
		}
		ki.ServerCAFileName = f
		if ki.ServerCAFileName == "" {
			return ErrKMIPServerCAMissing
		}
	}

	if _, err := pem.ValidateBlocks(ki.ServerCAFileName); err != nil {
		return fmt.Errorf("server CA %w", err)
	}
	return nil
}

func (ki *KMIPKeyIdentifier) validateClientCert() error {
	if ki.ClientCertificateFileName == "" {
		f, err := provideInput("Provide client certificate filename:", "")
		if err != nil {
			return err
		}
		ki.ClientCertificateFileName = f
		if ki.ClientCertificateFileName == "" {
			return ErrKMIPClientCertificateMissing
		}
	}

	isEncrypted, err := pem.ValidateBlocks(ki.ClientCertificateFileName)
	if err != nil {
		return fmt.Errorf("client certificate %w", err)
	}

	if isEncrypted && ki.ClientCertificatePassword == "" {
		p, err := provideInput("Provide password for client certificate:", "")
		if err != nil {
			return err
		}
		ki.ClientCertificatePassword = p
		if ki.ClientCertificatePassword == "" {
			return ErrKMIPClientCertificatePasswordMissing
		}
	}

	return nil
}

func (ki *KMIPKeyIdentifier) decryptWithKeyWrapMethodEncrypt(kmipClient *kmip.Client, kmipEncryptedKey *KMIPEncryptedKey) ([]byte, error) {
	decryptedLEK, err := kmipClient.Decrypt(ki.UniqueKeyID, kmipEncryptedKey.Key, kmipEncryptedKey.IV)
	if err != nil {
		return nil, err
	}
	return decryptedLEK.Data, nil
}

func (ki *KMIPKeyIdentifier) decryptWithKeyWrapMethodGet(kmipClient *kmip.Client, kmipEncryptedKey *KMIPEncryptedKey) ([]byte, error) {
	kek, err := kmipClient.GetSymmetricKey(ki.UniqueKeyID)
	if err != nil {
		return nil, err
	}

	tag := kmipEncryptedKey.Key[0:12]
	cipherText := kmipEncryptedKey.Key[12:]
	aad := []byte(ki.UniqueKeyID)
	iv := kmipEncryptedKey.IV

	gcm := &aes.GCMInput{Key: kek, AAD: aad, IV: iv, Tag: tag}
	decryptedLEK, err := gcm.Decrypt(cipherText)
	if err != nil {
		return nil, err
	}
	return decryptedLEK, nil
}

func decodeEncryptedKey(encryptedKey []byte) (*KMIPEncryptedKey, error) {
	var kmipEncryptedKey KMIPEncryptedKey
	if err := bson.Unmarshal(encryptedKey, &kmipEncryptedKey); err != nil {
		return nil, err
	}
	return &kmipEncryptedKey, nil
}

func (ki *KMIPKeyIdentifier) kmipClient(serverName string) (*kmip.Client, error) {
	rootCA, err := os.ReadFile(ki.ServerCAFileName)
	if err != nil {
		return nil, err
	}

	version := kmip.V12
	if ki.KeyWrapMethod == KMIPKeyWrapMethodGet {
		version = kmip.V10
	}

	clientCert, clientPrivateKey, err := pem.Decode(ki.ClientCertificateFileName, ki.ClientCertificatePassword)
	if err != nil {
		return nil, fmt.Errorf("error parsing client certificate: %w", err)
	}

	return kmip.NewClient(&kmip.Config{
		Version:           version,
		Hostname:          serverName,
		Port:              ki.ServerPort,
		RootCertificate:   rootCA,
		ClientPrivateKey:  clientPrivateKey,
		ClientCertificate: clientCert,
		Username:          ki.Username,
		Password:          ki.Password,
	})
}
