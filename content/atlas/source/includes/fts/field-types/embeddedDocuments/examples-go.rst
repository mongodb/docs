Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst

.. tabs::  

   .. tab:: Basic Example
      :tabid: example-1

      .. include:: /includes/fts/field-types/embeddedDocuments/basic-example-description.rst

      .. literalinclude:: /includes/fts/field-types/embeddedDocuments/create-index-basic.go
         :language: go
         :linenos:
         :copyable: true 

   .. tab:: Dynamic Index Example
      :tabid: example-2

      .. include:: /includes/fts/field-types/embeddedDocuments/dynamic-example-description.rst

      .. literalinclude:: /includes/fts/field-types/embeddedDocuments/create-index-dynamic.go
         :language: go
         :linenos:
         :copyable: true 

   .. tab:: Specified Fields Example
      :tabid: example-3

      .. include:: /includes/fts/field-types/embeddedDocuments/specified-fields-example-description.rst

      .. literalinclude:: /includes/fts/field-types/embeddedDocuments/create-index-specified.go
         :language: go
         :linenos:
         :copyable: true
