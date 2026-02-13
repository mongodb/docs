.. _timeseries-secondary-index-sort-performance:

Use Secondary Indexes to Improve Sort Performance
-------------------------------------------------

Consider a weather data collection with the following configuration:

.. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/SecondaryIndexes.snippet.secondary-create-collection.java
    :language: java
    :category: syntax example

In each weather data document, the ``metadata`` field value is a
subdocument with fields for the weather sensor's ID, type, and location:

.. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/SecondaryIndexes.snippet.secondary-data-schema.java
    :language: java
    :category: syntax example

The default compound index for the collection indexes the entire
``metadata`` subdocument, so the index is only used with
:expression:`$eq` queries. By indexing specific ``metadata`` fields, you
improve query performance for other query types. 

For example, this :expression:`$in` query benefits from a secondary index on 
``metadata.type``:

.. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/SecondaryIndexes.snippet.simple-in-example.java
    :language: java
    :category: syntax example

Sort operations on time series collections can use secondary indexes 
on the ``timeField`` field. Under certain conditions, sort operations can also 
use compound secondary indexes on the ``metaField`` and 
``timeField`` fields.

The aggregation pipeline uses the :pipeline:`$match` and 
:pipeline:`$sort` stages to determine which indexes a time series collection can
use. An index can be used in the following scenarios: 

- A sort on ``{ <timeField>: ±1 }`` uses a secondary index on 
  ``<timeField>``.
- A sort on ``{ <metaField>: ±1, timeField: ±1 }`` uses the default
  compound index on ``{ <metaField>: ±1, timeField: ±1 }``.
- A sort on ``{ <timeField>: ±1 }`` uses a secondary index on 
  ``{ metaField: ±1, timeField: ±1 }`` when there is a point predicate 
  on ``<metaField>``.

For example, the following ``sensorData`` collection contains 
measurements from weather sensors:

.. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/SecondaryIndexes.snippet.secondary-data.java
    :language: java
    :category: syntax example

Create a secondary single-field index on the ``timestamp`` field:

.. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/SecondaryIndexes.snippet.create-secondary-index.java
    :language: java
    :category: syntax example

The following sort operation on the ``timestamp`` field uses the 
Secondary Index to improve performance:

.. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/SecondaryIndexes.snippet.sort-with-secondary-index.java
    :language: java
    :category: syntax example
    :emphasize-lines: 7

To confirm that the sort operation used the Secondary Index, run the 
operation again with the ``explain`` option:

.. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/SecondaryIndexes.snippet.sort-with-secondary-index-explain.java
    :language: java
    :category: syntax example


Last Point Queries on Time Series Collections
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In time series data, a last point query returns the data point with the
latest timestamp for a given field. For time series collections, a last
point query fetches the latest measurement for each unique metadata
value. For example, you may want to get the latest temperature reading
from all sensors. Improve performance on last point queries by creating
any of the following indexes:

.. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/SecondaryIndexes.snippet.last-point-indexes.java
    :language: java
    :category: syntax example

.. note::

    Last point queries are most performant when they use the :ref:`DISTINCT_SCAN 
    optimization <explain-results>`. This optimization is only available when an 
    index on ``timeField`` is descending.

The following command creates a compound secondary index on ``metaField``
(ascending) and ``timeField`` (descending): 

.. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/SecondaryIndexes.snippet.last-point-index-meta-up-time-down.java
    :language: java
    :category: syntax example
    :emphasize-lines: 2-3

The following last point query example uses the descending ``timeField`` 
compound secondary index created above:

.. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/SecondaryIndexes.snippet.sort-and-group.java
    :language: java
    :category: syntax example
    :emphasize-lines: 2-4

To confirm that the last point query used the secondary index, run the operation
again using ``explain``:

.. io-code-block::
   :copyable: true

   .. input:: /code-examples/tested/java/driver-sync/timeseries/SecondaryIndexes.snippet.sort-and-group-explain.java
      :language: java

   .. output:: /code-examples/tested/java/driver-sync/timeseries/OutputFiles/SecondaryIndexExplainOutput.txt
      :visible: true
      :emphasize-lines: 11

If the ``queryPlanner.winningPlan.inputStage.stage`` is either ``CLUSTERED_IXSCAN``
or ``IXSCAN``, the index was used. For more information on the explain plan output, 
see :ref:`explain-results`.

Specify Index Hints for Time Series Collections
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

Index hints cause MongoDB to use a specific index for a query. Some
operations on time series collections can only take advantage of an
index if that index is specified in a hint.

For example, the following query causes MongoDB to use the
index we just created:

.. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/SecondaryIndexes.snippet.hint.java
    :language: java
    :category: syntax example
    :emphasize-lines: 12-14

On a time series collection, you can specify hints using either the
index name or the index key pattern. To get the names of the indexes on
a collection, use the :method:`db.collection.getIndexes()` method.

Create 2dsphere Indexes
~~~~~~~~~~~~~~~~~~~~~~~

Starting in version 6.0 you can create 2dsphere indexes on the
``timeField``, ``metaField``, or measurement fields. For example, the following 
operation creates a 2dsphere index on the ``location`` field:

.. literalinclude:: /code-examples/tested/java/driver-sync/timeseries/SecondaryIndexes.snippet.create-geospatial-index-location.java
    :language: java
    :category: syntax example

.. note::

    .. include:: /includes/time-series-secondary-indexes-downgrade-FCV.rst
