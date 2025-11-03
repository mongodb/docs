.. procedure::
   :style: normal

   .. step:: (Optional) Remove any existing mongosh binaries from your system

      If you skip this step, overwrite the existing ``mongosh``
      binary when you install the new version.

   .. step:: Open the MongoDB Shell download page

      Open the `MongoDB Download Center
      <https://www.mongodb.com/try/download/shell?jmp=docs>`__.

   .. step:: Select your platform and package
      
      a. In the :guilabel:`Platform` dropdown, select |platform|.
      b. In the :guilabel:`Package` dropdown, select |package|.

   .. step:: Click :guilabel:`Download`

   .. step:: Extract the files from the downloaded archive

      The archive contains a ``bin`` folder with the following binaries:
      
      - ``mongosh``
      - ``mongosh_crypt``

   .. step:: Add the path to the extracted bin folder to your system PATH

   .. step:: Verify the installation

      .. include:: /includes/mongosh-verify-build-info.rst
