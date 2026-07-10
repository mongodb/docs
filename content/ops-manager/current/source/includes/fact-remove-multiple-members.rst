You can remove or migrate multiple replica set members at once, but a majority of the
voting members must remain. If you need to remove more voting members, remove
them one at a time.

.. example:: Example 1

   You have a four-node replica set. All nodes are voting members. You can
   remove only one node, which preserves the majority of three out of four
   voting nodes. You can remove another node from the remaining 
   three-node replica set afterward. This preserves the majority of the 
   remaining voting nodes.

.. example:: Example 2
   
   You have a four-node replica set. Three nodes are voting members and 
   one node is a non-voting member. You can remove one voting member 
   and one non-voting member at the same time. This preserves the 
   majority of two out of three voting nodes.

To learn more about voting, see :ref:`Replica Set High Availability <replica-set-failover-administration>` and :ref:`Replica Set Elections <replica-set-election-internals>`.