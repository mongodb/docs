import { useEffect } from "react";
import * as Realm from "realm-web";
import Link from "next/link";
import { useApp } from "../components/useApp";

export default function Home() {
  const app = useApp();
  // note: useEffect runs in the browser but does not run during server-side rendering
  useEffect(() => {
    // If no logged in user, log in
    if (app && !app.currentUser) {
      const anonymousUser = Realm.Credentials.anonymous();
      app.logIn(anonymousUser);
    }
  }, [app, app?.currentUser]);

  return (
    //Your app
  );
}
