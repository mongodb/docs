Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst
   
.. tabs::  

   .. tab:: Basic Example
      :tabid: example-1

      Create an index with the autocomplete field type to enable type-ahead functionality.

      .. literalinclude:: /includes/fts/field-types/autocomplete/create_index_basic.go
         :language: go
         :linenos:
         :copyable: true 

   .. tab:: Multiple Fields Example
      :tabid: example-2

      .. literalinclude:: /includes/fts/field-types/autocomplete/create_index_multiple_fields.go
         :language: go
         :linenos:
         :copyable: true 

   .. tab:: Email Example
      :tabid: example-3

      .. literalinclude:: /includes/fts/field-types/autocomplete/create_index_email_example.go
         :language: go
         :linenos:
         :copyable: true
