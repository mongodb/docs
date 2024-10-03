Optional. Default: ``true``.

If ``true``, the operations are executed one at a time in the specified
order (i.e. serially). If an error occurs while processing an
*ordered* operation, the entire bulk operation returns without
processing the remaining operations in the list.

If ``false``, the operations are executed independently and may be
processed in parallel. If an error occurs while processing an
*unordered* operation, MongoDB continues to process remaining write
operations in the list.

.. note::
   
   Unordered operations are theoretically faster since MongoDB can
   execute them in parallel, but should only be used if the writes do
   not depend on order.
