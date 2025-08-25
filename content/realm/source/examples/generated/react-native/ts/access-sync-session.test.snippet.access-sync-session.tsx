import React, {useEffect} from 'react';
import {Context} from '../RealmConfig';
const {useRealm} = Context;

function AccessSyncSession() {
  const realm = useRealm();

  async function workWithSyncSession() {
    const {syncSession} = realm;
    // Do stuff with sync session...
  }

  // ...

}
