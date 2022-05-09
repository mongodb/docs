Starting in version 6.0, MongoDB can use the :ref:`slot-based execution
query engine <5.1-rel-notes-sbe>` to execute :pipeline:`$lookup` stages
if *all* preceding stages in the pipeline can also be executed by the
|sbe-short| and none of the following conditions are true:

- The ``$lookup`` operation executes a pipeline on a joined collection.
  To see an example of this kind of operation, see
  :ref:`lookup-syntax-let-pipeline`.

- The ``$lookup``'s ``localField`` or ``foreignField`` specify numeric
  components. For example: ``{ localField: "restaurant.0.review" }``.

- The ``from`` field of any ``$lookup`` in the pipeline specifies a view
  or sharded collection.
