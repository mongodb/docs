.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Cause
     - Description
   * - {+Cluster+} Tier Scaling - Network Storage
     - When you scale a {+cluster+} up or down, 
       |service| provisions a new instance. Once the instance 
       is ready, |service| attaches network storage and starts 
       both ``mongod`` and ``mongot`` on the new nodes.

       If ``mongod`` starts before ``mongot``, 
       |fts| queries fail until ``mongot`` is running.

   * - {+Cluster+} Tier Scaling - Local |ssd|
     - When you scale an |service| {+cluster+} using local |ssd|, 
       you can't retain storage and reattach it to the new nodes. 
       Therefore, |service| performs an :ref:`initial sync <troubleshoot-initial-sync>`
       to rebuild the search indexes. Search queries fail until the
       initial sync is complete.

   * - Lucene Downgrade
     - In rare cases where you require downgrading 
       :ref:`Lucene <fts-architecture>`, you might not be able 
       to read newer Lucene index formats.

   * - Storage Adjustment
     - You can retain network storage attached to 
       |service| {+cluster+} nodes. This allows you to expand or contract 
       the volume capacity with no impact to ``mongot``. 
       
       However, retaining network storage might not be possible 
       in certain regions, when your {+cluster+} is using local |nvme|
       disks, or under other rare circumstances. In these cases, |service|
       performs an initial sync and search queries fail
       until the initial sync is complete.

   * - ``mongot`` Version Update
     - During a ``mongot`` version update, |service| stops the 
       old version of ``mongot`` and starts the new version. 
       During this brief period, search queries fail until 
       the new ``mongot`` is up.
       
   * - New ``mongod`` Node
     - When you add a new node to your {+cluster+}, |service| performs 
       an initial sync to create the search indexes. Search queries 
       that use the new ``mongod`` node 
       fail until the initial sync is complete.

   * - Instance Reboot or Replacement
     - - Your |service| instance might reboot 
         during a new security policy rollout or if 
         your cloud provider requires it.
         While |service| reboots, if ``mongod`` starts before 
         ``mongot``, search queries fail until ``mongot``
         is running.

       - Your |service| instance might require a replacement
         if you have unhealthy hardware or if you've
         migrated system architectures. When you replace the 
         instance, ``mongot`` performs an initial sync and 
         search queries fail until the initial sync 
         is complete.

   * - ``mongot`` Restart
     - Any time the ``mongot`` process restarts from 
       configuration changes, search queries fail until 
       ``mongot`` becomes available.