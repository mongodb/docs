In some circumstances, two nodes in a replica set may *transiently*
believe that they are the primary, but at most, one of them will be
able to complete writes with :doc:`{w: majority} write concern
</reference/write-concern>`. The node that can complete :doc:`{w:
majority} </reference/write-concern>` writes is the current primary,
and the other node is a former primary that has not yet recognized its
demotion, typically due to a :term:`network partition`. When this
occurs, clients that connect to the former primary may observe stale
data despite having requested read preference :readmode:`primary`.
