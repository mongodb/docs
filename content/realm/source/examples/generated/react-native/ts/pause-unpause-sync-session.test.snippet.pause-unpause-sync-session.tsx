import React, {useEffect, useState} from 'react';
import {Context} from '../RealmConfig';
const {useRealm} = Context;

function ToggleSyncSession() {
  const realm = useRealm();
  const [isPaused, setIsPaused] = useState(false);

  async function toggleSyncSession() {
    if (isPaused) {
      await realm.syncSession?.resume();
    } else {
      await realm.syncSession?.pause();
    }
    setIsPaused(!isPaused);
  }

  return (
    <Button
      title={isPaused ? 'Pause Sync' : 'Unpause Sync'}
      onPress={toggleSyncSession}
    />
  );
}
