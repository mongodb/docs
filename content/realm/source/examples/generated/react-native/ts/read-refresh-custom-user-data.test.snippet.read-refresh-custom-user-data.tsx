import React, {useState, useEffect} from 'react';
import {useApp, useUser} from '@realm/react';

function ReadCustomUserData() {
  const user = useUser();
  const [customUserData, setCustomUserData] = useState();

  // Access current custom user data with `user.customData`
  function readCurrentCustomUserData() {
    setCustomUserData(user.customData);
  }

  // Refresh custom user data with `user.refreshCustomData()`
  async function refreshCustomUserData() {
    const data = await user.refreshCustomData();
    setCustomUserData(data);
  }

  // ...
}
