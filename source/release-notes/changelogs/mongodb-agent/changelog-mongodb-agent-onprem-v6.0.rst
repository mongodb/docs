.. _mongodb-12.0.35.7911-1:

MongoDB Agent 12.0.35.7911-1
----------------------------

:ref:`Released with Ops Manager 6.0.27 on 2025-01-30 <opsmgr-server-6.0.27>`.

.. _mongodb-12.0.34.7888-1:

MongoDB Agent 12.0.34.7888-1
----------------------------

:ref:`Released with Ops Manager 6.0.26 on 2024-10-31 <opsmgr-server-6.0.26>`.

.. _mongodb-12.0.33.7866-1:

MongoDB Agent 12.0.33.7866-1
----------------------------

:ref:`Released with Ops Manager 6.0.25 on 2024-08-08 <opsmgr-server-6.0.25>`.

- Fixes `CVE-2023-45288 <https://cve.mitre.org/cgi-bin/cvename.cgi?name=CVE-2023-45288>`__

.. _mongodb-12.0.32.7851-1:

MongoDB Agent 12.0.32.7851-1
----------------------------

:ref:`Released with Ops Manager 6.0.24 on 2024-07-12 <opsmgr-server-6.0.24>`.

.. _mongodb-12.0.30.7791:

MongoDB Agent 12.0.30.7791
--------------------------

:ref:`Released with Ops Manager 6.0.22 on 2023-01-04 <opsmgr-server-6.0.22>`.

.. _mongodb-12.0.29.7785:

MongoDB Agent 12.0.29.7785
--------------------------

:ref:`Released with Ops Manager 6.0.21 on 2023-12-14 <opsmgr-server-6.0.21>`.

.. _mongodb-12.0.28.7763:

MongoDB Agent 12.0.28.7763
--------------------------

:ref:`Released with Ops Manager 6.0.20 on 2023-11-03 <opsmgr-server-6.0.20>`.

.. _mongodb-12.0.27.7746:

MongoDB Agent 12.0.27.7746
--------------------------

:ref:`Released with Ops Manager 6.0.19 on 2023-10-05 <opsmgr-server-6.0.19>`

.. _mongodb-12.0.26.7740:

MongoDB Agent 12.0.26.7740
--------------------------

:ref:`Released with Ops Manager 6.0.18 on 2023-09-07 <opsmgr-server-6.0.18>`

.. _mongodb-12.0.25.7724:

MongoDB Agent 12.0.25.7724
--------------------------

:ref:`Released with Ops Manager 6.0.17 on 2023-08-03 <opsmgr-server-6.0.17>`

.. _mongodb-12.0.24.7719:

MongoDB Agent 12.0.24.7719
--------------------------

:ref:`Released with Ops Manager 6.0.16 on 2023-07-06 <opsmgr-server-6.0.16>`

.. _mongodb-12.0.23.7711:

MongoDB Agent 12.0.23.7711
--------------------------

:ref:`Released with Ops Manager 6.0.15 on 2023-06-15 <opsmgr-server-6.0.15>`

.. _mongodb-12.0.22.7705:

MongoDB Agent 12.0.22.7705
--------------------------

:ref:`Released with Ops Manager 6.0.14 on 2023-06-01 <opsmgr-server-6.0.14>`

.. _mongodb-12.0.21.7698:

MongoDB Agent 12.0.21.7698
--------------------------

:ref:`Released with Ops Manager 6.0.13 on 2023-05-04 <opsmgr-server-6.0.13>`

.. _mongodb-12.0.20.7686:

MongoDB Agent 12.0.20.7686
--------------------------

:ref:`Released with Ops Manager 6.0.12 on 2023-04-07 <opsmgr-server-6.0.12>`

.. _mongodb-12.0.19.7676:

MongoDB Agent 12.0.19.7676
--------------------------

:ref:`Release with Ops Manager 6.0.11 on 2023-03-15 <opsmgr-server-6.0.11>`

.. _mongodb-12.0.18.7668:

MongoDB Agent 12.0.18.7668
--------------------------

:ref:`Released with Ops Manager 6.0.10 on 2023-03-02 <opsmgr-server-6.0.10>`

- The agent now compresses its own rotated logs.

.. _mongodb-12.0.17.7665:

MongoDB Agent 12.0.17.7665
--------------------------

:ref:`Released with Ops Manager 6.0.9 on 2023-02-02 <opsmgr-server-6.0.9>`

.. _mongodb-12.0.16.7656:

MongoDB Agent 12.0.16.7656
--------------------------

:ref:`Released with Ops Manager 6.0.8 on 2023-01-12 <opsmgr-server-6.0.8>`

.. _mongodb-12.0.15.7646:

MongoDB Agent 12.0.15.7646
--------------------------

:ref:`Released with Ops Manager 6.0.7 on 2022-12-01 <opsmgr-server-6.0.7>`

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

- Supports :manual:`encryption at rest </core/security-encryption-at-rest/#encryption-at-rest>`
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
