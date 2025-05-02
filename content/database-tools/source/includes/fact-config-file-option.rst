Specifies the full path to a YAML configuration file containing
sensitive values for the following options to |tool-binary|:

- :option:`--password`
- :option:`--uri`
- :option:`--sslPEMKeyPassword`

This is the recommended way to specify a password to |tool-binary|,
aside from specifying it through a password prompt.

The configuration file takes the following form:

.. code-block:: sh

   password: <password>
   uri: mongodb://mongodb0.example.com:27017
   sslPEMKeyPassword: <password>

Specifying a password to the ``password:`` field and providing a
connection string in the ``uri:`` field which contains a conflicting
password will result in an error.

Be sure to secure this file with appropriate filesystem permissions.

.. note::

   If you specify a configuration file with :option:`--config` and
   also use the :option:`--password`, :option:`--uri` or
   :option:`--sslPEMKeyPassword` option to |tool-binary|, each
   command line option overrides its corresponding option in the
   configuration file.
