import React from 'react';
import {useAuth} from '@realm/react';

import {Button} from '../../utility-components/Button';

// :snippet-start: login-anonymous
export const LogInWithAnonymous = () => {
  const {logInWithAnonymous, result} = useAuth();

  const performAnonymousLogin = logInWithAnonymous;

  // Handle `result`...
  // :remove-start:
  return (
    <Button
      testID="log-in-anonymous"
      title="Log in anonymously"
      onPress={() => {
        performAnonymousLogin();
      }}
    />
  );
  // :remove-end:
};
// :snippet-end:
