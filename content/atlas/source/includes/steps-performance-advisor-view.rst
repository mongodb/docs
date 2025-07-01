.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. step:: Click the replica set where the collection resides.

      If the replica set is part of a sharded cluster, first click the
      sharded cluster containing the replica set.
      
   .. step:: Click :guilabel:`Performance Advisor`.
      
   .. step:: View recommendations.

      The :guilabel:`Performance Advisor` fetches index recommendations 
      from the past 24 hours.

      - If the :guilabel:`Performance Advisor` has recommendations, 
        click :guilabel:`View Recommendations` button in 
        the :guilabel:`Create Indexes` section.

      - If the :guilabel:`Performance Advisor` has no recommendations, 
        to look up index recommendations for up to the past 5 days, 
        click :guilabel:`Explore Recommendations` in the 
        :guilabel:`Create Indexes` section.

      The :guilabel:`Performance Advisor` ranks the 
      indexes according to their :guilabel:`Impact`, which is based on 
      the total wasted bytes read by the associated operations. To 
      learn more about index ranking, see :ref:`pa-index-ranking`.

   .. step:: (Optional) Filter results.

      Filter the results by any of the following options:

      - :guilabel:`Filter by shards and hosts`
      - :guilabel:`Filter by namespace`
      - :guilabel:`Filter by time range`
      - :guilabel:`Filter by date and time`
