Each stream processor has a maximum cumulative parallelism value
determined by its tier. The cumulative parallelism of a stream
processor is calculated as follows:

``parallelism total - parallelized stages``

Where ``parallelism total`` is the sum of all ``parallelism`` values
greater than 1 across the :pipeline:`$source`, :ref:`$lookup
<atlas-sp-agg-lookup>`, and :ref:`$merge <atlas-sp-agg-merge>` stages,
and ``parallelized stages`` is the number of these stages with
``parallelism`` values greater than ``1``.

For example, if your ``$source`` stage sets a ``parallelism`` value of
``4``, your ``$lookup`` stage sets no ``parallelism`` value (thus
defaulting to ``1``), and your ``$merge`` stage sets a ``parallelism``
value of ``2``, then you have two ``parallelized stages``, and the
cumulative parallelism of your stream processor is calculated as
``(4 + 2) - 2``.

If a stream processor exceeds the maximum cumulative parallelism for
its tier, {+atlas-sp+} throws an error and advises you of the minimum
processor tier required for your intended level of parallelism. You
must either scale the processor up to a higher tier or lower the
parallelism values of your stages to resolve the error. To learn more,
see :ref:`<stream-processing-costs>`.
