If an object passes a key to a database function, ``mongosh`` only sends
the object's own keys to the server. ``mongosh`` does not send
inherited enumerable keys to the server.

