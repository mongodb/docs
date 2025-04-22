.. For any pipeline stage that has a memory limit, the operation
   will produce an error if exceeds its memory limit. Currently, only
   $sort and $group have a limit.

.. FYI -- 2.5.3 introduced the limit to $group and changed the limit for
   $sort from 10% to 100 MB.

Pipeline stages have a limit of 100 MiB (100 * 1024 * 1024 bytes) of
RAM. If a stage exceeds this limit, MongoDB will produce an error. To
allow for the handling of large datasets, you can set the
:ref:`allowDiskUse <method-aggregate-allowDiskUse>` option in the
:method:`~db.collection.aggregate()` method. The :ref:`allowDiskUse
<method-aggregate-allowDiskUse>` option enables most aggregation
pipeline operations to write data to a temporary file. The exceptions
to the :ref:`allowDiskUse <method-aggregate-allowDiskUse>` option are the
following aggregation operations; these operations must stay within the
memory restriction limit:

- :pipeline:`$graphLookup` stage

- :group:`$addToSet` accumulator expression used in the
  :pipeline:`$group` stage (Starting in version 3.6.17)
  
- :group:`$push` accumulator expression used in the
  :pipeline:`$group` stage (Starting in version 3.6.17)

If the pipeline includes other stages that observe :ref:`allowDiskUse:
true <method-aggregate-allowDiskUse>` in the
:method:`~db.collection.aggregate()` operation, :ref:`allowDiskUse:
true <method-aggregate-allowDiskUse>` option is in effect for these
other stages.

.. seealso:: :ref:`sort-memory-limit` and :ref:`group-memory-limit`.
