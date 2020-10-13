:method:`db.collection.explain().find() <db.collection.explain()>` is similar to
:method:`db.collection.find().explain() <cursor.explain()>` with the
following key differences:

- The :method:`db.collection.explain().find() <db.collection.explain()>` construct allows for the
  additional chaining of query modifiers. For list of query modifiers,
  see :ref:`db.collection.explain().find().help() <explain-method-help>`.

- The :method:`db.collection.explain().find() <db.collection.explain()>` returns a cursor, which
  requires a call to ``.next()``, or its alias ``.finish()``, to return
  the ``explain()`` results.
  If run interactively in the :binary:`~bin.mongo` shell, the
  :binary:`~bin.mongo` shell automatically calls ``.finish()`` to return
  the results. For scripts, however, you must explicitly call
  ``.next()``, or ``.finish()``, to return the results. For list of
  cursor-related methods, see
  :ref:`db.collection.explain().find().help() <explain-method-help>`.
