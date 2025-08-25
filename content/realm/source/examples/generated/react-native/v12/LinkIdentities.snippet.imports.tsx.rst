.. code-block:: typescript

   import React, {useEffect, useState} from 'react';
   import {
     FlatList,
     Pressable,
     StyleSheet,
     Text,
     TextInput,
     View,
   } from 'react-native';
   import {Credentials} from 'realm';
   import {
     AppProvider,
     UserProvider,
     useApp,
     useUser,
     useAuth,
     useEmailPasswordAuth,
     AuthOperationName,
   } from '@realm/react';
