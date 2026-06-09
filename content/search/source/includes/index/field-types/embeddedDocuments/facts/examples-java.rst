Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/index/shared/facts/try-an-example.rst

.. include:: /includes/index/shared/facts/configure-and-run.rst

.. collapsible::
   :heading: Basic Example
   :sub_heading: Automatically index all dynamically indexable fields inside the array of objects.
   :expanded: false

   .. include:: /includes/index/field-types/embeddedDocuments/facts/basic-example-description.rst

   .. literalinclude:: /includes/index/field-types/embeddedDocuments/code-snippets/java/create-index-basic.java
      :language: java
      :linenos:
      :copyable: true 

.. collapsible::
   :heading: Dynamic Index Example
   :sub_heading: Combine dynamic mappings with static mappings to index nested fields as different field types.
   :expanded: false

   Enable Dynamic Indexing  
   ~~~~~~~~~~~~~~~~~~~~~~~

   .. include:: /includes/index/field-types/embeddedDocuments/facts/dynamic-example-description.rst

   .. literalinclude:: /includes/index/field-types/embeddedDocuments/code-snippets/java/create-index-dynamic.java
      :language: java
      :linenos:
      :copyable: true 

   .. Not yet supported. See DOCSP-54380
      Configure Dynamic Indexing 
      ~~~~~~~~~~~~~~~~~~~~~~~~~~

      .. include:: /includes/index/field-types/embeddedDocuments/facts/typeset-example-description.rst

      .. literalinclude:: /includes/index/field-types/embeddedDocuments/code-snippets/java/configure-dynamic-index.java
         :language: java
         :linenos:
         :copyable: true 

.. collapsible::
   :heading: Specified Fields Example
   :sub_heading: Index only specific fields in the array of objects. 
   :expanded: false

   .. include:: /includes/index/field-types/embeddedDocuments/facts/specified-fields-example-description.rst

   .. literalinclude:: /includes/index/field-types/embeddedDocuments/code-snippets/java/create-index-specified.java
      :language: java
      :linenos:
      :copyable: true

.. Hide until DRIVERS-3088 completes
   .. collapsible::
      :heading: Stored Source Examples
      :sub_heading: Use storedSource to configure storage for nested fields in the array of objects for query and retrieval.
      :expanded: false

      Use Relative Path for Stored Source  
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      .. include:: /includes/index/field-types/embeddedDocuments/facts/stored-source-relative-path.rst

      .. literalinclude:: /includes/index/field-types/embeddedDocuments/code-snippets/java/stored-source-relative-path.java
         :language: java
         :linenos:
         :copyable: true

      Configure Multiple Stored Source
      ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

      .. include:: /includes/index/field-types/embeddedDocuments/facts/multiple-stored-source-configs.rst

      .. literalinclude:: /includes/index/field-types/embeddedDocuments/code-snippets/java/stored-source-mltpl-conf.java
         :language: java
         :linenos:
         :copyable: true
