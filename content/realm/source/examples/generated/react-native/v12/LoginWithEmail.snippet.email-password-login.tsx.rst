.. code-block:: typescript

   export const LoginWithEmail = () => {
     const {logIn, result} = useEmailPasswordAuth();

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');

     const performLogin = () => {
       logIn({email, password});
     };

     // Handle `result`...
   };
