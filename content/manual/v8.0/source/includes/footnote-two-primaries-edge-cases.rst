In :ref:`some circumstances <edge-cases>`, two nodes in a replica set
may *transiently* believe that they are the primary, but at most, one
of them will be able to complete writes with :writeconcern:`{ w:
"majority" } <"majority">` write concern. The node that can complete
:writeconcern:`{ w: "majority" } <"majority">` writes is the current
primary, and the other node is a former primary that has not yet
recognized its demotion, typically due to a :term:`network partition`.
When this occurs, clients that connect to the former primary may
observe stale data despite having requested read preference
:readmode:`primary`, and new writes to the former primary will
eventually roll back.
