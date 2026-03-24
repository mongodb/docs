
Users without the :authaction:`listDatabases` privilege action can
run the :dbcommand:`listDatabases` command to return a list of
databases for which they have privileges. This includes databases
where the user has privileges on specific collections. Run the
command with the ``authorizedDatabases`` option unspecified or set
to ``true``.
