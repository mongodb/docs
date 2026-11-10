.. warning::

   On RHEL 7.0, if you change the data path, the *default* SELinux
   policies will prevent :binary:`~bin.mongod` from having write access on
   the new data path if you do not change the security context.
