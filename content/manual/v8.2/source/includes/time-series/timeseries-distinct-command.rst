Due to the unique data structure of time series collections, MongoDB can't
efficiently index them for distinct values. Avoid using the
:dbcommand:`distinct` command or :method:`db.collection.distinct()` helper
method on time series collections. Instead, use a :pipeline:`$group` 
aggregation to group documents by distinct values. 

For example, to query for distinct ``meta.type`` values on documents
where ``meta.project = 10``, instead of:

.. code-block:: javascript
   :copyable: false

   db.foo.distinct("meta.type", {"meta.project": 10})

Use:

.. code-block:: javascript

   db.foo.createIndex({"meta.project":1, "meta.type":1})
   db.foo.aggregate([{$match: {"meta.project": 10}},
                     {$group: {_id: "$meta.type"}}])

This works as follows:

#. Creating a :ref:`compound index <index-type-compound>` on ``meta.project``
   and ``meta.type`` and supports the aggregation. 

#. The :pipeline:`$match` stage filters for documents where ``meta.project = 10``.

#. The :pipeline:`$group` stage uses ``meta.type`` as the group key to output
   one document per unique value.