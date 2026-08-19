1. In the :guilabel:`Custom Analyzers` section, click :guilabel:`Add
   Custom Analyzer`.

#. Select the :guilabel:`Create Your Own` radio button and click
   :guilabel:`Next`.

#. Type ``frenchStemmer`` in the :guilabel:`Analyzer Name` field.

#. Expand :guilabel:`Tokenizer` if it's collapsed.

#. Select :guilabel:`standard` from the dropdown.

#. Expand :guilabel:`Token Filters` and click :icon-fa5:`plus-circle`
   :guilabel:`Add token filter`.

#. Select :guilabel:`lowercase` from the dropdown and click
   :guilabel:`Add token filter` to add the token filter to your
   custom analyzer.

#. Click :icon-fa5:`plus-circle` :guilabel:`Add token filter` to add
   another token filter.

#. Select :guilabel:`snowballStemming` from the dropdown and then select
   ``french`` from the :guilabel:`stemmerName` dropdown.

#. Click :guilabel:`Add token filter` to add the token filter to your
   custom analyzer.

#. Click :guilabel:`Add` to create the custom analyzer.

#. In the :guilabel:`Field Mappings` section, click :guilabel:`Add
   Field Mapping` to apply the custom analyzer on
   the **text.fr_CA** nested field.

#. Select **text.fr_CA** nested from the :guilabel:`Field
   Name` dropdown and **String** from the :guilabel:`Data
   Type` dropdown.

#. In the properties section for the data type, select ``frenchStemmer``
   from the :guilabel:`Index Analyzer` and :guilabel:`Search Analyzer`
   dropdowns.

#. Click :guilabel:`Add`, then :guilabel:`Save Changes`.
