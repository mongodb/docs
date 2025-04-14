
.. note::

   You cannot use ``resumeAfter`` to resume a change stream after an
   :ref:`invalidate event <change-event-invalidate>` (for example, a collection
   drop or rename) closes the stream. Instead, you can use 
   :ref:`startAfter <change-stream-start-after>` to start a new change
   stream after an :ref:`invalidate event <change-event-invalidate>`.

