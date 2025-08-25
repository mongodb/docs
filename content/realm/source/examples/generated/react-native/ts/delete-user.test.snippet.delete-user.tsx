import React, {useState, useEffect} from 'react';
import {useApp, useUser} from '@realm/react';

function DeleteUser() {
  const app = useApp();
  const user = useUser();

  async function deleteUser() {
    // Delete the currently logged in user
    await app.deleteUser(user);
  }
  // ...
}
