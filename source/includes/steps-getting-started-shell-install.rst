.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-db-deployments-page.rst
      
   .. step:: Click :guilabel:`Connect`.
      
      Click :guilabel:`Connect` for the {+database-deployment+} to 
      which you want to connect.
      
   .. step:: Click :guilabel:`Shell`.
      
   .. step:: Click :guilabel:`I do not have the MongoDB Shell installed`.

      Select your operating system from the dropdown.
      
   .. step:: Download the MongoDB Shell.
      
      - If you are using :guilabel:`Windows` or :guilabel:`Linux`,
        download using one of the following options:
      
        - Click :guilabel:`Download mongosh` to
          begin the download.
      
        - Click :guilabel:`Copy download URL` to copy a
          download |url| to your clipboard, then either:
      
          - Use ``curl`` to fetch the installer file,
            or
      
          - Paste the |url| in a browser window.
      
        .. include:: /includes/facts/download-center-link.rst   
      
      - If you are using :guilabel:`macOS`, you can use the provided
        Homebrew command to download the shell.
      
   .. step:: Install the MongoDB Shell.

      Select the appropriate tab based on your operating system:
      
      .. include:: /includes/fact-add-shell-to-path.rst
      
      You should now be able to run {+mongosh+} using your terminal.
      
   .. step:: Test your MongoDB Shell installation.

      To see if you have correctly added {+mongosh+} to
      your system
      path, run the following command in your terminal:
      
      .. code-block:: none
      
         mongosh --version
      
      You should see an output similar to the following:
      
      .. code-block:: none
         :copyable: false
      
         0.14.0    
