Verify that your data is transferred to the destination {+cluster+} using
one of the following verification strategies. Use the following verification
methods only after you ensure that the source or destination {+clusters+}
are **NOT** writing data.

- Use the :manual:`db.collection.countDocuments() </reference/method/db.collection.countDocuments/>`
  method on each collection on the source and the destination {+clusters+}
  to obtain document counts and compare them between the {+clusters+}.
- Write a script that queries collections on the source {+cluster+}
  and then checks that the correct documents, indexes, collections,
  metadata, and views exist with the same values on the destination {+cluster+}.
  In the script, use the following commands on the source and destination {+clusters+}:

  - To verify the transfer of indexes and compare the results, use
    the :manual:`db.collection.getIndexes() </reference/method/db.collection.getIndexes/>` method.
  - To verify the transfer of metadata and compare the results, use
    the :manual:`db.getCollectionInfos() </reference/method/db.getCollectionInfos/>`
    method.