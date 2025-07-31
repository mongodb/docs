Define the Index for the |fts-field-type| Type 
----------------------------------------------

Choose your preferred configuration method in the Atlas UI and then select the database and collection.

.. tabs:: 

   .. tab:: Visual Editor 
      :tabid: vib

      .. procedure::
         :style: normal
         
         .. step:: Click :guilabel:`Refine Your Index` to configure your index.  
         
         .. step:: In the :guilabel:`Field Mappings` section, click :guilabel:`Add Field` to open the :guilabel:`Add Field Mapping` window.  
         
         .. step:: Click :guilabel:`Customized Configuration`.
         
         .. step:: Select the field to index from the :guilabel:`Field Name` dropdown.  

            .. note:: 

               .. include:: /includes/fts/facts/fact-fts-field-name-restriction.rst

         .. step:: Click the :guilabel:`Data Type` dropdown and select :guilabel:`String`. 
         
         .. step:: (Optional) Expand and configure the :guilabel:`String Properties` for the field. To learn more, see the following Field Properties table. 
         
         .. step:: (Optional) Click :guilabel:`Add Multi Field` to configure the following alternate analyzer settings for that field: 

            a. Enter a name for the alternate analyzer in the :guilabel:`Multi Field Name` field.
            #. Configure the string field properties for the alternate analyzer under :guilabel:`Multi Field Properties`. To learn more, see the following Field Properties table. 
            #. (Optional) Click :guilabel:`Add Another Multi Field` and repeat steps **1** and **b** to configure more analyzers for the field. 

         .. step:: Click :guilabel:`Add`. 

   .. tab:: JSON Editor 
      :tabid: jsonib

      The following is the JSON syntax for the |fts-field-type| type.
      Replace the default index definition with the following. To learn more
      about the fields, see the following table.

      .. literalinclude:: /includes/fts/field-types/objectId/create-index-basic-placeholders.json
         :language: json
         :linenos:
         :copyable: true
