.. procedure::
   :style: normal

   .. step:: Click :guilabel:`Edit $search Query` to view your query syntax 
      in |json| format.

   .. step:: Edit or copy your query syntax.

      You can edit or copy the query syntax in |json| format.

      .. procedure::
         :style: connected
      
         .. step:: Edit Query Syntax 
         
            You can update the :pipeline:`$search` query in the Search
            Editor and test it by clicking the :guilabel:`Search`
            button.

            .. important::
            
               When you finish editing your query, be sure to copy it. Once
               you click :guilabel:`Close Search Editor`, the {+atlas-ui+}
               discards your changes.
      
         .. step:: Copy Query Syntax 
            
            Click :icon-fa4:`files-o` to copy the query syntax in |json| 
            format to your clipboard. You can run the copied query in your 
            {+mongosh+} or |compass| after :doc:`connecting </connect-to-database-deployment/>` to 
            your |service| cluster.

   .. step:: Click :guilabel:`Close Search Editor` to exit the :guilabel:`Edit $search Query` modal.

             .. note::
                
                The {+atlas-ui+} discards your changes when you exit the Search Tester Editor.
