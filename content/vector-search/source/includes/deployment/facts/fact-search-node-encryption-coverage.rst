By default, MongoDB and :ref:`search processes <about-mongot>` run on the same nodes.
With this architecture, customer-managed encryption applies to your database data, 
but it does not apply to search indexes.

When you enable :ref:`dedicated Search Nodes
<what-is-search-node>`, search processes run on separate nodes. This allows
you to enable :ref:`Search Node Data Encryption <enable-search-node-encryption>`,
so you can encrypt both database data and search indexes with the same
customer-managed keys for comprehensive encryption coverage.

.. note::

   Database nodes and Search Nodes use different encryption methods
   with the same customer-managed keys. Database nodes use the
   :manual:`WiredTiger Encrypted Storage Engine
   </core/security-encryption-at-rest/#encrypted-storage-engine>`,
   while Search Nodes use encryption at the disk level.
