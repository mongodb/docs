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

//go:build unit
// +build unit

package dbusers

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/mocks"
	"go.mongodb.org/atlas/mongodbatlas"
)

func TestDBUserCreateOpts_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockDatabaseUserCreator(ctrl)
	defer ctrl.Finish()

	expected := &mongodbatlas.DatabaseUser{}

	createOpts := &CreateOpts{
		username: "ProjectBar",
		password: "US",
		roles:    []string{"admin@admin"},
		store:    mockStore,
	}

	mockStore.
		EXPECT().
		CreateDatabaseUser(createOpts.newDatabaseUser()).Return(expected, nil).
		Times(1)

	if err := createOpts.Run(); err != nil {
		t.Fatalf("Run() unexpected error: %v", err)
	}
}

func TestCreateOpts_validate(t *testing.T) {
	type fields struct {
		x509Type   string
		awsIamType string
		ldapType   string
		password   string
		roles      []string
	}
	tests := []struct {
		name    string
		fields  fields
		wantErr bool
	}{
		{
			name:    "empty roles",
			fields:  fields{},
			wantErr: true,
		},
		{
			name: "invalid x509Type",
			fields: fields{
				roles:      []string{"test"},
				awsIamType: none,
				ldapType:   none,
				x509Type:   "invalid",
			},
			wantErr: true,
		},
		{
			name: "invalid ldapType",
			fields: fields{
				roles:      []string{"test"},
				awsIamType: none,
				ldapType:   "invalid",
				x509Type:   none,
			},
			wantErr: true,
		},
		{
			name: "invalid awsIamType",
			fields: fields{
				roles:      []string{"test"},
				awsIamType: "invalid",
				ldapType:   none,
				x509Type:   none,
			},
			wantErr: true,
		},
		{
			name: "awsIamType and password",
			fields: fields{
				roles:      []string{"test"},
				awsIamType: user,
				ldapType:   none,
				x509Type:   none,
				password:   "password",
			},
			wantErr: true,
		},
		{
			name: "set both x509 and LDAP",
			fields: fields{
				roles:      []string{"test"},
				awsIamType: user,
				ldapType:   user,
				x509Type:   X509TypeManaged,
			},
			wantErr: true,
		},
		{
			name: "set both x509 and AWS IAM",
			fields: fields{
				roles:      []string{"test"},
				awsIamType: user,
				ldapType:   none,
				x509Type:   X509TypeManaged,
			},
			wantErr: true,
		},
		{
			name: "set both LDAP and AWS IAM",
			fields: fields{
				roles:      []string{"test"},
				awsIamType: user,
				ldapType:   user,
				x509Type:   none,
			},
			wantErr: true,
		},
		{
			name: "set both LDAP and AWS IAM and x509",
			fields: fields{
				roles:      []string{"test"},
				awsIamType: user,
				ldapType:   user,
				x509Type:   X509TypeManaged,
			},
			wantErr: true,
		},
		{
			name: "no external auth",
			fields: fields{
				roles:      []string{"test"},
				awsIamType: none,
				ldapType:   none,
				x509Type:   none,
			},
			wantErr: false,
		},
		{
			name: "no external auth with password",
			fields: fields{
				roles:      []string{"test"},
				awsIamType: none,
				ldapType:   none,
				x509Type:   none,
				password:   "password",
			},
			wantErr: false,
		},
		{
			name: "external auth no password",
			fields: fields{
				roles:      []string{"test"},
				awsIamType: user,
				ldapType:   none,
				x509Type:   none,
			},
			wantErr: false,
		},
	}
	for _, tt := range tests {
		fields := tt.fields
		wantErr := tt.wantErr
		t.Run(tt.name, func(t *testing.T) {
			t.Parallel()
			opts := &CreateOpts{
				x509Type:   fields.x509Type,
				awsIamType: fields.awsIamType,
				ldapType:   fields.ldapType,
				roles:      fields.roles,
				password:   fields.password,
			}
			if err := opts.validate(); (err != nil) != wantErr {
				t.Errorf("validate() error = %v, wantErr %v", err, wantErr)
			}
		})
	}
}
