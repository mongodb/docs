Select the method you want to use to connect to your deployment
using the selector option at the top of the page.  
|vsce| provides three options to connect to your deployment:

.. list-table::
   :header-rows: 1
   :widths: 20 40

   * - Connection Method
     - Description

   * - :guilabel:`Connect with Connection String`
     - This method is faster and easier than 
       using the advanced connection settings. Use this option 
       if your deployment is hosted on |service| or you already have a 
       connection string for a deployment available.

   * - :guilabel:`Advanced Connection Settings`
     - This method lets you build a connection string with a form.
       Use this option if you need to customize the connection 
       string and want to see available connection options.

   * - :guilabel:`Atlas CLI`
     - This method lets you connect using existing Atlas CLI 
       configurations. Use this option if you want to connect to
       an Atlas deployment and have installed the Atlas CLI.

.. note::

   To specify where |vsce| connections are saved, use 
   the :guilabel:`Default Connection Saving Location`
   :ref:`setting <vsce-settings>`.

   |vsce| uses the VS Code API to store and encrypt connection strings 
   and credentials. To learn more about how VS Code encrypts connections, see the 
   `VS Code API documentation <https://code.visualstudio.com/api/references/vscode-api#SecretStorage>`__.