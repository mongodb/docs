
.. note::

   Disabling the balancer is only necessary when **manually** taking backups,
   either by calling :program:`mongodump` or scheduling a task that calls
   ``mongodump`` at a specific time.

   You do **not** have to disable the balancer when using coordinated backup
   and restore processes:

   - `MongoDB Atlas <https://www.mongodb.com/atlas/database?tck=docs_server>`_

   - `MongoDB Cloud Manager
     <https://www.mongodb.com/cloud/cloud-manager?tck=docs_server>`_
   
   - `MongoDB Ops Manager
     <https://www.mongodb.com/products/ops-manager?tck=docs_server>`_
 
