.. procedure::
   :style: normal

   .. step:: Click :guilabel:`Edit Query` to view your query syntax 
      in |json| format.

   .. step:: Optionally, create a query from an existing template.

      |fts| provides templates for popular search queries. 
      To use a template:

      a. Click :guilabel:`Create Query From Template`. |fts| displays
         a list of popular search types.

      #. For a given search type, select a template from 
         the :guilabel:`Template` drop-down menu.

      #. Click :guilabel:`Insert` for the template
         that you want to add.

   .. step:: Edit or copy your query syntax.

      You can edit or copy the query syntax in |json| format.

      a. Edit Query Syntax 
         
         You can modify or replace the displayed query in the Query
         Editor and test your query by clicking the
         :guilabel:`Search` button. 

         .. important::
         
            When you finish editing your query, be sure to copy it. Once
            you click :guilabel:`Exit Query Editor`, the {+atlas-ui+}
            discards your changes.
   
      #. Copy Query Syntax 
            
         Click :icon-fa4:`files-o` to copy the query syntax in |json| 
         format to your clipboard. You can run the copied query in 
         {+mongosh+} or |compass| after :ref:`connecting <atlas-connect-to-deployment>` 
         to your |service| {+cluster+}.

   .. step:: Click :guilabel:`Exit Query Editor` to exit the :guilabel:`Query Editor` modal.

      .. note::
         
         The {+atlas-ui+} discards your changes when you exit the Query Editor.
