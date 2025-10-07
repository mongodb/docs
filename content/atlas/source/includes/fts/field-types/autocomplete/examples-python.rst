Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/fts/field-types/try-an-example.rst

.. include:: /includes/fts/field-types/configure-and-run.rst

.. collapsible::
   :heading: Basic Example
   :sub_heading: Index specific field using static mappings as autocomplete type.
   :expanded: false

   .. include:: /includes/fts/field-types/autocomplete/basic-example-description.rst 

   .. literalinclude:: /includes/fts/field-types/autocomplete/create_index_basic.py
      :language: python
      :linenos:
      :copyable: true 

.. collapsible::
   :heading: Dynamic Index Example
   :sub_heading: Dynamically index string fields as the autocomplete type.
   :expanded: false

   .. include:: /includes/fts/field-types/autocomplete/cdi-example-description.rst

   .. literalinclude:: /includes/fts/field-types/autocomplete/configure_dynamic_index.py
      :language: python
      :linenos:
      :copyable: true 

.. collapsible::
   :heading: Multiple Types Example
   :sub_heading: Index specific field as autocomplete and string types.
   :expanded: false

   .. include:: /includes/fts/field-types/autocomplete/multiple-field-example-description.rst 

   .. literalinclude:: /includes/fts/field-types/autocomplete/create_index_multiple_fields.py
      :language: python
      :linenos:
      :copyable: true 

.. collapsible::
   :heading: Email Example
   :sub_heading: Index email address as the autocomplete type.
   :expanded: false

   .. include:: /includes/fts/field-types/autocomplete/email-example-description.rst 

   .. literalinclude:: /includes/fts/field-types/autocomplete/create_index_email_example.py
      :language: python
      :linenos:
      :copyable: true
