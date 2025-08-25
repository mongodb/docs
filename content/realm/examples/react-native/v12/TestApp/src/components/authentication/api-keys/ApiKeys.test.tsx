import 'react-native';
import React from 'react';
import {BSON} from 'realm';
import {
  render,
  screen,
  userEvent,
  act,
  cleanup,
} from '@testing-library/react-native';

import {ApiKeyAuth} from './ApiKeys';

// Use promise hack to wait for network operations.
// Can't await @realm/react hooks, so this helps
// sequence events.
const delay = async (duration: number) => {
  await act(async () => {
    await new Promise(r => setTimeout(r, duration));
  });
};

describe('Test user API key guide', () => {
  afterEach(async () => {
    cleanup();
  });

  // This is an end to end test that takes all of the API keys
  // components and makes sure they work together in a cohesive experience.
  test('Register and log in to start guide', async () => {
    render(<ApiKeyAuth />);

    /*
      -- <LoginManager> --
      Register new email/pass user and login.
    */
    // Set up user and user information
    const user = userEvent.setup();
    const userEmail = `${new BSON.UUID()}@example.com`;
    const userPassword = 'v3ryv3rySECRET';

    // Get global interactive UI nodes
    const stepNextButton = await screen.findByTestId('step-next-button');
    const logoutButton = await screen.findByTestId('logout-button');

    // Logout current user, if any
    user.press(logoutButton);
    await delay(500);

    // Get component interactive UI nodes
    const emailInput = await screen.findByTestId('email-input');
    const passwordInput = await screen.findByTestId('password-input');
    const registerButton = await screen.findByTestId('register-button');
    const loginButton = await screen.findByTestId('login-button');

    // Enter account info
    await user.type(emailInput, userEmail);
    await user.type(passwordInput, userPassword);
    // Register user with email and password
    await user.press(registerButton);

    // Wait for communication between Atlas and client
    await delay(1000);

    // Use `result` info from `useAuth()` to determine registration success
    let authOperationNode = await screen.findByTestId('auth-operation');
    expect(authOperationNode.children[1]).toBe('register');
    let authStatusNode = await screen.findByTestId('auth-status');
    expect(authStatusNode.children[1]).toBe('success');

    // Log user in
    await user.press(loginButton);
    await delay(500);

    // Use `result` info from `useAuth()` to determine login success
    authOperationNode = await screen.findByTestId('auth-operation');
    expect(authOperationNode.children[1]).toBe('logIn');
    authStatusNode = await screen.findByTestId('auth-status');
    expect(authStatusNode.children[1]).toBe('success');

    /*
      -- <Step1> --
      Create new API key. Advance to next step.
    */
    const apiKeyName = 'testkey';
    const apiKeyName2 = 'newtestkey';

    // Get interactive UI nodes
    let keyNameInput = await screen.findByTestId('key-name-input');
    let createKeyButton = await screen.findByTestId('create-key-button');

    await user.type(keyNameInput, apiKeyName);
    await user.press(createKeyButton);
    await delay(500);

    let keyNameResult = await screen.findByTestId('key-name-result');
    expect(keyNameResult.children[1]).toContain(apiKeyName);

    await user.press(stepNextButton);

    /*
      -- <Step2> --
      Get the new API key from App Services. Disable, enable, and delete key.
      Advance to next step.
    */

    // Get interactive UI nodes
    const getButton = await screen.findByTestId('get-button');
    let result;

    await user.press(getButton);
    await delay(500);

    result = await screen.findByTestId('get-result');
    expect(result.children[1]).toContain(apiKeyName);

    const disableButton = await screen.findByTestId('disable-button');
    const enableButton = await screen.findByTestId('enable-button');
    const deleteButton = await screen.findByTestId('delete-button');

    await user.press(disableButton);
    await delay(500);

    result = await screen.findByTestId('disable-result');
    expect(result.children[1]).toContain('disabled');

    await user.press(enableButton);
    await delay(500);

    result = await screen.findByTestId('disable-result');
    expect(result.children[1]).toContain('enabled');

    await user.press(deleteButton);
    await delay(500);

    result = await screen.findByTestId('delete-result');
    expect(result.children[0]).toBe('API key successfully deleted!');

    await user.press(stepNextButton);

    /*
      -- <Step3> --
      Create another new API key. Advance to next step.
    */

    // Get interactive UI nodes
    keyNameInput = await screen.findByTestId('key-name-input');
    createKeyButton = await screen.findByTestId('create-key-button');

    await user.type(keyNameInput, apiKeyName2);
    await user.press(createKeyButton);

    await delay(500);

    keyNameResult = await screen.findByTestId('key-name-result');
    expect(keyNameResult.children[1]).toContain(apiKeyName2);

    await user.press(stepNextButton);

    /*
      -- <Step4> --
      Log out email/password. Log in API key user.
    */

    await user.press(logoutButton);
    await delay(500);

    const apiLoginButton = await screen.findByTestId('login-api-key-button');

    try {
      await user.press(apiLoginButton);
    } catch (error) {
      console.error(error);
    }
    await delay(500);

    // Use `result` info from `useAuth()` to determine login success
    authOperationNode = await screen.findByTestId('auth-operation');
    expect(authOperationNode.children[1]).toBe('logInWithApiKey');
    authStatusNode = await screen.findByTestId('auth-status');
    expect(authStatusNode.children[1]).toBe('success');

    await user.press(logoutButton);
    await delay(500);
  });
});
