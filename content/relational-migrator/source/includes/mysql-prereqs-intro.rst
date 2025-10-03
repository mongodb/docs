To run migration jobs from a MySQL source database, the database may require 
some configuration changes. If {+rel-mig+} determines the 
database needs configuration changes, it automatically generates a 
SQL script with the required changes. It is recommended to have a 
Database Administrator (DBA) review the commands in this script and 
perform their execution on the database server. The 
MySQL Server configurations depend on the type of migration job:

.. include:: /includes/fact-short-sync-job-desc.rst

For details on supported versions of MySQL, see 
:ref:`supported-databases`.