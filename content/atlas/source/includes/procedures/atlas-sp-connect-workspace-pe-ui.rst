.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-stream-processing.rst

   .. step:: In the pane for your {+spw+}, click :guilabel:`Connect`.

      The :guilabel:`Set up connection security` step of the
      :guilabel:`Connect` dialog displays.

   .. step:: Under :guilabel:`Choose connection type`, click
      :guilabel:`Private endpoint`.

   .. step:: Select a workspace private endpoint.

      From the :guilabel:`Select a workspace private endpoint`
      dropdown menu, select the workspace private endpoint that you
      want to connect through. The menu lists only endpoints in the
      same region as the {+spw+} that have an ``Available`` state.

   .. step:: Click :guilabel:`Next`.

   .. step:: Choose a connection method.
      
      On the :guilabel:`Choose a connection method` step,
      select either {+mongosh+} or VS Code, and follow the prompts
      to connect to your {+spw+}.

   .. step:: Click :guilabel:`Done` to close the connection dialog.
