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

//go:build e2e || (generic && (cloudmanager || om44 || om50))

package cloud_manager_test

import (
	"encoding/json"
	"fmt"
	"os"
	"os/exec"
	"testing"

	"github.com/mongodb/mongocli/e2e"
	"go.mongodb.org/ops-manager/opsmngr"
)

func TestFeaturePolicies(t *testing.T) {
	const policyExternallyManagedLock = "EXTERNALLY_MANAGED_LOCK"
	const policyDisableUserManagement = "DISABLE_USER_MANAGEMENT"

	n, err := e2e.RandInt(255)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	projectName := fmt.Sprintf("e2e-maintenance-proj-%v", n)
	projectID, err := createProject(projectName)
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	cliPath, err := e2e.Bin()
	if err != nil {
		t.Fatalf("unexpected error: %v", err)
	}

	defer func() {
		if e := deleteProject(projectID); e != nil {
			t.Errorf("error deleting project: %v", e)
		}
	}()

	t.Run("Update", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			featurePolicies,
			"update",
			"--name",
			"test",
			"--policy",
			policyExternallyManagedLock,
			"--policy",
			policyDisableUserManagement,
			"-o=json",
			"--projectId",
			projectID,
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		if err != nil {
			t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
		}

		var policy *opsmngr.FeaturePolicy
		if err := json.Unmarshal(resp, &policy); err != nil {
			t.Fatalf("unexpected error: %v", err)
		}

		if len(policy.Policies) != 2 {
			t.Error("Policy count mismatch")
		}

		foundExternalManagedLock := false
		foundDisableUserManagement := false
		for _, p := range policy.Policies {
			if p.Policy == policyExternallyManagedLock {
				foundExternalManagedLock = true
			} else if p.Policy == policyDisableUserManagement {
				foundDisableUserManagement = true
			}
		}

		if !foundExternalManagedLock {
			t.Errorf("policy %s not found", policyExternallyManagedLock)
		}

		if !foundDisableUserManagement {
			t.Errorf("policy %s not found", policyDisableUserManagement)
		}
	})

	t.Run("List", func(t *testing.T) {
		cmd := exec.Command(cliPath,
			entity,
			featurePolicies,
			"list",
			"-o=json",
			"--projectId",
			projectID,
		)

		cmd.Env = os.Environ()
		resp, err := cmd.CombinedOutput()

		if err != nil {
			t.Fatalf("unexpected error: %v, resp: %v", err, string(resp))
		}

		var policy *opsmngr.FeaturePolicy
		if err := json.Unmarshal(resp, &policy); err != nil {
			t.Fatalf("unexpected error: %v", err)
		}

		if len(policy.Policies) == 0 {
			t.Error("No policies found")
		}
	})
}
