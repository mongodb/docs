To view the metrics for a specific MongoDB process using the 
{+atlas-ui+}:

.. procedure::
   :style: normal
   
   .. include:: /includes/nav/steps-db-deployments-page.rst
    
   .. step::  Click the process.
    
You can monitor different aspects of your cluster in one place focused 
on a process. To learn more about the 
:guilabel:`Clusters` view, see :ref:`view-cluster-details`.

The |service| process view displays three tabs for monitoring metrics for the process:
 
- The :guilabel:`Status` tab displays the process metrics |service| collects from the selected :binary:`mongod <bin.mongod>` or :binary:`mongos <bin.mongos>` process.

- The :guilabel:`Hardware` tab displays hardware metrics for
  the host machine supporting the selected 
  :binary:`mongod <bin.mongod>` or :binary:`mongos <bin.mongos>`
  process.
 
- The :guilabel:`DB Stats` tab displays the database metrics for the
  selected database.
 
  |service| retrieves database metrics every 20 minutes by default but
  adjusts frequency when necessary to reduce the impact on database
  performance. If the collection of database statistics still affects
  performance, you can disable collection:
  
  a. .. include:: /includes/nav/list-project-settings.rst
  
  #. Set :guilabel:`Collect Database Specific Statistics` to 
     :guilabel:`No`.
 
  The view for each tab has three distinct sections:

  .. include:: /includes/admonitions/notes/note-data-storage-granularity.rst