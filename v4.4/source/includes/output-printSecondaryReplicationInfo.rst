Example |method| output when run on a replica set with two secondary
members:

.. code-block:: javascript

   source: m1.example.net:27002
       syncedTo: Mon Mar 01 2021 16:30:50 GMT-0800 (PST)
       0 secs (0 hrs) behind the primary
   source: m2.example.net:27003
       syncedTo: Mon Mar 01 2021 16:30:50 GMT-0800 (PST)
       0 secs (0 hrs) behind the primary

.. include:: /includes/note-method-does-not-return-json.rst

A :ref:`delayed member <replica-set-delayed-members>` may show as ``0``
seconds behind the primary when the inactivity period on the primary is
greater than the :rsconf:`members[n].slaveDelay` value.

A member may show a negative time value behind the primary when |method|
is run. This is expected if |method| is run after a secondary replicates
a write that follows a period of inactivity, but before the secondary
receives a heartbeat from the primary with the latest :term:`optime
<optime>`.

.. note::

   The lag reported by secondaries may not be representative of cluster
   health. Negative values do not indicate that the secondary is ahead
   of the primary.

   To obtain the most current status for your replica set, run |method|
   on the primary.
