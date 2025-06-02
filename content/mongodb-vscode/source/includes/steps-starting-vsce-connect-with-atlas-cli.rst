.. procedure:: 
   :style: normal

   .. step:: Connect from the Atlas CLI. 

      In your terminal, run ``atlas auth login`` to authenticate with your 
      Atlas login credentials. To learn more, 
      see :atlascli:`Connect from the Atlas CLI </connect-atlas-cli/>`.

   .. step:: Run the connection command. 

      Run ``atlas deployment connect`` in your terminal.

      .. code-block:: 

        atlas deployment connect

   .. step::  Select your deployment.

      Select the deployment you wish to connect to from your list of deployments.
 
   .. step:: Select |vsce| as your connection method.

      The Atlas CLI prompts you to select your connection method. Select 
      **"vscode - MongoDB for VsCode"**. 

   .. step:: Open |vscode-short| and click the :guilabel:`MongoDB` icon in the :guilabel:`Activity Bar`.

      .. figure:: /images/vsce-mongodb-extension-sidemenu.png
        :figwidth: 600px
        :alt: Image VSCode side bar menu.

      You can view your connected deployment under :guilabel:`Connections`.

      .. figure:: /images/vsce-expand-connections.png
        :figwidth: 600px
        :alt: Image showing connections pane