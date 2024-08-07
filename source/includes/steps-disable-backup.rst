.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-continuous-backup.rst

   .. step:: Stop and then terminate each deployment enrolled in Backup.

      For each deployment enrolled in Backup:
      
      a. Click the backup's ellipsis icon and click :guilabel:`Stop`.
      
      b. Click the :guilabel:`Stop` button. If prompted for an authentication code, enter the code.
      
      a. Once the backup has stopped, click the backup's ellipsis icon and click :guilabel:`Terminate`.
      
      b. Click the :guilabel:`Terminate` button.
      
   .. step:: Stop all {+bagent+}s.

      See :doc:`/tutorial/start-or-stop-backup-agent`.
