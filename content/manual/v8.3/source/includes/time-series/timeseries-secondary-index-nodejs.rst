.. _timeseries-secondary-index-sort-performance:

Use Secondary Indexes to Improve Sort Performance
-------------------------------------------------

Consider a weather data collection with the following configuration:

.. literalinclude:: /code-examples/tested/javascript/driver/time-series/secondary-indexes/secondary-indexes.snippet.secondary-create-collection.js
    :language: javascript
    :category: syntax example

In each weather data document, the ``metadata`` field value is a
subdocument with fields for the weather sensor's ID, type, and location:

.. literalinclude:: /code-examples/tested/javascript/driver/time-series/secondary-indexes/secondary-indexes.snippet.secondary-data-schema.js
    :language: javascript
    :category: syntax example

The default compound index for the collection indexes the entire
``metadata`` subdocument, so the index is only used with
:expression:`$eq` queries. By indexing specific ``metadata`` fields, you
improve query performance for other query types. 

For example, this :expression:`$in` query benefits from a secondary index on 
``metadata.type``:

.. literalinclude:: /code-examples/tested/javascript/driver/time-series/secondary-indexes/secondary-indexes.snippet.simple-in-example.js
    :language: javascript
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

.. literalinclude:: /code-examples/tested/javascript/driver/time-series/secondary-indexes/secondary-indexes.snippet.secondary-data.js
    :language: javascript
    :category: syntax example

Create a secondary single-field index on the ``timestamp`` field:

.. literalinclude:: /code-examples/tested/javascript/driver/time-series/secondary-indexes/secondary-indexes.snippet.create-secondary-index.js
    :language: javascript
    :category: syntax example

The following sort operation on the ``timestamp`` field uses the 
Secondary Index to improve performance:

.. literalinclude:: /code-examples/tested/javascript/driver/time-series/secondary-indexes/secondary-indexes.snippet.sort-with-secondary-index.js
    :language: javascript
    :category: syntax example
    :emphasize-lines: 1-3

To confirm that the sort operation used the Secondary Index, run the 
operation again with the ``explain`` option:

.. literalinclude:: /code-examples/tested/javascript/driver/time-series/secondary-indexes/secondary-indexes.snippet.sort-with-secondary-index-explain.js
    :language: javascript
    :category: syntax example


Last Point Queries on Time Series Collections
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

In time series data, a last point query returns the data point with the
latest timestamp for a given field. For time series collections, a last
point query fetches the latest measurement for each unique metadata
value. For example, you may want to get the latest temperature reading
from all sensors. Improve performance on last point queries by creating
any of the following indexes:

.. literalinclude:: /code-examples/tested/javascript/driver/time-series/secondary-indexes/secondary-indexes.snippet.last-point-indexes.js
    :language: javascript
    :category: syntax example

.. note::

    Last point queries are most performant when they use the :ref:`DISTINCT_SCAN 
    optimization <explain-results>`. This optimization is only available when an 
    index on ``timeField`` is descending.

The following command creates a compound secondary index on ``metaField``
(ascending) and ``timeField`` (descending): 

.. literalinclude:: /code-examples/tested/javascript/driver/time-series/secondary-indexes/secondary-indexes.snippet.last-point-index-meta-up-time-down.js
    :language: javascript
    :category: syntax example

The following last point query example uses the descending ``timeField`` 
compound secondary index created above:

.. literalinclude:: /code-examples/tested/javascript/driver/time-series/secondary-indexes/secondary-indexes.snippet.sort-and-group.js
    :language: javascript
    :category: syntax example
    :emphasize-lines: 2

To confirm that the last point query used the secondary index, run the operation
again using ``explain``:

.. io-code-block::
   :copyable: true

   .. input:: /code-examples/tested/javascript/driver/time-series/secondary-indexes/secondary-indexes.snippet.sort-and-group-explain.js
      :language: javascript

   .. output:: /code-examples/tested/javascript/driver/time-series/secondary-indexes/secondary-index-explain-output.sh
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

.. literalinclude:: /code-examples/tested/javascript/driver/time-series/secondary-indexes/secondary-indexes.snippet.hint.js
    :language: javascript
    :category: syntax example
    :emphasize-lines: 14

On a time series collection, you can specify hints using either the
index name or the index key pattern. To get the names of the indexes on
a collection, use the :method:`db.collection.getIndexes()` method.

Create 2dsphere Indexes
~~~~~~~~~~~~~~~~~~~~~~~

Starting in version 6.0 you can create 2dsphere indexes on the
``timeField``, ``metaField``, or measurement fields. For example, the following 
operation creates a 2dsphere index on the ``location`` field:

.. literalinclude:: /code-examples/tested/javascript/driver/time-series/secondary-indexes/secondary-indexes.snippet.create-geospatial-index-location.js
    :language: javascript
    :category: syntax example

.. note::

    .. include:: /includes/time-series-secondary-indexes-downgrade-FCV.rst
