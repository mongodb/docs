.. FYI -- 2.5.3 introduced the limit to $group and changed the limit for
   $sort from 10% to 100 MB.

Each individual pipeline stage has a limit of 100 megabytes of RAM. By
default, if a stage exceeds this limit, MongoDB produces an error. For
some pipeline stages you can allow pipeline processing to take up more
space by using the :ref:`allowDiskUse <cmd-aggregate-allowDiskUse>`
option to enable aggregation pipeline stages to write data to temporary
files.

The :pipeline:`$search` aggregation stage is not restricted to 
100 megabytes of RAM because it runs in a separate process.

Examples of stages that can spill to disk when :ref:`allowDiskUse
<cmd-aggregate-allowDiskUse>` is ``true`` are:

- :pipeline:`$bucket`
- :pipeline:`$bucketAuto`
- :pipeline:`$group`
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
