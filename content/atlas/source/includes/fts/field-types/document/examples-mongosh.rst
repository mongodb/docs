Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst

.. collapsible::
   :heading: Index Dynamically Using Default typeSet
   :sub_heading: Enables dynamic mappings to index all dynamically indexable field types.
   :expanded:

   The following index definition for the ``sample_mflix.movies`` collection
   indexes the ``awards`` field as the ``document`` type. It also configures
   |fts| to automatically index all the dynamically indexable fields inside the
   ``awards`` object.

   .. literalinclude:: /includes/fts/field-types/document/create-index-mongosh.js
      :language: javascript
      :linenos:
      :copyable: true 

.. collapsible::
   :heading: Index Dynamically Using Configured typeSet
   :sub_heading: Configures field types to dynamically index.
   :expanded:

   The following index definition for the ``sample_mflix.movies`` collection
   indexes the ``awards`` field as the ``document`` type. It references
   the ``typeSet`` name, ``onlyNumbers``. The field type definition
   named ``onlyNumbers`` enables automatic indexing for only fields of
   type ``number`` in the ``awards`` document.

   .. literalinclude:: /includes/fts/field-types/document/configure-dynamic-index-mongosh.js
      :language: javascript
      :linenos:
      :copyable: true 
