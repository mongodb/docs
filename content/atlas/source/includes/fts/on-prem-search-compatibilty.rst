On-Prem Deployment Compatibility
--------------------------------

The following table describes on-prem compatibility with {+fts+}.  

.. list-table:: 
   :header-rows: 1
   :widths: 40 10 25 25


   * - Operating system
     - Architecture
     - Minimum MongoDB version
     - Supports Search

   * - Amazon Linux 2023
     - ARM64
     - 8.2 
     - Yes 

   * - Amazon Linux 2023 
     - x86_64
     - 8.2 
     - Yes 

   * - Debian 12 
     - x86_64
     - 8.2 
     - Yes 

   * - RHEL/Rocky/Alma/Oracle Linux 8.8+ 
     - ARM64
     - 8.2 
     - Yes 

   * - RHEL/Rocky/Alma/Oracle Linux 8.8+ 
     - x86_64
     - 8.2 
     - Yes

   * - RHEL/Rocky/Alma/Oracle Linux 9.3+ 
     - ARM64
     - 8.2 
     - Yes 

   * - RHEL/Rocky/Alma/Oracle Linux 9.3+ 
     - x86_64
     - 8.2 
     - Yes 

   * - SUSE 15 
     - x86_64
     - 8.2 
     - Yes 

   * - Ubuntu 20.04 
     - ARM64
     - 8.2 
     - Yes 

   * - Ubuntu 20.04 
     - x86_64
     - 8.2 
     - Yes 

   * - Ubuntu 22.04 
     - ARM64
     - 8.2 
     - Yes 

   * - Ubuntu 22.04 
     - x86_64
     - 8.2 
     - Yes 

   * - Ubuntu 24.04 
     - ARM64
     - 8.2 
     - Yes 

   * - Ubuntu 24.04 
     - x86_64
     - 8.2 
     - Yes

On-Prem Limitations
-------------------

The following limitations apply to {+fts+} with on-prem deployments. 

{+fts+} Index Stats
~~~~~~~~~~~~~~~~~~~~~~~~~~

:pipeline:`$listSearchIndexes` operations on on-prem deployments do not output index stats
or statuses. 

{+fts+} Features
~~~~~~~~~~~~~~~~~~~~~~~

The following {+fts+} features are not available with on-prem deployments:

- Backup and Restore
- File Copy-based Initial Sync (FCIS)
- Query Tracking
- Encryption

.. note::

   You can manually implement Backup and Restore or BYOK Encryption. 

.. _mongot-tls-limitations:

``mongot`` TLS Configuration Limitations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

``mongot`` has the following configuration limitations regarding TLS. 

Cipher Suites
`````````````

MongoDB has a predefined list of cipher suites that are recommended for use with
HTTP/2 with Netty and only uses suites in that list. Accordingly, you cannot
specify a cipher suite for your on-prem deployment. 

FIPS
````

``mongot`` does not support FIPS mode, regardless of support and configuration
in ``mongod`` or ``mongos``. If you enable FIPS mode on ``mongod`` or
``mongos``, MongoDB does not enable FIPS mode on ``mongot`` and may result in
undefined behavior. For more information on MongoDB and FIPS, see
:manual:`Configure MongoDB for FIPS </tutorial/configure-fips/>`.


Host Name Validation
````````````````````

The ``mongot`` use of the gRPC listen server does not support TLS/SSL hostname
validation, inclluding checking the Subject Alternative Name (SAN). 