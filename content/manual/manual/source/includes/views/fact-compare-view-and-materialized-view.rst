MongoDB provides two different view types: **standard views** and
**on-demand materialized views**. Both view types return the results
from an aggregation pipeline.

- Standard views are computed when you read the view, and are not stored
  to disk.

- On-demand materialized views are stored on and read from disk. They
  use a :pipeline:`$merge` or :pipeline:`$out` stage to update the saved
  data. 

  .. note:: 

     When using :pipeline:`$merge`, you can use :ref:`change streams
     <changeStreams>` to watch for changes on the materialized view.
     When using :pipeline:`$out`, you can't watch for changes on the
     materialized view. 

Indexes
~~~~~~~

Standard views use the indexes of the underlying collection. As a
result, you cannot create, drop or re-build general indexes on a standard view
directly, nor get a list of general indexes on the view. 

MongoDB stores search indexes and vector search indexes on disk. Accordingly,
you can create :atlas:`{+fts+} indexes
</atlas-search/transform-documents-collections/>` and :atlas:`{+avs+}
indexes </atlas-vector-search/transform-documents-collections/>` on compatible
views that contain only the following stages:

- :pipeline:`$addFields`
- :pipeline:`$set`
- :pipeline:`$match` wrapping an :query:`$expr` operation

You can also create indexes directly on on-demand materialized views because
MongoDB stores those indexes on disk. 

Performance
~~~~~~~~~~~

On-demand materialized views provide better read performance than
standard views because they are read from disk instead of computed as
part of the query. This performance benefit increases based on the
complexity of the pipeline and size of the data being aggregated.
