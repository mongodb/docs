To delete a |fts| index through {+mongosh+}, use 
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

.. |method| replace:: ``db.collection.dropSearchIndex()``

.. include:: /includes/fact-view-index-status.rst
