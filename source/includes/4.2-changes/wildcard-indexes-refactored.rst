Consider an application that captures user-defined data under the
``userMetadata`` field and supports querying against that data:

.. code-block:: javascript
   :copyable: false

   { "userMetadata" : { "likes" : [ "dogs", "cats" ] } }
   { "userMetadata" : { "dislikes" : "pickles" } }
   { "userMetadata" : { "age" : 45 } }
   { "userMetadata" : "inactive" }

Administrators want to create indexes to support queries on any
subfield of ``userMetadata``.

A wildcard index on ``userMetadata``
can support single-field queries on ``userMetadata``,
``userMetadata.likes``, ``userMetadata.dislikes``, and
``userMetadata.age``:

.. code-block:: bash

   db.userData.createIndex( { "userMetadata.$**" : 1 } )

The index can support the following queries:

.. code-block:: bash
   :copyable: false

   db.userData.find({ "userMetadata.likes" : "dogs" })
   db.userData.find({ "userMetadata.dislikes" : "pickles" })
   db.userData.find({ "userMetadata.age" : { $gt : 30 } })
   db.userData.find({ "userMetadata" : "inactive" })

A non-wildcard index on ``userMetadata`` can only support queries on
values of ``userMetadata``.

.. important::

   Wildcard indexes are not designed to replace workload-based index
   planning. For more information on creating indexes to support
   queries, see :ref:`create-indexes-to-support-queries`. For 
   complete documentation on wildcard index limitations, see 
   :ref:`wildcard-index-restrictions`.


The :binary:`~bin.mongod` 
:ref:`featureCompatibilityVersion <view-fcv>` must be ``4.2`` to
create wildcard indexes. For instructions on setting the FCV, see 
:ref:`Setting the FCV <set-fcv>`.
