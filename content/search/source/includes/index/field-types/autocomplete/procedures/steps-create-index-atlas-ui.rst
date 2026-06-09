Choose your preferred configuration method in the {+atlas-ui+} and then
select the database and collection. 

.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib

      .. include:: /includes/index/shared/facts/fts-vib-index-definition-advanced.rst 

      .. note:: 
         
         To configure the ``similarity.type`` property for string fields, use the
         |json| Editor.
         
   .. tab:: JSON Editor 
      :tabid: jsonib

      .. include:: /includes/index/shared/facts/fts-jsonib-index-definition.rst

      .. literalinclude:: /includes/index/field-types/autocomplete/code-snippets/atlas-ui/search-index-ui.json
         :language: json 
         :copyable: true 
         :linenos:
