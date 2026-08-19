1. In the :guilabel:`Custom Analyzers` section, click :guilabel:`Add
   Custom Analyzer`.

#. Select the :guilabel:`Create Your Own` radio button and click
   :guilabel:`Next`.

#. Type ``titleAutocomplete`` in the :guilabel:`Analyzer Name` field.

#. Expand :guilabel:`Tokenizer` if it's collapsed.

#. Select :guilabel:`standard` from the dropdown.

#. Expand :guilabel:`Token Filters` and click :icon-fa5:`plus-circle`
   :guilabel:`Add token filter`.

#. Select :guilabel:`icuFolding` from the dropdown and click
   :guilabel:`Add token filter` to add the token filter to your
   custom analyzer.

#. Click :icon-fa5:`plus-circle` :guilabel:`Add token filter` to add
   another token filter.

#. Select :guilabel:`edgeGram` from the dropdown and type the value
   shown in the following table for the fields:

   .. list-table::
      :header-rows: 1

      * - Field
        - Value

      * - ``minGram``
        - 4

      * - ``maxGram``
        - 7

#. Click :guilabel:`Add token filter` to add the token filter to your
   custom analyzer.

#. Click :guilabel:`Add` to create the custom analyzer.

#. In the :guilabel:`Field Mappings` section, click :guilabel:`Add
   Field Mapping` to apply the custom analyzer on
   the **title** field.

#. Select **title** from the :guilabel:`Field
   Name` dropdown and **String** from the :guilabel:`Data
   Type` dropdown.

#. In the properties section for the data type, select ``titleAutocomplete``
   from the :guilabel:`Index Analyzer` and :guilabel:`Search Analyzer`
   dropdowns.

#. Click :guilabel:`Add`, then :guilabel:`Save Changes`.
