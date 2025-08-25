import 'react-native';
import React from 'react';
import {AppWrapperSync} from './RealmWrapperSync';
import {render, screen, userEvent} from '@testing-library/react-native';

const user = userEvent.setup();

describe('Quick Start minimum viable app with Sync', () => {
  beforeEach(async () => {
    render(<AppWrapperSync />);

    // Use promise hack to wait for app services
    await new Promise(r => setTimeout(r, 750));

    const createInput = await screen.findByTestId('create-input');
    const createProfileButton = await screen.findByTestId('create-profile');

    // Create test objects
    await user.type(createInput, 'Book Worm');
    await user.press(createProfileButton);
    await user.clear(createInput);
    await user.type(createInput, 'testProfile');
    await user.press(createProfileButton);
    await user.clear(createInput);
  });

  afterEach(async () => {
    const removeButton = await screen.findByTestId('remove-all-objects');

    // Delete any existing realm objects
    await user.press(removeButton);
  });

  test('Read', async () => {
    // Get profile lists
    const profiles = await screen.findAllByTestId('profile');
    expect(profiles.length).toBeGreaterThan(0);

    const sortedProfiles = await screen.findAllByTestId('sorted-profile');
    expect(sortedProfiles.length).toBeGreaterThan(0);
    // First profile in list should be "Book Worm"
    expect(sortedProfiles[0].children[1]).toBe('Book Worm');

    const filteredProfiles = await screen.findAllByTestId('filtered-profile');
    // Should only be one profile
    expect(filteredProfiles.length).toEqual(1);
    // Profile should match "testProfile"
    expect(filteredProfiles[0].children[1]).toBe('testProfile');
  });

  test('Create', async () => {
    const createInput = await screen.findByTestId('create-input');
    const createProfileButton = await screen.findByTestId('create-profile');
    const profiles = await screen.findAllByTestId('profile');
    // Should already have 2 objects from `beforeEach()`
    expect(profiles.length).toBeGreaterThan(0);

    // Create test objects
    await user.type(createInput, 'React Native');
    await user.press(createProfileButton);
    await user.clear(createInput);

    const refreshedProfiles = await screen.findAllByTestId('profile');
    // Rerendered list should have more profile items than the
    // initially-rendered list
    expect(refreshedProfiles.length).toBeGreaterThan(profiles.length);
  });

  test('Update', async () => {
    const profilesToUpdate = await screen.findAllByTestId('profile-to-update');
    // Should already have 2 objects from `beforeEach()`
    expect(profilesToUpdate.length).toBeGreaterThan(0);

    // Select first profile in list to update.
    await user.press(profilesToUpdate[0]);

    // Update object. Requires a selected profile to update
    const updateInput = await screen.findByTestId('update-input');
    const updateProfileButton = await screen.findByTestId('update-profile');

    await user.type(updateInput, 'test2');
    await user.press(updateProfileButton);
    await user.clear(updateInput);

    // Get list of profiles again
    const refreshedProfilesToUpdate =
      await screen.findAllByTestId('profile-to-update');

    // Check that first profile inlist has been updated.
    expect(refreshedProfilesToUpdate[0].children[0]).toBe('test2');
  });

  test('Delete', async () => {
    // Should already have 2 objects from `beforeEach()`
    const profilesToDelete = await screen.findAllByTestId('profile-to-delete');
    expect(profilesToDelete.length).toBeGreaterThan(0);

    const deleteProfileButton = await screen.findByTestId('delete-profile');

    // Select first profile in list to delete.
    await user.press(profilesToDelete[0]);
    // Delete object. Requires a selected profile to delete
    await user.press(deleteProfileButton);

    const refreshedProfilesToDelete =
      await screen.findAllByTestId('profile-to-delete');
    // Rerendered list should have fewer profile items than the
    // initially-rendered list
    expect(refreshedProfilesToDelete.length).toBeLessThan(
      profilesToDelete.length,
    );
  });
});
