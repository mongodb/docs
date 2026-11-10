Optional. Specifies a :ref:`resume token <change-stream-resume>` as the
logical starting point for the change stream. Cannot be used to resume
the change stream after an :data:`invalidate` event.

``resumeAfter`` is mutually exclusive with ``startAfter`` and
``startAtOperationTime``.
