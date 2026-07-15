Copy your ``.pem`` files to the directory where you plan to store TLS
assets for MongoDB. You will reference these paths in your MongoDB configuration
file in the next tutorial. 

You might need to copy the ``.pem`` files onto
the remote server on which you host your node. Additionally, ensure you
secure your files with appropriate permissions, such as read-only access for the owner.

In Linux/MacOS:

.. code-block:: bash

   sudo mkdir -p /etc/ssl/mongodb
   sudo cp mongo0.pem ca.pem /etc/ssl/mongodb

In Windows PowerShell:

.. code-block:: shell

   New-Item -ItemType Directory -Path C:\tls\mongodb -Force
   Copy-Item mongo0.pem,ca.pem `
     -Destination C:\tls\mongodb
