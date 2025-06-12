Specifies the full path to a YAML configuration file that contains
sensitive values for the following |tool-binary| options: 

- :option:`--password`
- :option:`--uri`
- :option:`--sslPEMKeyPassword`

This is the recommended way to specify a password to |tool-binary|,
aside from specifying it through a password prompt. You can use any combination
of the arguments in the file.

The configuration file takes the following form:

.. code-block:: sh

   password: <password>
   uri: mongodb://mongodb0.example.com:27017
   sslPEMKeyPassword: <password>

If you specify the ``password`` option without specifying ``uri``, you can
specify the other components of the connection string by using |tool-binary| 
command line options, such as :option:`--username` and :option:`--host`.

Be sure to secure this file with appropriate filesystem permissions.

.. important::

   When using the ``--config`` option, keep the following limitations and
   behaviors in mind:

   - If you provide the ``password`` field and provide a connection 
     string in the ``uri`` field with a conflicting password, 
     ``mongorestore`` throws an error.

   - If you specify a configuration file with ``--config`` and also use
     the :option:`--password`, :option:`--uri`, or :option:`--sslPEMKeyPassword`
     |tool-binary| command line options, the command line option overrides
     the corresponding configuration file option.
