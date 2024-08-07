.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-project-alerts.rst
      
   .. step:: Click the :guilabel:`Alert Settings` tab.
      
   .. step:: Add or edit a maintenance window.
      
      - **To add a maintenance window:** Click the :guilabel:`Add` button and
        select :guilabel:`New Maintenance Window`.
      
      - **To edit a maintenance window:** Click the :guilabel:`Maintenance
        Windows` filter, then click the :guilabel:`ellipsis icon` for a
        mainenance window and select :guilabel:`Edit`.
      
   .. step:: Select the target components for which to suspend alerts.
      Note that selecting the :guilabel:`Host` target selects both ``HOST``
      and ``HOST_METRIC`` alert configurations returned through the
      :doc:`alertConfigs endpoint </reference/api/alerts>`.
      
   .. step:: Select the time period for which to suspend alerts.
      
   .. step:: Enter an optional description for the maintenance window.
      
   .. step:: Click :guilabel:`Save`.
