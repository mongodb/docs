The ``w`` component of the write concern, which requests acknowledgment that the write
operation has propagated to a specified number of MongoDB instances. The default
value is ``"majority"`` or ``1``, depending on the number of arbiters and voting nodes.
To learn more about the ``w`` option, see :manual:`Write Concern </reference/write-concern/#std-label-wc-w>`
in the {+mdb-server+} manual.