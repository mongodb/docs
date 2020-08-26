.. option:: --unixSocketPrefix <path>

   *Default*: /tmp

   Specifies an alternative directory for the :program:`mongosqld` Unix domain
   socket.
   
   :program:`mongosqld` will create a socket file called ``mysql.sock`` underneath
   this path. If you do not specify :option:`--unixSocketPrefix`, the socket will exist at
   ``/tmp/mysql.sock``.

