import 'react-native';
import React from 'react';
import {BSON} from 'realm';
import {LinkIdentities} from './LinkIdentities';
import {render, screen, userEvent, within} from '@testing-library/react-native';

test('linking an anonymous user with an email/password account', async () => {
  render(<LinkIdentities />);

  const user = userEvent.setup();
  const userEmail = `${new BSON.UUID()}@example.com`;
  const userPassword = 'v3ryv3rySECRET';

  // Log in anonymous user in the fallback "Login" component.
  const loginButton = await screen.findByTestId('log-in');
  await user.press(loginButton);
  await new Promise(r => setTimeout(r, 500));

  // LinkIdentities component should render.
  const emailInput = await screen.findByTestId('email-input');
  const passwordInput = await screen.findByTestId('password-input');
  const registerButton = await screen.findByTestId('register-link');
  const deleteUser = await screen.findByTestId('delete-user');

  const userIdentityList = await screen.findByTestId('list-container');
  const userIdentityNodes =
    await within(userIdentityList).findAllByTestId('user-identity');

  // There should only be one identity: the anonymous login.
  expect(userIdentityNodes.length).toEqual(1);

  // Register user and link anonymous id with
  // email and password account.
  await user.type(emailInput, userEmail);
  await user.type(passwordInput, userPassword);
  await user.press(registerButton);

  // Use promise hack to wait for app services to
  // finish linking identities.
  await new Promise(r => setTimeout(r, 1000));

  const updatedUserIdentityList = await screen.findByTestId('list-container');
  const updatedUserIdentityNodes = await within(
    updatedUserIdentityList,
  ).findAllByTestId('user-identity');

  // There should only be two identities: anonymous and email/password.
  expect(updatedUserIdentityNodes.length).toEqual(2);

  // Delete user
  await user.press(deleteUser);
});
