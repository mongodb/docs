.. _mongodb-11.0.27.7162:

MongoDB Agent 11.0.27.7162
--------------------------

:ref:`Released with Ops Manager 5.0.22 on 2023-07-31 <opsmgr-server-5.0.22>`

.. _mongodb-11.0.26.7158:

MongoDB Agent 11.0.26.7158
--------------------------

:ref:`Released with Ops Manager 5.0.21 on 2023-06-01 <opsmgr-server-5.0.21>`

.. _mongodb-11.0.25.7136:

MongoDB Agent 11.0.25.7136
--------------------------

:ref:`Released with Ops Manager 5.0.20 on 2023-03-15 <opsmgr-server-5.0.20>`

.. _mongodb-11.0.24.7131:

MongoDB Agent 11.0.24.7131
--------------------------

:ref:`Released with Ops Manager 5.0.19 on 2023-02-09 <opsmgr-server-5.0.19>`

.. _mongodb-11.0.23.7129:

MongoDB Agent 11.0.23.7129
--------------------------

:ref:`Released with Ops Manager 5.0.18 on 2023-02-02 <opsmgr-server-5.0.18>`

.. _mongodb-11.0.22.7120:

MongoDB Agent 11.0.22.7120
--------------------------

:ref:`Released with Ops Manager 5.0.17 on 2022-11-17 <opsmgr-server-5.0.17>`

.. _mongodb-11.0.21.7116:

MongoDB Agent 11.0.21.7116
--------------------------

:ref:`Released with Ops Manager 5.0.16 on 2022-10-20 <opsmgr-server-5.0.16>`

- Removes support for unsetting the global default write concern on 
  MongoDB 5.0 and later. The MongoDB Agent now treats 
  ``DefaultRWConcern`` with null or empty values as unmanaged and no 
  longer attempts to unset the value.

.. _mongodb-11.0.20.7108:

MongoDB Agent 11.0.20.7108
--------------------------

:ref:`Released with Ops Manager 5.0.15 on 2022-09-19 <opsmgr-server-5.0.15>`

- Prevents unnecessary audit log rotations when using with MongoDB 5.0 releases.

.. _mongodb-11.0.19.7094:

MongoDB Agent 11.0.19.7094
--------------------------

:ref:`Released with Ops Manager 5.0.14 on 2022-08-04 <opsmgr-server-5.0.14>`

.. include:: /includes/extracts/om5-warning-server-68925.rst

.. _mongodb-11.0.18.7089:

MongoDB Agent 11.0.18.7089
--------------------------

:ref:`Released with Ops Manager 5.0.13 on 2022-07-21 <opsmgr-server-5.0.13>`

.. include:: /includes/extracts/om5-warning-server-68925.rst

.. _mongodb-11.0.17.7086:

MongoDB Agent 11.0.17.7086
--------------------------

:ref:`Released with Ops Manager 5.0.12 on 2022-06-30 <opsmgr-server-5.0.12>`

.. include:: /includes/extracts/om5-warning-server-68925.rst

.. _mongodb-11.0.16.7080:

MongoDB Agent 11.0.16.7080
--------------------------

:ref:`Released with Ops Manager 5.0.11 on 2022-06-02 <opsmgr-server-5.0.11>`

.. include:: /includes/extracts/om5-warning-server-68925.rst

.. _mongodb-11.0.15.7073:

MongoDB Agent 11.0.15.7073
--------------------------

:ref:`Released with Ops Manager 5.0.10 on 2022-05-05 <opsmgr-server-5.0.10>`

.. include:: /includes/extracts/om5-warning-server-68925.rst

.. _mongodb-11.0.14.7064:

MongoDB Agent 11.0.14.7064
--------------------------

:ref:`Released with Ops Manager 5.0.9 on 2022-04-07 <opsmgr-server-5.0.9>`

.. _mongodb-11.0.13.7055:

MongoDB Agent 11.0.13.7055
--------------------------

:ref:`Released with Ops Manager 5.0.8 on 2022-03-03 <opsmgr-server-5.0.8>`

Supports MongoDB log rotate configuration and commands for independent 
log rotation configuration for MongoDB Log and MongoDB Audit Log Files.

.. _mongodb-11.0.12.7051:

MongoDB Agent 11.0.12.7051
--------------------------

:ref:`Released with Ops Manager 5.0.7 on 2022-02-17 <opsmgr-server-5.0.7>`

Rejects legacy monitoring and backup agent settings that don't match
MongoDB Agent settings when ``configOverrides`` field should be used.

.. _mongodb-11.0.11.7036:

MongoDB Agent 11.0.11.7036
--------------------------

:ref:`Released with Ops Manager 5.0.6 on 2022-01-13 <opsmgr-server-5.0.6>`

.. _mongodb-11.0.10.7021:

MongoDB Agent 11.0.10.7021
--------------------------

:ref:`Released with Ops Manager 5.0.5 on 2021-12-02 <opsmgr-server-5.0.5>`


.. _mongodb-11.0.9.7010:

MongoDB Agent 11.0.9.7010
-------------------------

:ref:`Released with Ops Manager 5.0.4 on 2021-11-04 <opsmgr-server-5.0.4>`

.. _mongodb-11.0.8.7002:

MongoDB Agent 11.0.8.7002
-------------------------

:ref:`Released with Ops Manager 5.0.3 on 2021-10-06 <opsmgr-server-5.0.3>`

- Removes support for RHEL/CentOS 6 for the MongoDB Agent.

.. _mongodb-11.0.7.6992:

MongoDB Agent 11.0.7.6992
-------------------------

:ref:`Released with Ops Manager 5.0.2 on 2021-09-03 <opsmgr-server-5.0.2>`


.. _mongodb-11.0.6.6981:

MongoDB Agent 11.0.6.6981
-------------------------

:ref:`Released with Ops Manager 5.0.1 on 2021-08-05 <opsmgr-server-5.0.1>`

.. _mongodb-11.0.5.6967-1:

MongoDB Agent 11.0.5.6967-1
---------------------------

:ref:`Released with Ops Manager 5.0.0 on 2021-07-13 <opsmgr-server-5.0.1>`

- Stops adding MongoDB binaries (such as |mongod|, |mongos|, etc.)
  to the Linux path when installing from RPM and DEB packages.
