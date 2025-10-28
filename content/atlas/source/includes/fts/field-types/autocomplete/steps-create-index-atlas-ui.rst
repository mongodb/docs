Define the Index for the |fts-field-type| Type  
----------------------------------------------

Choose your preferred configuration method in the {+atlas-ui+} and then
select the database and collection. 

.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib

      .. include:: /includes/fts/extracts/fts-vib-index-definition-advanced.rst 

      .. note:: 
         
         To configure the ``similarity.type`` property for string fields, use the
         |json| Editor.
         
   .. tab:: JSON Editor 
      :tabid: jsonib

      .. include:: /includes/fts/extracts/fts-jsonib-index-definition.rst

      .. literalinclude:: /includes/fts/field-types/autocomplete/search-index-ui.json
         :language: json 
         :copyable: true 
         :linenos:
