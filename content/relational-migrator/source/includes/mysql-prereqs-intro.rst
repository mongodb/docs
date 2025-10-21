To run migration jobs from a MySQL source database, the database may require 
some configuration changes. If {+rel-mig+} determines the 
database needs configuration changes, it automatically generates a 
SQL script with the required changes. It is recommended to have a 
Database Administrator (DBA) review the commands in this script and 
perform their execution on the database server.

For details on supported versions of MySQL, see 
:ref:`supported-databases`.
