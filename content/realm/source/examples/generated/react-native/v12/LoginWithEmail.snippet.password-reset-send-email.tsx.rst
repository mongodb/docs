.. code-block:: typescript

   const SendResetPasswordEmailButton = ({email}: {email: string}) => {
     const [errorMessage, setErrorMessage] = useState('');
     const {sendResetPasswordEmail, result} = useEmailPasswordAuth();

     const performSendResetPasswordEmail = () => {
       sendResetPasswordEmail({email: email});
     };

     // Handle `result`...
   };
