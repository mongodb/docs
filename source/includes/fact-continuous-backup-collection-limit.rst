.. admonition:: Collection Limit for |service| Continuous Backup.
   :class: important

   If the total number of collections across all databases in a
   |service| cluster meets or exceeds ``100,000``, |service|
   continuous backup can't take snapshots and may be unable to perform
   any type of restore for that cluster.

   If you need to enable |service| continuous backup
   in a project where one or more deployments meets or exceeds
   the collection limit, click :guilabel:`Support` in the left-hand
   navigation bar of the |service| UI and filling in the requested
   information to open a support ticket.

   :ref:`backup-cloud-provider` do not have a collection limit.
