1. In the :guilabel:`Custom Analyzers` section, click :guilabel:`Add
   Custom Analyzer`.

#. Choose :guilabel:`Create Your Own` radio button and click
   :guilabel:`Next`.

#. Type ``keywordLowerer`` in the :guilabel:`Analyzer Name` field.

#. Expand :guilabel:`Tokenizer` if it's collapsed and select the
   :guilabel:`keyword` from the dropdown.

#. Expand :guilabel:`Token Filters` and click :icon-fa5:`plus-circle`
   :guilabel:`Add token filter`.

#. Select :guilabel:`lowercase` from the dropdown and click
   :guilabel:`Add token filter` to add the token filter to your
   custom analyzer.

#. In the :guilabel:`Field Mappings` section, click :guilabel:`Add
   Field Mapping` to apply the custom analyzer on the
   **title** field.

#. Select **title** from the :guilabel:`Field
   Name` dropdown and **Autocomplete** from the :guilabel:`Data
   Type` dropdown.

#. In the properties section for the data type, select the following
   values from the dropdown for the property:

   .. list-table::
      :header-rows: 1

      * - Property Name
        - Value

      * - :guilabel:`Analyzer`
        - ``keywordLowerer``

      * - :guilabel:`Tokenization`
        - **nGram**

#. Click :guilabel:`Add`, then :guilabel:`Save Changes`.
