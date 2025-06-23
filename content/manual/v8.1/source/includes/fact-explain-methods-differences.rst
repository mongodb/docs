:method:`db.collection.explain().find() <db.collection.explain()>` is similar to
:method:`db.collection.find().explain() <cursor.explain()>` with the
following key differences:

- The :method:`db.collection.explain().find() <db.collection.explain()>` construct allows for the
  additional chaining of query modifiers. For list of query modifiers,
  see :ref:`db.collection.explain().find().help() <explain-method-help>`.

- The :method:`db.collection.find().explain() <db.collection.explain()>` returns
  the ``explain()`` information on the query plan.
  