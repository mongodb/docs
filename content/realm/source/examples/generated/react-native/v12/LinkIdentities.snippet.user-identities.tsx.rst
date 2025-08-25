.. code-block:: typescript
   :emphasize-lines: 33

   type UserIdentity = {
     providerType: string;
     id: string;
   };

   // Link an anonymous user to an email/password identity.
   // For this example, the App Services backend automatically
   // confirms users' emails.
   const RegisterUser = () => {
     const app = useApp();
     const user = useUser();
     const {logOut} = useAuth();
     const {register, result} = useEmailPasswordAuth();

     const [email, setEmail] = useState('');
     const [password, setPassword] = useState('');
     const [userIdentities, setUserIdentities] = useState(user.identities);

     // Use `result` to react to successful registration
     // by linking credentials with the current user.
     useEffect(() => {
       if (result.operation === AuthOperationName.Register && result.success) {
         linkCredentials();
       }
     }, [result]);

     if (!userIdentities.length) {
       setUserIdentities(user.identities);
     }

     const linkCredentials = async () => {
       const credentials = Credentials.emailPassword(email, password);
       await user.linkCredentials(credentials); 

       setUserIdentities(user.identities);
     };

     const registerAndLinkIdentities = async () => {
       register({email, password});
     };

     const deleteUser = async () => {
       app.deleteUser(app.currentUser!);
     };

     return (
       <View>
         {/* Show all identities associated with the current user */}
         <FlatList
           data={userIdentities}
           renderItem={({item}) => (
             <Text >ID: {item.id}</Text>
           )}
           keyExtractor={item => item.id}
         />

         <Text>Link anonymous user with email/password account</Text>
         <View>
           <TextInput
             onChangeText={setEmail}
             value={email}
             placeholder="email..."
           />
           <TextInput
             onChangeText={setPassword}
             value={password}
             placeholder="password..."
           />
         </View>

         <View>
           <Pressable
             onPress={registerAndLinkIdentities}>
             <Text style={styles.buttonText}>Register</Text>
           </Pressable>
           <Pressable
             onPress={logOut}>
             <Text style={styles.buttonText}>Log out</Text>
           </Pressable>
           <Pressable
             onPress={deleteUser}>
             <Text style={styles.buttonText}>Delete user</Text>
           </Pressable>
         </View>
       </View>
     );
   };
