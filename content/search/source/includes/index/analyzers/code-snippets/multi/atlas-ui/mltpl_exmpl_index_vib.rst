1. Click :guilabel:`Refine Your Index` to configure your index.
#. In the :guilabel:`Field Mappings` section, click
   :guilabel:`Add Field` to open the :guilabel:`Add Field Mapping`
   window. 
#. Select ``title`` from the :guilabel:`Field Name` dropdown.
#. Click the :guilabel:`Data Type` dropdown and select
   :guilabel:`String` if it isn't already selected. 
#. Expand :guilabel:`String Properties` and make the following 
   changes: 

   .. list-table:: 
      :stub-columns: 1

      * - Index Analyzer 
        - Select ``lucene.standard`` from the dropdown if it isn't
          already selected. 

      * - Search Analyzer 
        - Select ``lucene.standard`` from the dropdown if it isn't
          already selected.

      * - Index Options 
        - Use the default ``offsets``.

      * - Store 
        - Use the default ``true``.

      * - Ignore Above 
        - Keep the default setting.

      * - Norms 
        - Use the default ``include``.

#. Click :guilabel:`Add Multi Field` to configure another analyzer
   on the ``title`` field.
#. Enter ``frenchAnalyzer`` in the :guilabel:`Multi Field Name`
   field. 
#. Make the following changes to the :guilabel:`Multi Field
   Properties` : 

   .. list-table:: 
      :stub-columns: 1

      * - Index Analyzer 
        - Select ``lucene.french`` from the dropdown if it isn't
          already selected. 

      * - Search Analyzer 
        - Select ``lucene.french`` from the dropdown if it isn't
          already selected.

      * - Index Options 
        - Use the default ``offsets``.

      * - Store 
        - Use the default ``true``.

      * - Ignore Above 
        - Keep the default setting.

      * - Norms 
        - Use the default ``include``.

#. Click :guilabel:`Add`.
#. Click :guilabel:`Add Field Mapping` to open the :guilabel:`Add
   Field Mapping` window.
#. Select ``plot`` from the :guilabel:`Field Name` dropdown.
#. Repeat steps 4 to 9. 
#. Click :guilabel:`Save Changes`.
#. Click :guilabel:`Create Search Index`.

