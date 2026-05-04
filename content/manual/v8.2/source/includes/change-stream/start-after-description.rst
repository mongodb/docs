Optional. Specifies a :ref:`resume token <change-stream-resume>` as the
logical starting point for the change stream. Unlike ``resumeAfter``,
``startAfter`` can resume notifications after an :data:`invalidate`
event by creating a new change stream.
        
``startAfter`` is mutually exclusive with ``resumeAfter`` and
``startAtOperationTime``.
