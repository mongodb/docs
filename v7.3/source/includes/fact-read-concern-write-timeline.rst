Consider the following timeline of a write operation Write\ :sub:`0` to
a three member replica set:

.. note::

   For simplification, the example assumes:

   - All writes prior to Write\ :sub:`0` have been successfully
     replicated to all members.

   - Write\ :sub:`prev` is the previous write before Write\ :sub:`0`.

   - No other writes have occured after Write\ :sub:`0`. 

.. figure:: /images/read-concern-write-timeline.svg
   :alt: Timeline of a write operation to a three member replica set.
   :figwidth: 330px

.. list-table::
   :header-rows: 1
   :widths: 10 45 25 25

   * - Time
     - Event
     - Most Recent Write
     - Most Recent w: "majority" write

   * - t\ :sub:`0`
     - Primary applies Write\ :sub:`0`

     - | **Primary**: Write\ :sub:`0`
       | **Secondary**\ :sub:`1`: Write\ :sub:`prev`
       | **Secondary**\ :sub:`2`: Write\ :sub:`prev`

     - | **Primary**: Write\ :sub:`prev`
       | **Secondary**\ :sub:`1`: Write\ :sub:`prev`
       | **Secondary**\ :sub:`2`: Write\ :sub:`prev`



   * - t\ :sub:`1`
     - Secondary\ :sub:`1` applies write\ :sub:`0`

     - | **Primary**: Write\ :sub:`0`
       | **Secondary**\ :sub:`1`: Write\ :sub:`0`
       | **Secondary**\ :sub:`2`: Write\ :sub:`prev`
   

     - | **Primary**: Write\ :sub:`prev`
       | **Secondary**\ :sub:`1`: Write\ :sub:`prev`
       | **Secondary**\ :sub:`2`: Write\ :sub:`prev`

   * - t\ :sub:`2`
     - Secondary\ :sub:`2` applies write\ :sub:`0`
     - | **Primary**: Write\ :sub:`0`
       | **Secondary**\ :sub:`1`: Write\ :sub:`0`
       | **Secondary**\ :sub:`2`: Write\ :sub:`0`
   

     - | **Primary**: Write\ :sub:`prev`
       | **Secondary**\ :sub:`1`: Write\ :sub:`prev`
       | **Secondary**\ :sub:`2`: Write\ :sub:`prev`

   * - t\ :sub:`3`
     - Primary is aware of successful replication to Secondary\ :sub:`1` and sends acknowledgment to client
     - | **Primary**: Write\ :sub:`0`
       | **Secondary**\ :sub:`1`: Write\ :sub:`0`
       | **Secondary**\ :sub:`2`: Write\ :sub:`0`

     - | **Primary**: Write\ :sub:`0`
       | **Secondary**\ :sub:`1`: Write\ :sub:`prev`
       | **Secondary**\ :sub:`2`: Write\ :sub:`prev`

   * - t\ :sub:`4`
     - Primary is aware of successful replication to Secondary\ :sub:`2`

     - | **Primary**: Write\ :sub:`0`
       | **Secondary**\ :sub:`1`: Write\ :sub:`0`
       | **Secondary**\ :sub:`2`: Write\ :sub:`0`

     - | **Primary**: Write\ :sub:`0`
       | **Secondary**\ :sub:`1`: Write\ :sub:`prev`
       | **Secondary**\ :sub:`2`: Write\ :sub:`prev`

   * - t\ :sub:`5`
     - Secondary\ :sub:`1` receives notice (through regular replication mechanism) to update its snapshot of its most recent w: "majority" write

     - | **Primary**: Write\ :sub:`0`
       | **Secondary**\ :sub:`1`: Write\ :sub:`0`
       | **Secondary**\ :sub:`2`: Write\ :sub:`0`

     - | **Primary**: Write\ :sub:`0`
       | **Secondary**\ :sub:`1`: Write\ :sub:`0`
       | **Secondary**\ :sub:`2`: Write\ :sub:`prev`

   * - t\ :sub:`6`
     - Secondary\ :sub:`2` receives notice (through regular replication mechanism) to update its snapshot of its most recent w: "majority" write

     - | **Primary**: Write\ :sub:`0`
       | **Secondary**\ :sub:`1`: Write\ :sub:`0`
       | **Secondary**\ :sub:`2`: Write\ :sub:`0`

     - | **Primary**: Write\ :sub:`0`
       | **Secondary**\ :sub:`1`: Write\ :sub:`0`
       | **Secondary**\ :sub:`2`: Write\ :sub:`0`
