If you use the :manual:`standard connection string format
</reference/connection-string#connections-standard-connection-string-format>`
rather than the |dns| seedlist format, removing an entire region from an
existing cross-region cluster may result in a new connection string. 

To verify the correct connection string after deploying the changes:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. step:: Click :guilabel:`Connect`.
