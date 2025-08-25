// :snippet-start: log-in-index-js
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
    // :remove-start:
    <div>
      <h1>Realm Web & Next.js Examples</h1>
      <ul>
        <li>
          <Link href="/mongodb-data-access">
            MongoDB Data Access (Client-side rendering)
          </Link>
        </li>
        <li>
          <Link href="/graphql">Atlas GraphQL API (Client-side rendering)</Link>
        </li>
        <li>
          <Link href="/server-side-rendering">Server Side Rendering</Link>
        </li>
        <li>
          <Link href="/static-rendering">Static Rendering</Link>
        </li>
      </ul>
    </div>
    // :remove-end:
  );
}
// :snippet-end:
