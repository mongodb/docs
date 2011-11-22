==========================
Replication Info Reference
==========================

The :js:func:`db.getReplicationInfo()` provides current status of the
current replica status. Consider the values of this outut when



All Nodes
---------

.. describe:: logSizeMB

.. describe:: usedMB

Primary Nodes
-------------

.. describe:: errmsg

.. describe:: oplogMainRowCount


::

       {
        "logSizeMB" : 100,
        "usedMB" : 0,
        "errmsg" : "objects not found in local.oplog.$main -- is this a new and empty db instance?",
        "oplogMainRowCount" : 0
       }


Secondary Nodes
---------------

.. describe:: timeDiff

.. describe:: timeDiffHours

.. describe:: tFirst

.. describe:: tLast

.. describe:: now

::

       {
        "logSizeMB" : 100,
        "usedMB" : 0.01,
        "timeDiff" : 0,
        "timeDiffHours" : 0,
        "tFirst" : "Mon Nov 21 2011 14:34:57 GMT-0500 (EST)",
        "tLast" : "Mon Nov 21 2011 14:34:57 GMT-0500 (EST)",
        "now" : "Mon Nov 21 2011 14:47:41 GMT-0500 (EST)"
       }

