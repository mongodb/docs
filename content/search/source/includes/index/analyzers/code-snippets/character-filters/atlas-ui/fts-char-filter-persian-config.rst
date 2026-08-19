1. In the :guilabel:`Custom Analyzers` section, click :guilabel:`Add
   Custom Analyzer`.

#. Select the :guilabel:`Create Your Own` radio button and click
   :guilabel:`Next`.

#. Type ``persianCharacterIndex`` in the :guilabel:`Analyzer Name` field.

#. Expand :guilabel:`Character Filters` and click
   :icon-fa5:`plus-circle` :guilabel:`Add character filter`.

#. Select :guilabel:`persian` from the dropdown and click
   :guilabel:`Add character filter`.

#. Expand :guilabel:`Tokenizer` if it's collapsed and select
   :guilabel:`whitespace` from the dropdown.

#. Click :guilabel:`Add` to add the custom analyzer to your index.

#. In the :guilabel:`Field Mappings` section, click :guilabel:`Add
   Field Mapping` to apply the custom analyzer on the
   **text.fa_IR** (:ref:`nested <document-dot-notation>`) field.

#. Select **text.fa_IR** (:ref:`nested <document-dot-notation>`) from the :guilabel:`Field
   Name` dropdown and **String** from the :guilabel:`Data
   Type` dropdown.

#. In the properties section for the data type, select the
   ``persianCharacterIndex`` from the :guilabel:`Index Analyzer` and
   :guilabel:`Search Analyzer` dropdowns.

#. Click :guilabel:`Add`, then :guilabel:`Save Changes`.
