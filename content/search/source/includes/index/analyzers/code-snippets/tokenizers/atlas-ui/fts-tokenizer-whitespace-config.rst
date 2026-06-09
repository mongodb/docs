1. In the :guilabel:`Custom Analyzers` section, click :guilabel:`Add
   Custom Analyzer`.

#. Select the :guilabel:`Create Your Own` radio button and click
   :guilabel:`Next`.

#. Type |analyzer-name| in the :guilabel:`Analyzer Name` field.

#. Expand :guilabel:`Tokenizer` if it's collapsed.

#. Select |fts-tokenizer| from the dropdown.

#. Click :guilabel:`Add` to add the custom analyzer to your index.

#. In the :guilabel:`Field Mappings` section, click :guilabel:`Add
   Field Mapping` to apply the custom analyzer on the
   |minutes-collection-field| field.

#. Select |minutes-collection-field| from the :guilabel:`Field
   Name` dropdown and |fts-field-type| from the :guilabel:`Data
   Type` dropdown.

#. In the properties section for the data type, select |analyzer-name|
   from the :guilabel:`Index Analyzer` and :guilabel:`Search Analyzer`
   dropdowns.

#. Click :guilabel:`Add`, then :guilabel:`Save Changes`.
