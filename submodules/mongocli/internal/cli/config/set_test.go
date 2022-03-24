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

package config

import (
	"testing"

	"github.com/golang/mock/gomock"
	"github.com/mongodb/mongocli/internal/mocks"
)

func TestSet_Run(t *testing.T) {
	ctrl := gomock.NewController(t)
	mockStore := mocks.NewMockSetSaver(ctrl)
	defer ctrl.Finish()

	t.Run("valid prop", func(t *testing.T) {
		setOpts := &SetOpts{
			store: mockStore,
			prop:  "test",
			val:   "something",
		}
		mockStore.
			EXPECT().
			Set(setOpts.prop, setOpts.val).
			Times(1)

		mockStore.
			EXPECT().
			Save().Return(nil).
			Times(1)

		err := setOpts.Run()

		if err != nil {
			t.Fatalf("Run() unexpected error: %v\n", err)
		}
	})

	t.Run("valid base_url", func(t *testing.T) {
		setOpts := &SetOpts{
			store: mockStore,
			prop:  "base_url",
			val:   "http://test:9080/",
		}
		mockStore.
			EXPECT().
			Set(setOpts.prop, setOpts.val).
			Times(1)

		mockStore.
			EXPECT().
			Save().Return(nil).
			Times(1)

		err := setOpts.Run()

		if err != nil {
			t.Fatalf("Run() unexpected error: %v\n", err)
		}
	})

	t.Run("invalid base_url", func(t *testing.T) {
		setOpts := &SetOpts{
			store: mockStore,
			prop:  "base_url",
		}
		mockStore.
			EXPECT().
			Set(setOpts.prop, setOpts.val).
			Times(0)

		mockStore.
			EXPECT().
			Save().Return(nil).
			Times(0)

		err := setOpts.Run()

		if err == nil {
			t.Fatal("Run() expected an error but got none\n")
		}
	})

	t.Run("valid org_id", func(t *testing.T) {
		setOpts := &SetOpts{
			store: mockStore,
			prop:  "org_id",
			val:   "5e9f088b4797476aa0a5d56a",
		}
		mockStore.
			EXPECT().
			Set(setOpts.prop, setOpts.val).
			Times(1)

		mockStore.
			EXPECT().
			Save().Return(nil).
			Times(1)

		err := setOpts.Run()

		if err != nil {
			t.Fatalf("Run() unexpected error: %v\n", err)
		}
	})

	t.Run("invalid org_id", func(t *testing.T) {
		setOpts := &SetOpts{
			store: mockStore,
			prop:  "org_id",
			val:   "1",
		}
		mockStore.
			EXPECT().
			Set(setOpts.prop, setOpts.val).
			Times(0)

		mockStore.
			EXPECT().
			Save().Return(nil).
			Times(0)

		err := setOpts.Run()

		if err == nil {
			t.Fatal("Run() expected an error but got none\n")
		}
	})

	t.Run("valid project_id", func(t *testing.T) {
		setOpts := &SetOpts{
			store: mockStore,
			prop:  "project_id",
			val:   "5e9f088b4797476aa0a5d56a",
		}
		mockStore.
			EXPECT().
			Set(setOpts.prop, setOpts.val).
			Times(1)

		mockStore.
			EXPECT().
			Save().Return(nil).
			Times(1)

		err := setOpts.Run()

		if err != nil {
			t.Fatalf("Run() unexpected error: %v\n", err)
		}
	})

	t.Run("invalid project_id", func(t *testing.T) {
		setOpts := &SetOpts{
			store: mockStore,
			prop:  "project_id",
			val:   "1",
		}
		mockStore.
			EXPECT().
			Set(setOpts.prop, setOpts.val).
			Times(0)

		mockStore.
			EXPECT().
			Save().Return(nil).
			Times(0)

		err := setOpts.Run()

		if err == nil {
			t.Fatal("Run() expected an error but got none\n")
		}
	})

	t.Run("set skip_update_check to true", func(t *testing.T) {
		setOpts := &SetOpts{
			store: mockStore,
			prop:  "skip_update_check",
			val:   "true",
		}

		mockStore.
			EXPECT().
			SetGlobal(setOpts.prop, true).
			Times(1)

		mockStore.
			EXPECT().
			Save().Return(nil).
			Times(1)

		err := setOpts.Run()

		if err != nil {
			t.Fatalf("Run() unexpected error: %v\n", err)
		}
	})

	t.Run("set skip_update_check to false", func(t *testing.T) {
		setOpts := &SetOpts{
			store: mockStore,
			prop:  "skip_update_check",
			val:   "not true at all",
		}

		mockStore.
			EXPECT().
			SetGlobal(setOpts.prop, false).
			Times(1)

		mockStore.
			EXPECT().
			Save().Return(nil).
			Times(1)

		err := setOpts.Run()

		if err != nil {
			t.Fatalf("Run() unexpected error: %v\n", err)
		}
	})
}
