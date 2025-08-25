// Create a component that displays the given user's details
const UserDetail = ({ user }: { user: Realm.User }) => {
  return (
    <div>
      <h1>Logged in with anonymous id: {user.id}</h1>
    </div>
  );
};

// Create a component that lets an anonymous user log in
type LoginProps = {
  setUser: (user: Realm.User) => void;
};
const Login = ({ setUser }: LoginProps) => {
  const loginAnonymous = async () => {
    const user: Realm.User = await app.logIn(Realm.Credentials.anonymous());
    setUser(user);
  };
  return <button onClick={loginAnonymous}>Log In</button>;
};
