For most applications, there is no need to manually pause and resume a sync 
session. However, there are a few circumstances under which you may want to 
pause or suspend a sync session:

- You only want to sync after the user takes a specific action
- You only want to sync during a certain time of the day
- You don't want to attempt to sync when there is poor network connectivity
- You want to explicitly force a sync session to connect

In the case of poor network connectivity, continually trying to establish 
a network connection can drain the user's device battery.

The case of explicitly forcing a sync session to connect is most commonly 
related to being offline for some time. The sync client attempts to 
connect, and upon failure, goes into exponential backoff. After being offline 
for a long time, the client may not immediately reconnect. Pausing and 
resuming the sync session explicitly forces the connection.

When you do pause a sync session, keep these things in mind:

- If the client may be offline longer than the :ref:`client maximum offline 
  time <client-maximum-offline-time>`, the client will be unable to resume
  syncing and must perform a :ref:`client reset <client-resets>`.
- Pausing a sync session pauses it in both directions. Changes that your app 
  makes on the device do not sync with the backend, *and* changes to the
  data in the backend or on other devices do not sync to the device. There
  is no way to pause only uploads or pause only downloads.
- Do not pause a sync session if you want a client to permanently stop 
  syncing with the backend. To permanently stop syncing, 
  copy the contents of the synced realm into a non-synced 
  realm, and use the non-synced realm in the client.

*Do not* pause sync to stop syncing for indefinite time periods or time 
ranges in months and years. The functionality is not designed or tested 
for these use cases. You could encounter a range of issues when using it 
this way.
