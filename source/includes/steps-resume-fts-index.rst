.. procedure::
   :style: normal
      
   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Click the cluster name to view cluster details.

   .. step:: Click the :guilabel:`Atlas Search` tab.
      
   .. step:: Click :guilabel:`Resume Index Creation`.
      
   .. step:: Save or delete your index definition draft.
      
      1. Click :guilabel:`Cancel`.
      
      #. Click :guilabel:`Save Draft` or :guilabel:`Delete Draft`.
      
   .. step:: Customize your |fts| index configuration settings.
      
      Click :guilabel:`Refine Your Index` to make changes to any of 
      the following settings and click :guilabel:`Save Changes`.
      
      .. include:: /includes/list-table-fts-index-visual-editor.rst
      
   .. step:: Click :guilabel:`Create Search Index`.

   .. step:: Close the :guilabel:`You're All Set!` Modal Window.
      
      A modal window appears to let you know your index is building. Click 
      the :guilabel:`Close` button.
      
   .. step:: Check the status.
      
      The newly created index appears on the :guilabel:`Atlas Search` tab. While 
      the index is building, the :guilabel:`Status` field reads 
      :guilabel:`Build in Progress`. When the index is finished building,
      the :guilabel:`Status` field reads :guilabel:`Active`.
      
      .. note::
      
         Larger collections take longer to index. You will receive an email
         notification when your index is finished building.
