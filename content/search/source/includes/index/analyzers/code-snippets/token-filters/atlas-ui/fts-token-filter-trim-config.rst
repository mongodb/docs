1. In the :guilabel:`Custom Analyzers` section, click :guilabel:`Add
   Custom Analyzer`.

#. Select the :guilabel:`Create Your Own` radio button and click
   :guilabel:`Next`.

#. Type ``tokenTrimmer`` in the :guilabel:`Analyzer Name` field.

#. Expand :guilabel:`Character Filters` and click
   :icon-fa5:`plus-circle` :guilabel:`Add character filter`.

#. Select :guilabel:`htmlStrip` from the dropdown and type
   ``a`` in the :guilabel:`ignoredTags` field.

#. Click :guilabel:`Add character filter` to add the character filter
   to your custom analyzer.

#. Expand :guilabel:`Tokenizer` if it's collapsed.

#. Select :guilabel:`keyword` from the dropdown.

#. Expand :guilabel:`Token Filters` and click :icon-fa5:`plus-circle`
   :guilabel:`Add token filter`.

#. Select :guilabel:`trim` from the dropdown.

#. Click :guilabel:`Add token filter` to add the token filter to your
   custom analyzer.

#. Click :guilabel:`Add` to add the custom analyzer to your index.

#. In the :guilabel:`Field Mappings` section, click :guilabel:`Add
   Field Mapping` to apply the custom analyzer on the
   **text.en_US** nested field.

#. Select **text.en_US** nested from the :guilabel:`Field
   Name` dropdown and **String** from the :guilabel:`Data
   Type` dropdown.

#. In the properties section for the data type, select ``tokenTrimmer``
   from the :guilabel:`Index Analyzer` and :guilabel:`Search Analyzer`
   dropdowns.

#. Click :guilabel:`Add`, then :guilabel:`Save Changes`.
