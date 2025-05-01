.. warning::

   On some systems, a password provided directly using the
   :option:`--password` option may be visible to system status programs
   such as ``ps`` that may be invoked by other users. Consider instead:
   
   - omitting the :option:`--password` option to receive an interactive
     password prompt, or
   - using the :option:`--config` option to specify a configuration file
     containing the password.