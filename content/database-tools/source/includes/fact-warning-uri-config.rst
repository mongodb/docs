.. warning::

   On some systems, a password provided in a connection string
   with the :option:`--uri` option may be visible to system status
   programs such as ``ps`` that may be invoked by other users. Consider
   instead:
   
   - omitting the password in the connection string to receive an
     interactive password prompt, or
   - using the :option:`--config` option to specify a configuration file
     containing the password.