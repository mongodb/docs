Starting in version 4.4, you can run validation in the :ref:`background
<cmd-validate-background>` for the :doc:`WiredTiger </core/wiredtiger>`
storage engine. When run in background mode, the validation only
checks data that has been :ref:`checkpointed
<storage-wiredtiger-checkpoints>`.

If a collection:

- Has not yet been checkpointed, then the background validation returns
  successfully but includes a :data:`warning <validate.warnings>`; i.e.
  the output includes :data:`ok: 1 <validate.ok>`, :data:`valid: true
  <validate.valid>`, and a warning in the :data:`~validate.warnings`
  array.

- Has been checkpointed but is dropped during the validation,
  background validation returns an error in the :data:`validate.errors`
  field.

If an index:

- Has not yet been checkpointed, then background validation ignores the
  index.

- Has been checkpointed and then dropped, but the drop has not yet been
  checkpointed, then background validation ignores the index unless the
  drop occurs while the validation process is checking the index.
  
  | If the drop occurs while the validation process is checking
    the index, then background index returns an error in the
    :data:`validate.errors` field.

For more information on WiredTiger and checkpoints, see
:ref:`storage-wiredtiger-checkpoints`.
