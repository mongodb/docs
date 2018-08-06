.. note::

   - The ``SCRAM-SHA-1`` and ``SCRAM-SHA-256`` mechanisms hash the
     passwords in the client plugin; however, all other data is in
     cleartext. If possible, use with encrypted connections.

   - The ``PLAIN`` mechanism sends the password in cleartext. Use 
     encrypted connections with the ``PLAIN`` mechanism .
