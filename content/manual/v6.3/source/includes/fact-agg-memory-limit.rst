.. FYI -- 2.5.3 introduced the limit to $group and changed the limit for
   $sort from 10% to 100 MB.

Starting in MongoDB 6.0, the :parameter:`allowDiskUseByDefault` 
parameter controls whether pipeline stages that require more than 100 
megabytes of memory to execute write temporary files to disk by 
default.

- If :parameter:`allowDiskUseByDefault` is set to ``true``, pipeline
  stages that require more than 100 megabytes of memory to execute 
  write temporary files to disk by default. You can disable writing 
  temporary files to disk for specific ``find`` or ``aggregate`` 
  commands using the ``{ allowDiskUse: false }`` option.

- If :parameter:`allowDiskUseByDefault` is set to ``false``, pipeline
  stages that require more than 100 megabytes of memory to execute 
  raise an error by default. You can enable writing temporary files to 
  disk for specific ``find`` or ``aggregate`` using 
  the ``{ allowDiskUse: true }`` option.

The :pipeline:`$search` aggregation stage is not restricted to 
100 megabytes of RAM because it runs in a separate process.

Examples of stages that can write temporary files to disk when 
:ref:`allowDiskUse <aggregate-cmd-allowDiskUse>` is ``true`` are:

- :pipeline:`$bucket`
- :pipeline:`$bucketAuto`
- :pipeline:`$group`
- :pipeline:`$setWindowFields`
- :pipeline:`$sort` when the sort operation is not supported by an
  index
- :pipeline:`$sortByCount`

.. note::

   Pipeline stages operate on streams of documents with each pipeline
   stage taking in documents, processing them, and then outputing the
   resulting documents.

   Some stages can't output any documents until they have processed all
   incoming documents. These pipeline stages must keep their stage
   output in RAM until all incoming documents are processed. As a
   result, these pipeline stages may require more space than the 100 MB
   limit.

If the results of one of your :pipeline:`$sort` pipeline stages exceed
the limit, consider :ref:`adding a $limit stage <sort-limit-sequence>`.

.. include:: /includes/extracts/4.2-changes-usedDisk.rst
