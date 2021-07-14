To authenticate as a user, you must provide a username, password, and
the :ref:`authentication database <mongo-shell-authentication-options>`
associated with that user.

To authenticate using :binary:`~bin.mongosh`, either:

- Use the :binary:`~bin.mongosh` command-line authentication options
  (:option:`--username <mongosh --username>`,
  :option:`--password <mongosh --password>`, and
  :option:`--authenticationDatabase <mongosh --authenticationDatabase>`)
  when connecting to the :binary:`~bin.mongod` or
  :binary:`~bin.mongos` instance, or

- Connect first to the :binary:`~bin.mongod` or :binary:`~bin.mongos`
  instance, and then run the :dbcommand:`authenticate` command or the
  :method:`db.auth()` method against the :ref:`authentication database
  <mongo-shell-authentication-options>`.

For examples of authenticating using a MongoDB driver, see the
`driver documentation <https://docs.mongodb.com/ecosystem/drivers/>`__.
