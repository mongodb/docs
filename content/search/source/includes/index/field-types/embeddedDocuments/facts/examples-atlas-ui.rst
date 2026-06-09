Try an Example for the |fts-field-type| Type  
--------------------------------------------

.. include:: /includes/index/shared/facts/try-an-example.rst

.. include:: /includes/index/shared/facts/configure-and-run.rst

.. collapsible::
   :heading: Basic Example
   :sub_heading: Automatically index all dynamically indexable fields inside the array of objects.
   :expanded: false

   .. include:: /includes/index/field-types/embeddedDocuments/facts/basic-example-description.rst

   .. tabs::
      
      .. tab:: Visual Editor
         :tabid: vib

         1. In the :guilabel:`Add Field Mapping` window, select
            :guilabel:`items` from the :guilabel:`Field Name`
            dropdown. 
         #. Click the :guilabel:`Data Type` dropdown and select
            :guilabel:`EmbeddedDocuments`.  
         #. Toggle :guilabel:`Enable Dynamic Mapping` to enable
            dynamic mapping, if needed.
         #. Click :guilabel:`Add`.

      .. tab:: JSON Editor
         :tabid: jib

         .. literalinclude:: /includes/index/field-types/embeddedDocuments/code-snippets/atlas-ui/create-index-basic-ui.json
            :language: json
            :linenos:
            :copyable: true 

.. collapsible::
   :heading: Dynamic Index Example
   :sub_heading: Combine dynamic mappings with static mappings to index nested fields as different field types.
   :expanded: false

   Enable Dynamic Indexing  
   ~~~~~~~~~~~~~~~~~~~~~~~

   .. include:: /includes/index/field-types/embeddedDocuments/facts/dynamic-example-description.rst

   .. tabs::

      .. tab:: Visual Editor
         :tabid: vib

         Click :guilabel:`Add Field` in the :guilabel:`Field
         Mappings` section and add the following fields by
         clicking :guilabel:`Add` after configuring the
         settings for each field in the :guilabel:`Add
         Field Mapping` window. 
               
         .. list-table:: 
            :header-rows: 1

            * - :guilabel:`Field Name`
              - :guilabel:`Data Type`
                     
            * - ``items``
              - Click the dropdown and select ``EmbeddedDocuments``. 

            * - ``purchaseMethod``
              - Click the dropdown and select ``Token``.

      .. tab:: JSON Editor
         :tabid: jib

         .. literalinclude:: /includes/index/field-types/embeddedDocuments/code-snippets/atlas-ui/create-index-dynamic-ui.json
            :language: json
            :linenos:
            :copyable: true 

   Configure Dynamic Indexing 
   ~~~~~~~~~~~~~~~~~~~~~~~~~~

   .. include:: /includes/index/field-types/embeddedDocuments/facts/typeset-example-description.rst

   .. tabs::

      .. tab:: Visual Editor
         :tabid: vib

         You can't configure ``typeSets`` from the {+atlas-ui+}
         :guilabel:`Visual Editor`.

      .. tab:: JSON Editor
         :tabid: jib

         .. literalinclude:: /includes/index/field-types/embeddedDocuments/code-snippets/atlas-ui/create-index-typeset-ui.json 
            :language: json
            :linenos:
            :copyable: true 

.. collapsible::
   :heading: Specified Fields Example
   :sub_heading: Index only specific fields in the array of objects. 
   :expanded: false

   .. include:: /includes/index/field-types/embeddedDocuments/facts/specified-fields-example-description.rst

   .. tabs::

      .. tab:: Visual Editor
         :tabid: vib

         2. In the :guilabel:`Add Field Mapping` window, select
            :guilabel:`items` from the :guilabel:`Field Name` dropdown. 
         #. Click the :guilabel:`Data Type` dropdown and select
            :guilabel:`EmbeddedDocuments`.  
         #. Disable :guilabel:`Enable Dynamic Mapping`.
         #. Click :guilabel:`Add`.
         #. Click :guilabel:`Add Embedded Field` for the
            :guilabel:`items` field in the :guilabel:`Field Mappings`
            table and add the following fields by clicking
            :guilabel:`Add` after configuring the settings for each
            field in the :guilabel:`Add Embedded Field Mapping`
            window.
            
            .. list-table:: 
               :header-rows: 1

               * - :guilabel:`Field Name`
                 - :guilabel:`Data Type`

               * - :guilabel:`items.name`
                 - Click the :guilabel:`Data Type` dropdown and select
                   :guilabel:`String`. 

               * - :guilabel:`items.tags`
                 - Click the :guilabel:`Data Type` dropdown and select
                   :guilabel:`String`.

      .. tab:: JSON Editor
         :tabid: jib

         .. literalinclude:: /includes/index/field-types/embeddedDocuments/code-snippets/atlas-ui/create-index-specified-ui.json
            :language: json
            :linenos:
            :copyable: true

.. collapsible::
   :heading: Stored Source Examples
   :sub_heading: Use storedSource to configure storage for nested fields in the array of objects for query and retrieval.
   :expanded: false

   Use Relative Path for Stored Source  
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   .. include:: /includes/index/field-types/embeddedDocuments/facts/stored-source-relative-path.rst

   .. tabs::
      
      .. tab:: Visual Editor
         :tabid: vib

         This is not supported in the {+atlas-ui+} :guilabel:`Visual Editor`.

      .. tab:: JSON Editor
         :tabid: jib

         .. literalinclude:: /includes/index/field-types/embeddedDocuments/code-snippets/atlas-ui/stored-source-relative-path-ui.json
            :language: json
            :linenos:
            :copyable: true

   Configure Multiple Stored Source
   ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

   .. include:: /includes/index/field-types/embeddedDocuments/facts/multiple-stored-source-configs.rst

   .. tabs::
      
      .. tab:: Visual Editor
         :tabid: vib

         This is not supported in the {+atlas-ui+} :guilabel:`Visual Editor`.

      .. tab:: JSON Editor
         :tabid: jib

         .. literalinclude:: /includes/index/field-types/embeddedDocuments/code-snippets/atlas-ui/stored-source-mltpl-conf-ui.json
            :language: json
            :linenos:
            :copyable: true

