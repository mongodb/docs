.. note::

   If using |tool-binary| on Ubuntu 18.04, you may experience a
   ``cannot unmarshal DNS`` error message when using
   :ref:`SRV connection strings <connections-dns-seedlist>` (in the
   form ``mongodb+srv://``) with the :option:`--uri` option. If so, use
   one of the following options instead:

   - the :option:`--uri` option with a :ref:`non-SRV connection string
     <connections-standard-connection-string-format>` (in the form
     ``mongodb://``)
   - the :option:`--host` option to specify the host to connect to
     directly
