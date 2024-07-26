.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-projects.rst
      
   .. step:: Delete the project.

      Click the :icon-fa4:`trash-o` button for the project you wish to
      delete to open the :guilabel:`Delete Project` modal.
      
   .. step:: Confirm that you want to delete this project.
      
      a. Click :guilabel:`Delete Project`.  
      #. Click :guilabel:`Delete Project` again.
      
   .. step:: Stop the {+mdbagent+}s.
      
      .. list-table::
         :header-rows: 1
      
         * - Agent
           - Procedure
         * - {+aagent+}s
           - Stop the agent's process on each server.
         * - {+magent+}
           - See :ref:`stop-monitoring-agent` and :doc:`/tutorial/delete-monitoring-agent`.
         * - {+bagent+}
           - See :ref:`stop-backup-agent` and :doc:`/tutorial/delete-backup-agent`. 
