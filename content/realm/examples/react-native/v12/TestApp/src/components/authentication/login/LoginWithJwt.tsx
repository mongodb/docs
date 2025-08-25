import React from 'react';
import {useAuth, useUser} from '@realm/react';

import {Button} from '../../utility-components/Button';

// :snippet-start: login-jwt
export const LogInWithJWT = () => {
  const {logInWithJWT, result} = useAuth();
  // Get the current anonymous user so we can call
  // an App Services Function later.
  const anonymousUser = useUser();

  const performJWTLogin = async () => {
    // Get a JWT from a provider. In this case, from
    // an App Services Function called "generateJWT".
    const token = (await anonymousUser.functions.generateJWT()) as string;

    logInWithJWT(token);
  };

  // Handle `result`...
  // :remove-start:
  return (
    <Button
      testID="log-in-jwt"
      title="Log in with JWT"
      onPress={performJWTLogin}
    />
  );
  // :remove-end:
};
// :snippet-end:
