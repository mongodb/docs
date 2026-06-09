Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/index/shared/facts/try-an-example.rst

.. include:: /includes/index/shared/facts/configure-and-run.rst

.. collapsible::
   :heading: Basic Example
   :sub_heading: Index specific field using static mappings as autocomplete type.
   :expanded: false

   .. include:: /includes/index/field-types/autocomplete/facts/basic-example-description.rst

   .. literalinclude:: /includes/index/field-types/autocomplete/code-snippets/java/create_index_basic.java
      :language: java
      :linenos:
      :copyable: true 

.. Not yet supported. See DOCSP-54380
   .. collapsible::
      :heading: Dynamic Index Example
      :sub_heading: Dynamically index string fields as the autocomplete type.
      :expanded: false

      .. include:: /includes/index/field-types/autocomplete/facts/cdi-example-description.rst

      .. literalinclude:: /includes/index/field-types/autocomplete/code-snippets/java/configure_dynamic_index.java
         :language: java
         :linenos:
         :copyable: true 

.. collapsible::
   :heading: Multiple Types Example
   :sub_heading: Index specific field as autocomplete and string types.
   :expanded: false

   .. include:: /includes/index/field-types/autocomplete/facts/multiple-field-example-description.rst 

   .. literalinclude:: /includes/index/field-types/autocomplete/code-snippets/java/create_index_multiple_fields.java
      :language: java
      :linenos:
      :copyable: true 

.. collapsible::
   :heading: Email Example
   :sub_heading: Index email address as the autocomplete type.
   :expanded: false

   .. include:: /includes/index/field-types/autocomplete/facts/email-example-description.rst 

   .. literalinclude:: /includes/index/field-types/autocomplete/code-snippets/java/create_index_email_example.java
      :language: java
      :linenos:
      :copyable: true
