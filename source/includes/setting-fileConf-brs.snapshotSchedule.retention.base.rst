.. setting:: brs.snapshotSchedule.retention.base

   *Type*: integer

   *Default*: 2

   
   Specifies how many days an interval snapshot is stored. The accepted
   values vary depending upon the value of :setting:`brs.snapshotSchedule.interval`:
   
   .. list-table::
      :widths: 40 60
   
      * - :setting:`brs.snapshotSchedule.interval`
        - Accepted Values
      * - < ``24``
        - ``2``, ``3``, ``4``, or ``5``.
      * - = ``24``
        - ``2``, ``3``, ``4``, ``5``, ``6``, ``7``, ``8``, ``9``, ``10``, ``11``, ``12``, ``13``, ``14``, ``15``, ``16``, ``17``, ``18``, ``19``, ``20``, ``21``, ``22``, ``23``, ``24``, ``25``, ``26``, ``27``, ``28``, ``29``, ``30``.
   
   Corresponds to ``.Base Retention of Snapshots``
   

