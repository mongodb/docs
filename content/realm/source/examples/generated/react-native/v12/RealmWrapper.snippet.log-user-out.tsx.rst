.. code-block:: typescript

   function UserInformation() {
     const user = useUser();
     const {logOut} = useAuth();

     const performLogout = () => {
       logOut();
     };

     // Add UI for logging out...
   }
