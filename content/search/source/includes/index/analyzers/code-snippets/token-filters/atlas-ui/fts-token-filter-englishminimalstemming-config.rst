1. In the :guilabel:`Custom Analyzers` section, click :guilabel:`Add
   Custom Analyzer`.

#. Select the :guilabel:`Create Your Own` radio button and click
   :guilabel:`Next`.

#. Type |analyzer-name| in the :guilabel:`Analyzer Name` field.

#. Expand :guilabel:`Tokenizer` if it's collapsed.

#. Select |fts-tokenizer| from the dropdown.

#. Expand :guilabel:`Token Filters` and click :icon-fa5:`plus-circle`
   :guilabel:`Add token filter` to add the following token filters 
   from the dropdown.

   - |fts-token-filter-a| 
   - |fts-token-filter-b|

#. Click :guilabel:`Add token filter` to add the token filter to your
   custom analyzer.

#. Click :guilabel:`Add` to create the custom analyzer.

#. In the :guilabel:`Field Mappings` section, click :guilabel:`Add
   Field Mapping` to apply the custom analyzer on
   the |minutes-collection-field| field.

#. Select |minutes-collection-field| from the :guilabel:`Field
   Name` dropdown and |fts-field-type| from the :guilabel:`Data
   Type` dropdown.

#. In the properties section for the data type, select |analyzer-name|
   from the :guilabel:`Index Analyzer` and :guilabel:`Search Analyzer`
   dropdowns.

#. Click :guilabel:`Add`, then :guilabel:`Save Changes`.