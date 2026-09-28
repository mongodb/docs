Due to the unique data structure of time series collections, MongoDB can't
efficiently index them for distinct values. Avoid using the
:dbcommand:`distinct` command or :method:`db.collection.distinct()` helper
method on time series collections. Instead, use a :pipeline:`$group` 
aggregation to group documents by distinct values, as shown in the following 
example:

.. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/Limitations.snippet.agg-pipeline-for-distinct.java
    :language: java
    :category: syntax example

This works as follows:

#. Creating a :ref:`compound index <index-type-compound>` on ``meta.project``
   and ``meta.type`` and supports the aggregation. 

#. The :pipeline:`$match` stage filters for documents where ``meta.project = 10``.

#. The :pipeline:`$group` stage uses ``meta.type`` as the group key to output
   one document per unique value.
