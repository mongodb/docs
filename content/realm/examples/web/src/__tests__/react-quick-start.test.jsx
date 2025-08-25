import React from "react";
import * as Realm from "realm-web";
import { APP_ID } from "../realm.config.json";

const app = new Realm.App({ id: APP_ID });

test("basic user management & app instantiation", () => {
  // :snippet-start: basic-user-management
  // Create a component that displays the given user's details
  function UserDetail({ user }) {
    return (
      <div>
        <h1>Logged in with anonymous id: {user.id}</h1>
      </div>
    );
  }
  // Create a component that lets an anonymous user log in
  function Login({ setUser }) {
    const loginAnonymous = async () => {
      const user = await app.logIn(Realm.Credentials.anonymous());
      setUser(user);
    };
    return <button onClick={loginAnonymous}>Log In</button>;
  }
  // :snippet-end:
  // :snippet-start: create-export-app
  const App = () => {
    // Keep the logged in Realm user in local state. This lets the app re-render
    // whenever the current user changes (e.g. logs in or logs out).
    const [user, setUser] = React.useState(app.currentUser);

    // If a user is logged in, show their details.
    // Otherwise, show the login screen.
    return (
      <div className="App">
        <div className="App-header">
          {user ? <UserDetail user={user} /> : <Login setUser={setUser} />}
        </div>
      </div>
    );
  };
  // :uncomment-start:
  // export default App;
  // :uncomment-end:
  // :snippet-end:
});
