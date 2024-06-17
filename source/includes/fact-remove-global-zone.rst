If you are using the :manual:`standard connection string format
</reference/connection-string#connections-standard-connection-string-format>`
rather than the :abbr:`DNS (Domain Name Service)` seedlist format,
removing an entire zone from an existing global cluster may result
in a new connection string. 

To verify the correct connection string after deploying the changes:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst

   .. step:: Verify the connection string.

      Click :guilabel:`Connect`.
