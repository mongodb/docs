.. code-block:: typescript

   interface ResetPasswordButtonProps {
     password: string;
     token: string;
     tokenId: string;
   }

   const ResetPasswordButton = ({
     password,
     token,
     tokenId,
   }: ResetPasswordButtonProps) => {
     const [errorMessage, setErrorMessage] = useState('');
     const {resetPassword, result} = useEmailPasswordAuth();

     const performPasswordReset = () => {
       resetPassword({token, tokenId, password});
     };

     // Handle `result`...
   };
