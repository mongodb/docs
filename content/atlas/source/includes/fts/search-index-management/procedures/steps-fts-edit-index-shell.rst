To edit an |fts| index through {+mongosh+}, use 
the :method:`db.collection.updateSearchIndex() 
<db.collection.updateSearchIndex()>` method.

The command has the following syntax.
Specify the name of the index that you want to edit 
and define the new index definition. This definition 
replaces the index's existing definition. To learn more,
see :ref:`ref-index-definitions`.

.. code-block:: javascript
   :copyable: true

   db.<collection>.updateSearchIndex(
        "<index-name>",
        /* updated search index definition */
   )

Example
~~~~~~~

The following command updates a search
index named ``default`` from the ``movies`` collection 
to use :ref:`static mappings <static-dynamic-mappings>`:

.. code-block::
   :copyable: true

   db.movies.updateSearchIndex(
       "default",
       {
           "mappings": {
           "dynamic": false,
           "fields": {
               "<field-name>": {
                    "type": "<field-type>"
               }
           }
       }
   )   

.. note:: 
   
   The ``db.collection.updateSearchIndex()`` command doesn't 
   return an output. You can use the {+atlas-ui+} to view the 
   :ref:`index status <node-status-ref>`.
