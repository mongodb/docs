import { useState } from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from "@react-native-google-signin/google-signin";
import Realm from "realm";

// Instantiate Realm app
const app = new Realm.App({
  id: "<Your App ID>",
});

// Configure Google Auth
GoogleSignin.configure({
  webClientId: "<Your Web Client ID>",
});

export default function GoogleSignInButton() {
  const [signinInProgress, setSigninInProgress] = useState(false);

  const signIn = async () => {
    setSigninInProgress(true);
    try {
      // Sign into Google
      await GoogleSignin.hasPlayServices();
      const { idToken } = await GoogleSignin.signIn();

      // use Google ID token to sign into Realm
      const credential = Realm.Credentials.google({ idToken });
      const user = await app.logIn(credential);
      console.log("signed in as Realm user", user.id);
    } catch (error) {
      // handle errors
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // user cancelled the login flow
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // operation (e.g. sign in) is in progress already
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // play services not available or outdated
      } else {
        // some other error happened
      }
    } finally {
      setSigninInProgress(false);
    }
  };

  // return Google Sign in button component
  return (
    <GoogleSigninButton
      style={{ width: 192, height: 48 }}
      size={GoogleSigninButton.Size.Wide}
      color={GoogleSigninButton.Color.Dark}
      onPress={signIn}
      disabled={signinInProgress}
    />
  );
}
