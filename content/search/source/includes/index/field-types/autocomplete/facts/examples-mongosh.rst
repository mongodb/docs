Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/index/shared/facts/try-an-example.rst

.. include:: /includes/index/shared/facts/configure-and-run.rst

.. collapsible::
   :heading: Basic Example
   :sub_heading: Index specific field using static mappings as autocomplete type.
   :expanded: false

   .. include:: /includes/index/field-types/autocomplete/facts/basic-example-description.rst 

   .. literalinclude:: /includes/index/field-types/autocomplete/code-snippets/shell/create_index_basic_mongosh.js
      :language: javascript
      :linenos:
      :copyable: true 

.. collapsible::
   :heading: Dynamic Index Example
   :sub_heading: Dynamically index string fields as the autocomplete type.
   :expanded: false

   .. include:: /includes/index/field-types/autocomplete/facts/cdi-example-description.rst

   .. literalinclude:: /includes/index/field-types/autocomplete/code-snippets/shell/configure_dynamic_index_mongosh.js
      :language: javascript
      :linenos:
      :copyable: true 

.. collapsible::
   :heading: Multiple Types Example
   :sub_heading: Index specific field as autocomplete and string types.
   :expanded: false

   .. include:: /includes/index/field-types/autocomplete/facts/multiple-field-example-description.rst 

   .. literalinclude:: /includes/index/field-types/autocomplete/code-snippets/shell/create_index_multiple_fields_mongosh.js
      :language: javascript
      :linenos:
      :copyable: true 

.. collapsible::
   :heading: Email Example
   :sub_heading: Index email address as the autocomplete type.
   :expanded: false

   .. include:: /includes/index/field-types/autocomplete/facts/email-example-description.rst 

   .. literalinclude:: /includes/index/field-types/autocomplete/code-snippets/shell/create_index_email_example_mongosh.js
      :language: javascript
      :linenos:
      :copyable: true
