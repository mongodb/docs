|service| does not guarantee that host names remain consistent with
respect to node types during topology changes.

.. example::

   If you have a cluster named ``foo123`` containing an analytics
   node ``foo123-shard-00-03-a1b2c.mongodb.net:27017``, |service| does
   not guarantee that specific host name will continue to refer to an
   analytics node after a topology change, such as
   :doc:`scaling a cluster </scale-cluster>` to modify its
   number of nodes or regions.