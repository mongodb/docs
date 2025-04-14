To authenticate as a user, you must provide a username, password, and
the :ref:`authentication database <mongo-shell-authentication-options>`
associated with that user.

To authenticate using the :binary:`~bin.mongo` shell, either:

- Use the :binary:`~bin.mongo` command-line authentication options
  (:option:`--username <mongo --username>`,
  :option:`--password <mongo --password>`, and
  :option:`--authenticationDatabase <mongo --authenticationDatabase>`)
  when connecting to the :binary:`~bin.mongod` or
  :binary:`~bin.mongos` instance, or

- Connect first to the :binary:`~bin.mongod` or :binary:`~bin.mongos`
  instance, and then run the :dbcommand:`authenticate` command or the
  :method:`db.auth()` method against the :ref:`authentication database
  <mongo-shell-authentication-options>`.

  .. important::

     Authenticating multiple times as different users does **not** drop
     the credentials of previously-authenticated users. This may lead to
     a connection having more permissions than intended by the user, and
     causes operations within a
     :doc:`logical session </reference/server-sessions>` to raise an
     error.

For examples of authenticating using a MongoDB driver, see the
`driver documentation <https://docs.mongodb.com/ecosystem/drivers/>`__.
