To delete an |fts| index through {+mongosh+}, use 
the :method:`db.collection.dropSearchIndex() 
<db.collection.dropSearchIndex()>` method.

The command has the following syntax:

.. code-block:: javascript
   :copyable: true

   db.<collection>.dropSearchIndex("<index-name>")

Example
~~~~~~~

The following command deletes a search
index named ``default`` from the ``movies`` collection:

.. code-block:: javascript
   :copyable: true

   db.movies.dropSearchIndex("default")

.. note:: 

   The ``db.collection.dropSearchIndex()`` command doesn't 
   return an output. You can use the {+atlas-ui+} to
   view the :ref:`index status <node-status-ref>`.
   