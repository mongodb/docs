The privileges of the following built-in roles no longer apply to the
``local`` and ``config`` databases:

- :authrole:`readAnyDatabase`

  To provide ``read`` privileges on the ``local`` database, create a
  user in the ``admin`` database with :authrole:`read` role in the
  ``local`` database. See also :authrole:`clusterManager` and
  :authrole:`clusterMonitor` role for access to the ``config`` and
  ``local`` databases.

- :authrole:`readWriteAnyDatabase`

  To provide ``readWrite`` privileges on the ``local`` database, create
  a user in the ``admin`` database with :authrole:`readWrite` role in
  the ``local`` database. See also :authrole:`clusterManager` and
  :authrole:`clusterMonitor` role for access to the ``config`` and
  ``local`` databases.
   
- :authrole:`userAdminAnyDatabase`, and 

- :authrole:`dbAdminAnyDatabase`

  To provide ``dbAdmin`` privileges on the ``local`` database, create a
  user in the ``admin`` database with :authrole:`dbAdmin` role in the
  ``local`` database. See also :authrole:`clusterManager` and
  :authrole:`clusterMonitor` role for access to the ``config`` and
  ``local`` databases.

Correspondingly, the :authrole:`clusterManager`,
:authrole:`clusterMonitor`, :authrole:`backup`, and :authrole:`restore`
roles include additional read and write privileges on ``local`` and
``config`` databases.
