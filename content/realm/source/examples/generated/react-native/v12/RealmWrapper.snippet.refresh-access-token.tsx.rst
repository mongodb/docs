.. code-block:: typescript

   const RefreshUserAcessToken = () => {
     const user = useUser();
     const [accessToken, setAccessToken] = useState<string | null>();

     // Gets a valid user access token to authenticate requests
     const refreshAccessToken = async () => {
       // An already logged in user's access token might be stale. To
       // guarantee that the token is valid, refresh it if necessary.
       await user.refreshCustomData();

       setAccessToken(user.accessToken);
     };

     // Use access token...
   };
