1. In the :guilabel:`Custom Analyzers` section, click :guilabel:`Add
   Custom Analyzer`.

#. Select the :guilabel:`Create Your Own` radio button and click
   :guilabel:`Next`.

#. Type |analyzer-name-a| in the :guilabel:`Analyzer Name` field.

#. Expand :guilabel:`Character Filters` and click
   :icon-fa5:`plus-circle` :guilabel:`Add character filter`.

#. Select |fts-char-filter| from the dropdown and click
   :icon-fa5:`plus-circle` :guilabel:`Add mapping`.

#. Enter the following key and value:

   .. list-table::
      :header-rows: 1

      * - Key
        - Value

      * - ``@``
        - ``AT``

#. Click :guilabel:`Add character filter` to add the character filter
   to your custom analyzer.

#. Expand :guilabel:`Tokenizer` if it's collapsed.

#. Select |fts-tokenizer| from the dropdown and enter ``15`` in the
   :guilabel:`maxTokenLength` field.

#. Expand :guilabel:`Token Filters` and click :icon-fa5:`plus-circle`
   :guilabel:`Add token filter`.

#. Select |fts-token-filter-a| from the dropdown and configure the
   following fields.

   .. list-table::
      :header-rows: 1

      * - Field
        - Field Value

      * - ``minShingleSize``
        - 2

      * - ``minShingleSize``
        - 3

#. Click :icon-fa5:`plus-circle` :guilabel:`Add token filter` to add
   another token filter.

#. Click :icon-fa5:`plus-circle` :guilabel:`Add token filter` to add
   another token filter.

#. Select |fts-token-filter-b| from the dropdown and configure the
   following fields for the token filter:

   .. list-table::
      :header-rows: 1

      * - Field
        - Field Value

      * - ``minGram``
        - 2

      * - ``maxGram``
        - 15

#. Click :guilabel:`Add token filter` to add the token filter to your
   custom analyzer.

#. Click :guilabel:`Add` to add the custom analyzer to your index.

#. In the :guilabel:`Custom Analyzers` section, click :guilabel:`Add
   Custom Analyzer`.

#. Select the :guilabel:`Create Your Own` radio button and click
   :guilabel:`Next`.

#. Type |analyzer-name-b| in the :guilabel:`Analyzer Name` field.

#. Expand :guilabel:`Character Filters` and click
   :icon-fa5:`plus-circle` :guilabel:`Add character filter`.

#. Select |fts-char-filter| from the dropdown and click
   :icon-fa5:`plus-circle` :guilabel:`Add mapping`.

#. Enter the following key and value:

   .. list-table::
      :header-rows: 1

      * - Key
        - Value

      * - ``@``
        - ``AT``

#. Click :guilabel:`Add character filter` to add the character filter
   to your custom analyzer.

#. Expand :guilabel:`Tokenizer` if it's collapsed.

#. Select |fts-tokenizer| from the dropdown and enter ``15`` in the
   :guilabel:`maxTokenLength` field.

#. Click :guilabel:`Add` to add the custom analyzer to your index.

#. In the :guilabel:`Field Mappings` section, click :guilabel:`Add
   Field Mapping` to apply the custom analyzer on the
   |minutes-collection-field| field.

#. Select |minutes-collection-field| from the :guilabel:`Field
   Name` dropdown and |fts-field-type| from the :guilabel:`Data
   Type` dropdown.

#. In the properties section for the data type, select |analyzer-name-a|
   from the :guilabel:`Index Analyzer` dropdown and |analyzer-name-b|
   from the :guilabel:`Search Analyzer` dropdown.

#. Click :guilabel:`Add`, then :guilabel:`Save Changes`.
