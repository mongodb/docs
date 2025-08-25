When Client Recovery is enabled, these rules determine how objects are 
integrated, including how conflicts are resolved when both 
the backend and the client make changes to the same object:

- Objects created locally that were not synced before client reset are synced.
- If an object is deleted on the server, but is modified on the recovering 
  client, the delete takes precedence and the client discards the update.
- If an object is deleted on the recovering client, but not the server, 
  then the client applies the server's delete instruction.
- In the case of conflicting updates to the same field, the client update 
  is applied.
