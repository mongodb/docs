Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst

The following index definition for the ``sample_mflix.movies`` collection
indexes the ``awards`` field as the ``document`` type. It also configures
|fts| to automatically index all the dynamically indexable fields inside the
``awards`` object.

.. literalinclude:: /includes/fts/field-types/document/create-index-mongosh.js
   :language: javascript
   :linenos:
   :copyable: true 