The privileges of the following built-in roles no longer apply to the
``local`` and ``config`` databases:

.. list-table::
   :header-rows: 1
   :widths: 30 70

   * - Role

     - Change
 
   * - :authrole:`readAnyDatabase`

     - Starting in 3.4, to provide ``read`` privileges on the ``local``
       database, create a user in the ``admin`` database with
       :authrole:`read` role in the ``local`` database. See also
       :authrole:`clusterManager` and :authrole:`clusterMonitor` role
       for access to the ``config`` and ``local`` databases.

   * - :authrole:`readWriteAnyDatabase`

     - Starting in 3.4, to provide ``readWrite`` privileges on the
       ``local`` database, create a user in the ``admin`` database with
       :authrole:`readWrite` role in the ``local`` database. See also
       :authrole:`clusterManager` and :authrole:`clusterMonitor` role
       for access to the ``config`` and ``local`` databases.

   * - :authrole:`userAdminAnyDatabase`
     - 

   * - :authrole:`dbAdminAnyDatabase`

     - Starting in 3.4, to provide ``dbAdmin`` privileges on the
       ``local`` database, create a user in the ``admin`` database with
       :authrole:`dbAdmin` role in the ``local`` database. See also
       :authrole:`clusterManager` and :authrole:`clusterMonitor` role
       for access to the ``config`` and ``local`` databases.

Correspondingly, the following built-in roles include additional read
and write privileges on ``local`` and ``config`` databases:

- :authrole:`clusterManager`

- :authrole:`clusterMonitor`

- :authrole:`backup`

- :authrole:`restore`.
