|mms| creates snapshots of |fcv-link| of 4.2 or later deployments by
copying the bytes on disk from a host's :setting:`storage.dbPath` to the
snapshot store. If you enable MongoDB Encryption at Rest for the host
you are backing up, the bytes that |mms| copies to the snapshot store
are already encrypted. |mms| encrypts data at the storage engine layer 
when you write data to a host's disk.

For |fcv-link| of 4.2 or later deployments, |mms| components don't
interact with the |kmip| host when taking snapshots. 
