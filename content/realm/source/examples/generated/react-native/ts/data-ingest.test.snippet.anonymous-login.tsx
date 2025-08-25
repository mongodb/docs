function LogIn() {
  const app = useApp();

  useEffect(() => {
    app.logIn(Realm.Credentials.anonymous());
  }, []);

  return <></>;
}
