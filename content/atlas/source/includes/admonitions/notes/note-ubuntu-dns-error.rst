.. note::

   If using |mongodump| or |mongorestore| on Ubuntu 18.04, you may
   experience a ``cannot unmarshal DNS`` error message when using
   :ref:`SRV connection strings <connections-dns-seedlist>` (in the
   form ``mongodb+srv://``) with the ``--uri`` option. If so, use
   one of the following options instead:

   - the ``--uri`` option with a :ref:`non-SRV connection string
     <connections-standard-connection-string-format>` (in the form
     ``mongodb://``)
   - the ``--host`` option to specify the host to connect to
     directly
