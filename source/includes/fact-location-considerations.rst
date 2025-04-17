For best performance, locate the machine or server running Relational 
Migrator as geographically close to the source and target databases as 
possible. Proximity to the target database influences performance
the most: 

- If you're using Relational Migrator for an on-premises migration, 
  run Relational Migrator in the same data center as the source 
  database.

- If you're using a cloud hosted database, run Relational 
  Migrator on an EC2 instance or VM in the same 
  :abbr:`VPC (Virtual Private Cloud)` as the source database.

.. tip::

   Check the sleep timeout setting for your operating system. If your 
   machine goes to sleep during a migration, the migration job fails.