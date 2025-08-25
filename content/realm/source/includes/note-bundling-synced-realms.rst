.. important:: Bundling Synced Realms

   If your backend application uses :ref:`Flexible Sync <flexible-sync>`, users
   could experience a client reset the first time they open the bundled realm
   file. This can occur when :ref:`client maximum offline time
   <client-maximum-offline-time>` is enabled (client maximum offline time is
   enabled by default). If the bundled realm file was generated more than the
   number of days specified by the client maximum offline time setting before
   the user syncs for the first time, the user experiences a client reset.

   Applications that perform a client reset download the full state of the 
   realm from the application backend. This negates the 
   advantages of bundling a realm file. To prevent client resets and 
   preserve the advantages of realm file bundling:

   - Avoid using a client maximum offline time in applications that
     bundle a synchronized realm.

   - If your application does use a client maximum offline time, ensure
     that your application download always includes a recently synced
     realm file. Generate a new file each application version,
     and ensure that no version ever stays current for more than
     **client maximum offline time** number of days.
