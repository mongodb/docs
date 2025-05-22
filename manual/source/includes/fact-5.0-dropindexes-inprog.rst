The :method:`db.collection.dropIndexes()` command cannot drop 
:ref:`ready indexes <index-build-process-ready>` 
if there are any in-progress index builds.

- In versions 4.4.0-4.4.4 of MongoDB, this logic was not true 
  due to a bug.