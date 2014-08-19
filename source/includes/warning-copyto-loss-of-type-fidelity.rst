.. warning::

   When using :method:`db.collection.copyTo()` check field types to
   ensure that the operation does not remove type information from
   documents during the translation from :term:`BSON` to
   :term:`JSON`. Consider using :method:`~db.cloneCollection()`
   to maintain type fidelity.

   The :method:`db.collection.copyTo()` command uses the :dbcommand:`eval`
   command internally. As a result, the :method:`db.collection.copyTo()`
   command takes a global lock that blocks all other read and write
   operations until the :method:`db.collection.copyTo()` command completes.

