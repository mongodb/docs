.. warning::

   When using :method:`db.collection.copyTo()` check field types to
   ensure that the operation does not remove type information from
   documents during the translation from :term:`BSON` to
   :term:`JSON`. Consider using :method:`~db.cloneCollection()`
   to maintain type fidelity.
