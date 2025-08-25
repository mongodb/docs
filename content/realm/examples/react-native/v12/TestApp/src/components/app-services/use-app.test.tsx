import 'react-native';
import React from 'react';
import {AppWithAuthHook} from './use-app';
import {render, screen, userEvent} from '@testing-library/react-native';
import '@testing-library/jest-dom';

test('App with auth hook', async () => {
  render(<AppWithAuthHook />);

  const user = userEvent.setup();

  const logInButton = screen.queryByTestId('log-in');

  if (logInButton) {
    await user.press(logInButton);
  }

  const loggedInUserText = await screen.findByTestId('logged-in-user-id');
  expect(loggedInUserText).not.toEqual(null);

  const notYetLoggedIn = screen.queryByText('No one is logged in yet.');

  expect(notYetLoggedIn).not.toBeInTheDocument();
});
