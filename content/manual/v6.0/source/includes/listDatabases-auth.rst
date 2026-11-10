
If the user does not have the :authaction:`listDatabases`
privilege action, users can run the :dbcommand:`listDatabases`
command to return a list of databases for which the user has
privileges (including databases for which the user has privileges
on specific collections) if the command is run with
``authorizedDatabases`` option unspecified or set to ``true``.
   
