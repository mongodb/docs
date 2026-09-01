.. procedure:: 
   :style: normal 

   .. include:: /includes/nav/steps-org-level.rst

   .. step:: Create the {+model-api-key+}.

      a. Click :guilabel:`Create new model API key`.
      #. Enter a name for the key.

         Model API keys can't exceed 250 characters.

      #. Select a project from the dropdown to link with the API key.
      #. Select a cloud provider from the :guilabel:`Cloud
         provider` dropdown.

         Select ``any`` to leave the cloud dimension unscoped.

      #. Optional. Select a geography from the
         :guilabel:`Geography` dropdown.

         Most keys don't need a Geography. Select ``any`` to
         leave the geography dimension unscoped.

         |service| displays the read-only :guilabel:`API
         Endpoint` for the scope that you select. The key
         authenticates against this endpoint.

      #. Click :guilabel:`Create`.

   .. step:: Save the API key.

      a. Copy the {+model-api-key+} and store it in a secure location.

         After you leave the page where the key is displayed, you won't
         be able to view it again. If you lose it, create a
         new one.

      #. Click :guilabel:`Done`.