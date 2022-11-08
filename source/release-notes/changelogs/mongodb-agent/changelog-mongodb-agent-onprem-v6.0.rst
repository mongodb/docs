.. _mongodb-12.0.14.7630:

MongoDB Agent 12.0.14.7630
--------------------------

:ref:`Released with Ops Manager 6.0.6 on 2022-11-08 <opsmgr-server-6.0.6>`

.. _mongodb-12.0.13.7627:

MongoDB Agent 12.0.13.7627
--------------------------

:ref:`Released with Ops Manager 6.0.5 on 2022-10-20 <opsmgr-server-6.0.5>`

- Removes support for unsetting the global default write concern on 
  MongoDB 5.0 and later. The MongoDB Agent now treats 
  ``DefaultRWConcern`` with null or empty values as unmanaged and no 
  longer attempts to unset the value.

.. _mongodb-12.0.12.7624:

MongoDB Agent 12.0.12.7624
--------------------------

:ref:`Released with Ops Manager 6.0.4 on 2022-10-13 <opsmgr-server-6.0.4>`

.. _mongodb-12.0.11.7606:

MongoDB Agent 12.0.11.7606
--------------------------

:ref:`Released with Ops Manager 6.0.3 on 2022-09-01 <opsmgr-server-6.0.3>`

.. _mongodb-12.0.10.7591:

MongoDB Agent 12.0.10.7591
--------------------------

:ref:`Released with Ops Manager 6.0.2 on 2022-08-04 <opsmgr-server-6.0.2>`

.. include:: /includes/extracts/om6-warning-server-68925.rst

Supports :manual:`encryption at rest </core/security-encryption-at-rest/#encryption-at-rest>`
for audit logs using
:ref:`advanced configuration options <deployment-advanced-options-audit-log>`.

.. _mongodb-12.0.9.7579:

MongoDB Agent 12.0.9.7579
--------------------------

:ref:`Released with Ops Manager 6.0.1 on 2022-07-20 <opsmgr-server-6.0.1>`

.. include:: /includes/extracts/om6-warning-server-68925.rst

.. _mongodb-12.0.8.7575:

MongoDB Agent 12.0.8.7575
-------------------------

:ref:`Released with Ops Manager 6.0.0 on 2022-07-19
<opsmgr-server-6.0.0>`

.. include:: /includes/extracts/om6-warning-server-68925.rst
