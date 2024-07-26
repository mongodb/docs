.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-processes.rst

   .. step:: Select the :guilabel:`Clusters` view for your deployment.
      
   .. step:: On the card with the replica set, click :guilabel:`Modify`.
      
   .. step:: Add a new member to the replica set.
      
      Select :guilabel:`Arbiter` from the :guilabel:`Member` list when you
      :ref:`add-member-to-rs`.
      
   .. step:: Click :guilabel:`Save`.

   .. step:: Click :guilabel:`Review & Deploy` to review your changes.

   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.
      
   .. step:: Remove the secondary member of the replica set member that you want to replace with the arbiter.
      
      .. note::
      
         To determine which processes are secondaries, click the :guilabel:`Metrics`
         tab and select secondaries in :guilabel:`Toggle Members`.
      
      a. Click :guilabel:`Modify` next to the replica set.
      
      #. Select :guilabel:`Remove from Replica Set`.
      
      #. Click :guilabel:`Save`.
      
   .. step:: Click :guilabel:`Review & Deploy`.
      
   .. step:: Click :guilabel:`Confirm & Deploy`.
