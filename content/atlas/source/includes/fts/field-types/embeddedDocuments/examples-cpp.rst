Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst

.. collapsible::
   :heading: Basic Example
   :sub_heading: Automatically index all dynamically indexable fields inside the array of objects.
   :expanded: false

   .. include:: /includes/fts/field-types/embeddedDocuments/basic-example-description.rst

   .. literalinclude:: /includes/fts/field-types/embeddedDocuments/create-index-basic.cpp
      :language: cpp
      :linenos:
      :copyable: true 

.. collapsible::
   :heading: Dynamic Index Example
   :sub_heading: Combine dynamic mappings with static mappings to index nested fields as different field types.
   :expanded: false

   Enable Dynamic Indexing  
   ~~~~~~~~~~~~~~~~~~~~~~~

   .. include:: /includes/fts/field-types/embeddedDocuments/dynamic-example-description.rst

   .. literalinclude:: /includes/fts/field-types/embeddedDocuments/create-index-dynamic.cpp
      :language: cpp
      :linenos:
      :copyable: true 

   Configure Dynamic Indexing 
   ~~~~~~~~~~~~~~~~~~~~~~~~~~

   .. include:: /includes/fts/field-types/embeddedDocuments/typeset-example-description.rst

   .. literalinclude:: /includes/fts/field-types/embeddedDocuments/configure-dynamic-index.cpp
      :language: cpp
      :linenos:
      :copyable: true 

.. collapsible::
   :heading: Specified Fields Example
   :sub_heading: Index only specific fields in the array of objects. 
   :expanded: false

   .. include:: /includes/fts/field-types/embeddedDocuments/specified-fields-example-description.rst

   .. literalinclude:: /includes/fts/field-types/embeddedDocuments/create-index-specified.cpp
      :language: cpp
      :linenos:
      :copyable: true
