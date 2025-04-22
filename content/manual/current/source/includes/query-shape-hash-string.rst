A query shape hash is a string that uniquely identifies the query shape.
An example query shape hash is
``"F42757F1AEB68B4C5A6DE6182B29B01947C829C926BCC01226BDA4DDE799766C"``.

To obtain the query shape hash string, do any of these:

- Use a :pipeline:`$querySettings` stage in an :ref:`aggregation
  pipeline <aggregation-pipeline>` and examine the ``queryShapeHash``
  field.
- Examine the :ref:`database profiler <database-profiling>` output.
- View the :ref:`slow query logs <log-message-slow-ops>`.

If you set the query settings using a hash string, then you won't have
the ``representativeQuery`` field in the ``$querySettings`` aggregation
stage output.
