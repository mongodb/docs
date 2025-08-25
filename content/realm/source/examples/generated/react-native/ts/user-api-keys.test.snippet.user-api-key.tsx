import React, {useEffect} from 'react';
import {useUser} from '@realm/react';

function UserApiKeys() {
  const user = useUser();

  async function createUserApiKey() {
    const apiKey = await user?.apiKeys.create('mySecretKey');
    // ...Do something with API key like save it
    // or share it with external service that authenticates
    // on user's behalf.
  }

  // ...
}
