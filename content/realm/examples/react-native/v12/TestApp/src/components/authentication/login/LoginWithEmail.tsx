import React, {useState, useEffect} from 'react';
import {View, Text, TextInput, StyleSheet} from 'react-native';
import {useEmailPasswordAuth, AuthOperationName} from '@realm/react';

import {Button} from '../../utility-components/Button';

// :snippet-start: email-password-login
export const LoginWithEmail = () => {
  const {logIn, result} = useEmailPasswordAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const performLogin = () => {
    logIn({email, password});
  };

  // Handle `result`...
  // :remove-start:
  return (
    <View style={styles.section}>
      <Text>Log in with email and password</Text>

      <View>
        <TextInput
          testID="email-input"
          style={styles.textInput} // :remove:
          onChangeText={setEmail}
          value={email}
          placeholder="email..."
        />
        <TextInput
          testID="password-input" // :remove:
          style={styles.textInput} // :remove:
          onChangeText={setPassword}
          value={password}
          placeholder="password..."
        />
      </View>

      <View style={styles.buttonGroup}>
        <Button
          testID="log-in"
          title="Log in"
          onPress={performLogin}
        />
        <RegisterButton
          email={email}
          password={password}
        />
        <SendResetPasswordEmailButton email={email} />
        <ResetPasswordButton
          password={password}
          token={'e30='}
          tokenId={'test-token-id'}
        />
      </View>
    </View>
  );
  // :remove-end:
};
// :snippet-end:

// :snippet-start: email-password-register
type RegisterButtonProps = {
  email: string;
  password: string;
};

const RegisterButton = ({email, password}: RegisterButtonProps) => {
  const {register, result, logIn} = useEmailPasswordAuth();

  // Log in the user after successful registration
  useEffect(() => {
    if (result.success && result.operation === AuthOperationName.Register) {
      logIn({email, password});
    }
  }, [result, logIn, email, password]);

  // For this example, the App Services backend automatically
  // confirms users' emails.
  const performRegistration = () => {
    register({email, password});
  };

  return (
    <Button
      testID="register-button" // :remove:
      title="Register"
      onPress={performRegistration}
    />
  );
};
// :snippet-end:

interface Error {
  name: string;
  message: string;
  stack?: string;
}

// :snippet-start: password-reset-send-email
const SendResetPasswordEmailButton = ({email}: {email: string}) => {
  const [errorMessage, setErrorMessage] = useState('');
  const {sendResetPasswordEmail, result} = useEmailPasswordAuth();

  const performSendResetPasswordEmail = () => {
    sendResetPasswordEmail({email: email});
  };

  // Handle `result`...
  // :remove-start:
  useEffect(() => {
    if (
      result.operation === AuthOperationName.SendResetPasswordEmail &&
      result.error
    ) {
      setErrorMessage(result.error.message);
    }
  }, [result]);

  return (
    <View>
      <Button
        testID="send-reset-email"
        title="Send reset email"
        onPress={performSendResetPasswordEmail}
      />
      {/* We expect an error because password resets through
      email is disabled in this app's configuration. */}
      {errorMessage && (
        <Text testID="send-reset-email-error">{errorMessage}</Text>
      )}
    </View>
  );
  // :remove-end:
};
// :snippet-end:

// :snippet-start: password-reset
interface ResetPasswordButtonProps {
  password: string;
  token: string;
  tokenId: string;
}

const ResetPasswordButton = ({
  password,
  token,
  tokenId,
}: ResetPasswordButtonProps) => {
  const [errorMessage, setErrorMessage] = useState('');
  const {resetPassword, result} = useEmailPasswordAuth();

  const performPasswordReset = () => {
    resetPassword({token, tokenId, password});
  };

  // Handle `result`...
  // :remove-start:
  useEffect(() => {
    if (result.operation === AuthOperationName.ResetPassword && result.error) {
      setErrorMessage(result.error.message);
    }
  }, [result]);

  return (
    <View>
      <Button
        testID="reset-password"
        title="Reset password"
        onPress={performPasswordReset}
      />
      {/* We expect an error because we don't have
          a valid token to reset with. */}
      {errorMessage && (
        <Text testID="password-reset-error">{errorMessage}</Text>
      )}
    </View>
  );
  // :remove-end:
};
// :snippet-end:

const styles = StyleSheet.create({
  section: {
    borderTopWidth: StyleSheet.hairlineWidth,
    marginTop: 8,
    paddingVertical: 12,
  },
  textInput: {
    backgroundColor: '#C5CAE9',
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginVertical: 5,
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginVertical: 12,
    paddingVertical: 8,
    justifyContent: 'center',
  },
});
