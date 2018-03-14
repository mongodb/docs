If your MongoDB instance uses :manual:`authentication
</core/authentication/>`, your |bi-short| instance must also use
authentication. The user that connects to MongoDB
via the :binary:`~bin.mongosqld` program must have permission to list
all of the databases in your MongoDB deployment, as well as
permission to read from all the namespaces to wish to read data from.

The :authaction:`listDatabases` privilege is required to list all
databases. The :authrole:`readAnyDatabase` role includes the
:authaction:`listDatabases` privilege. To create a user with the
:authrole:`readAnyDatabase` role, execute the following command
in the :binary:`~bin.mongo` shell:

.. code-block:: javascript
   :class: copyable

   db.getSiblingDB("admin").createUser(
     {
       user: "<username>",
       pwd: "<password>",
       roles: [
                 { "role": "readAnyDatabase", "db": "admin"  }
              ]
     }
   )

To run :binary:`~bin.mongosqld` with authentication enabled, use the
:option:`--auth <mongosqld --auth>` option.