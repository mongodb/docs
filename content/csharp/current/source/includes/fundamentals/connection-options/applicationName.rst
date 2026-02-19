The app name the driver passes to the server in the client metadata as part of
the connection handshake. The server prints this value to the MongoDB logs once
the connection is established. The value is also recorded in the slow query logs
and profile collections. The default value is ``null``.