.. important::

   Deleting a project removes all the project's artifacts, including
   all monitoring data. |mms| no longer displays the project in
   selection lists. You can't delete a project that has managed 
   deployments.

   You can delete a project if:

   - You have :authrole:`Project Owner` access for the project.

   - The project has no backups. To terminate your backups prior to
     removing the project, see :ref:`terminate-backup`.