Choose your preferred configuration method in the {+atlas-ui+} and then select the database and collection.

.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib

      You can't create an index for ``vector`` field type from the
      {+atlas-ui+} :guilabel:`Visual Editor`. Instead, use the
      :guilabel:`JSON Editor`.

   .. tab:: JSON Editor 
      :tabid: jsonib

      .. include:: /includes/fts/extracts/fts-jsonib-index-definition.rst   

      .. literalinclude:: /includes/fts/field-types/vector/search-index-ui.json
         :language: json
         :linenos:
         :copyable: true