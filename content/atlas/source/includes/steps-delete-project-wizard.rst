.. step:: Complete the recommended actions.

   The :guilabel:`Recommended Actions` step lists the data
   governance tasks that MongoDB recommends you complete before
   you delete the project:

   - Export your most recent backup snapshot.
   - Export your :ref:`audit logs <mongodb-logs>`.
   - Export your :ref:`Project Activity Feed <view-activity-feed>`
     events.
   - Disconnect third-party integrations to remove their API keys.

   Select the acknowledgement checkbox, then click
   :guilabel:`Proceed to required actions`.

.. step:: Review the project data that |service| deletes.

   The :guilabel:`Review project data` step lists the resources in
   the project that |service| permanently deletes:

   - {+Clusters+}, including {+Flex-clusters+} and
     {+Free-clusters+}
   - {+atlas-app-services+} applications
   - :ref:`Federated database instances <atlas-data-federation>`
   - {+atlas-sp+} workspaces
   - :ref:`Private endpoints <private-endpoint>`
   - AI model API keys

   Expand each card to review its individual resources.

.. step:: Acknowledge the required actions.

   In the :guilabel:`Required actions` section, select all three
   checkboxes to confirm that |service|:

   - Permanently deletes all project data, which you can't
     recover.
   - Overrides :ref:`Termination Protection
     <create-cluster-termination-protection>` for all
     {+clusters+} and deletes :ref:`online archives
     <online-archive-overview>`, backup snapshots, stream
     processors, and connections.
   - Revokes access to federated database instances, which might
     disrupt your applications.

.. step:: Click :guilabel:`Delete project forever`.

   |service| deletes the project and returns you to the
   :guilabel:`All Projects` page.
