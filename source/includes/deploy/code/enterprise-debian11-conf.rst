
Create the list file for Debian 11 (Bullseye):

.. code-block:: bash

   echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-{+version+}.gpg ] http://repo.mongodb.com/apt/debian bullseye/mongodb-enterprise/{+version+} main" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise.list
