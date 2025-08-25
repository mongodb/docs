import 'react-native';
import React from 'react';
import {BSON} from 'realm';
import {LoginExample} from './RealmWrapper';
import {
  render,
  screen,
  userEvent,
  act,
  cleanup,
} from '@testing-library/react-native';

/*
  -- Note about user state --
  I tried to ensure that every time <LoginExample /> is
  rendered that it was in its default state - with no
  logged-in user. Setting this up in a `beforeEach` or
  `afterEach` was flaky. So, I instead made sure to log
  the user out at the end of every test.
*/

// Use promise hack to wait for network operations.
// Can't await @realm/react hooks, so this helps
// sequence events.
const delay = async (duration: number) => {
  await act(async () => {
    await new Promise(r => setTimeout(r, duration));
  });
};

describe('Log in with App Services auth providers', () => {
  afterEach(async () => {
    cleanup();
  });

  test('anonymous auth provider', async () => {
    render(<LoginExample />);

    const user = userEvent.setup();

    // const firstLogoutButton = await screen.findByTestId('log-out');
    // await user.press(firstLogoutButton);
    // await delay(1000);

    const loginAnonymousButton = await screen.findByTestId('log-in-anonymous');
    await user.press(loginAnonymousButton);

    // <UserInformation> component should render now that
    // user is logged in.
    const userStateNode = await screen.findByText('User state:', {
      exact: false,
    });
    expect(userStateNode.children[1]).toBe('LoggedIn');

    // Ensure user is logged out.
    const logOutButton = await screen.findByTestId('log-out');
    await user.press(logOutButton);
    await delay(250);
  });

  test('email/password auth provider', async () => {
    render(<LoginExample />);

    // Set up user and user information
    const user = userEvent.setup();
    const userEmail = `${new BSON.UUID()}@example.com`;
    const userPassword = 'v3ryv3rySECRET';

    // Get interactive UI nodes
    const emailInput = await screen.findByTestId('email-input');
    const passwordInput = await screen.findByTestId('password-input');
    const registerButton = await screen.findByTestId('register-button');

    // Enter account info
    await user.type(emailInput, userEmail);
    await user.type(passwordInput, userPassword);
    // Register user with email and password and log in
    await user.press(registerButton);

    // Wait for registration to traverse the network and finish.
    await delay(500);

    // <UserInformation> component should render now that
    // user is logged in
    const userStateNode = await screen.findByText('User state:', {
      exact: false,
    });
    expect(userStateNode.children[1]).toBe('LoggedIn');

    const renderedUserEmail = await screen.findByText('Email:', {
      exact: false,
    });
    expect(renderedUserEmail.children[1]).toBe(userEmail);

    // Log user out
    const logOutButton = await screen.findByTestId('log-out');
    await user.press(logOutButton);
    await delay(250);
  });

  test('send reset password email', async () => {
    render(<LoginExample />);

    // Set up user and user information
    const user = userEvent.setup();
    const userEmail = `${new BSON.UUID()}@example.com`;
    const userPassword = 'v3ryv3rySECRET';

    // Get interactive UI nodes
    const emailInput = await screen.findByTestId('email-input');
    const passwordInput = await screen.findByTestId('password-input');
    const registerButton = await screen.findByTestId('register-button');

    // Register user with email and password
    await user.type(emailInput, userEmail);
    await user.type(passwordInput, userPassword);
    await user.press(registerButton);

    // Wait for registration to traverse the network and finish.
    await delay(500);

    // Log user out to take us back to <LoginExample />
    const logoutButton = await screen.findByTestId('log-out');
    await user.press(logoutButton);
    await delay(250);

    const rerenderedEmailInput = await screen.findByTestId('email-input');
    const sendResetPasswordEmailButton =
      await screen.findByTestId('send-reset-email');

    await user.type(rerenderedEmailInput, userEmail);
    // Send reset password email. This should fail, as the
    // backend isn't configured for it.
    user.press(sendResetPasswordEmailButton);

    // Match rendered error message with what we expect
    const renderedErrorMessage = await screen.findByTestId(
      'send-reset-email-error',
      {
        exact: false,
      },
    );

    expect(renderedErrorMessage.children[0]).toContain(
      'please use reset password via function',
    );
  });

  test('reset password', async () => {
    render(<LoginExample />);

    // Set up user and user information
    const user = userEvent.setup();
    const userEmail = `${new BSON.UUID()}@example.com`;
    const userPassword = 'v3ryv3rySECRET';
    const newPassword = 'superv3rySECRET';

    // Get interactive UI nodes
    const emailInput = await screen.findByTestId('email-input');
    const passwordInput = await screen.findByTestId('password-input');
    const registerButton = await screen.findByTestId('register-button');

    // Register user with email and password
    await user.type(emailInput, userEmail);
    await user.type(passwordInput, userPassword);
    await user.press(registerButton);

    // Wait for registration to traverse the network and finish.
    await delay(500);

    // Log user out to take us back to <LoginExample />
    const logoutButton = await screen.findByTestId('log-out');
    await user.press(logoutButton);
    await delay(250);

    const rerenderdPasswordInput = await screen.findByTestId('password-input');
    const resetPasswordButton = await screen.findByTestId('reset-password');

    // Enter new password
    await user.type(rerenderdPasswordInput, newPassword);

    // Call `performResetPassword()`. The component has
    // fake `token` and `tokenId` values already. This
    // should fail, as the backend isn't configured for it.
    user.press(resetPasswordButton);

    // Match rendered error message with what we expect
    const renderedErrorMessage = await screen.findByTestId(
      'password-reset-error',
    );

    expect(renderedErrorMessage.children[0]).toContain('invalid token data');
  });

  test('custom JWT provider', async () => {
    render(<LoginExample />);

    const user = userEvent.setup();

    // Log in anonymously so we can access App Services functions
    const loginAnonymousButton = await screen.findByTestId('log-in-anonymous');
    await user.press(loginAnonymousButton);
    await delay(250);

    // <UserInformation> component should render now that
    // user is logged in.
    const userStateNode = await screen.findByText('User state:', {
      exact: false,
    });
    expect(userStateNode.children[1]).toBe('LoggedIn');

    // Log in with JWT
    const loginWithJWTButton = await screen.findByTestId('log-in-jwt');
    await user.press(loginWithJWTButton);
    await delay(400);

    const userIdNode = await screen.findByTestId('user-id');
    expect(userIdNode.children[1]).toBe('custom-jwt-user');

    // @realm/react seems to stack logins? We need to log
    // out the JWT user, then log out the anonymous user
    // to get back to <LoginExample />.
    const logoutJWTButton = await screen.findByTestId('log-out');
    await user.press(logoutJWTButton);
    await delay(350);

    const logoutButton = await screen.findByTestId('log-out');
    await user.press(logoutButton);
    await delay(250);
  });

  test('custom function auth provider', async () => {
    render(<LoginExample />);

    // Set up user and user information
    const user = userEvent.setup();
    const userEmail = `${new BSON.UUID()}@example.com`;
    const userPassword = 'v3ryv3rySECRET';

    // Get interactive UI nodes
    const emailInput = await screen.findByTestId('email-input-function');
    const passwordInput = await screen.findByTestId('password-input-function');
    const logInButton = await screen.findByTestId('log-in-function');

    // Enter user email and password
    await user.type(emailInput, userEmail);
    await user.type(passwordInput, userPassword);

    // Log user in, passing email and password to
    // custom function provider.
    await user.press(logInButton);

    // <UserInformation> component should render now that
    // user is logged in
    const userStateNode = await screen.findByText('User state:', {
      exact: false,
    });
    expect(userStateNode.children[1]).toBe('LoggedIn');

    const userIdNode = await screen.findByTestId('user-id');
    expect(userIdNode).toBeInTheDocument;

    // Ensure user is logged out.
    const logoutButton = await screen.findByTestId('log-out');
    await user.press(logoutButton);
    await delay(250);
  });

  test('refresh access token', async () => {
    render(<LoginExample />);

    const user = userEvent.setup();

    const loginAnonymousButton = await screen.findByTestId('log-in-anonymous');
    await user.press(loginAnonymousButton);
    await delay(250);

    // <UserInformation> component should render now that
    // user is logged in.
    const userStateNode = await screen.findByText('User state:', {
      exact: false,
    });
    expect(userStateNode.children[1]).toBe('LoggedIn');

    // Ensure user is logged out.
    const logoutButton = await screen.findByTestId('log-out');
    await user.press(logoutButton);
    await delay(250);
  });
});
