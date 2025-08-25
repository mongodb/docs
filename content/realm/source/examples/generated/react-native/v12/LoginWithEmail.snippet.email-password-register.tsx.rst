.. code-block:: typescript

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
         title="Register"
         onPress={performRegistration}
       />
     );
   };
