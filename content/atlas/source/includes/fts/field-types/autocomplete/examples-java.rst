Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst

.. collapsible::
   :heading: Basic Example
   :sub_heading: Index specific field using static mappings as autocomplete type.
   :expanded: false

   .. include:: /includes/fts/field-types/autocomplete/basic-example-description.rst

   .. literalinclude:: /includes/fts/field-types/autocomplete/create_index_basic.java
      :language: java
      :linenos:
      :copyable: true 

.. Not yet supported. See DOCSP-54380
   .. collapsible::
      :heading: Dynamic Index Example
      :sub_heading: Dynamically index string fields as the autocomplete type.
      :expanded: false

      .. include:: /includes/fts/field-types/autocomplete/cdi-example-description.rst

      .. literalinclude:: /includes/fts/field-types/autocomplete/configure_dynamic_index.java
         :language: java
         :linenos:
         :copyable: true 

.. collapsible::
   :heading: Multiple Types Example
   :sub_heading: Index specific field as autocomplete and string types.
   :expanded: false

   .. include:: /includes/fts/field-types/autocomplete/multiple-field-example-description.rst 

   .. literalinclude:: /includes/fts/field-types/autocomplete/create_index_multiple_fields.java
      :language: java
      :linenos:
      :copyable: true 

.. collapsible::
   :heading: Email Example
   :sub_heading: Index email address as the autocomplete type.
   :expanded: false

   .. include:: /includes/fts/field-types/autocomplete/email-example-description.rst 

   .. literalinclude:: /includes/fts/field-types/autocomplete/create_index_email_example.java
      :language: java
      :linenos:
      :copyable: true
