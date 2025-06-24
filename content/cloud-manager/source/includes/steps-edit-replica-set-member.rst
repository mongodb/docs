.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-deployment.rst

   .. include:: /includes/nav/steps-processes.rst
   
   .. step:: Select the :guilabel:`Clusters` view for your deployment.
      
   .. step:: On the card with the replica set, click :guilabel:`Modify`.
      
   .. step:: In :guilabel:`Member Configuration`, modify the settings for the replica set member that you want to edit.
      
      You can modify the following settings:
      
      .. list-table::  
         :widths: 30 70
      
         * - :guilabel:`Votes`
           - Specify whether the replica set member votes in elections.
             A value of ``1`` indicates the member votes, while a value
             of ``0`` indicates that the member does not vote.
      
         * - :guilabel:`Priority`
           - Specify the priority of the replica set member during elections.
             Non-voting members must have a priority of ``0``.
      
         * - :guilabel:`Delay`
           - Specify whether the member is a delayed replica set member.
      
         * - :guilabel:`Build Indexes`
           - Specify whether the replica set member builds indexes.
      
         * - :guilabel:`Tags`
           - Enter JSON that defines the tag set that you want to add to the
             replica set member.
         
      .. note:: 
      
         After deploying the replica set, you can't modify a replica set 
         member's :guilabel:`hostname` or :option:`port <mongod.--port>`.
      
   .. step:: Click :guilabel:`Save`.

   .. step:: Click :guilabel:`Review & Deploy` to review your changes.

   .. step:: Click :guilabel:`Confirm & Deploy` to deploy your changes.
      
      Otherwise, click :guilabel:`Cancel` and you can make
      additional changes.   
