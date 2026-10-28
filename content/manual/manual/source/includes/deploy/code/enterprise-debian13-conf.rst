
Create the list file for Debian 13 (Trixie):

.. code-block:: bash

   echo "deb [ signed-by=/usr/share/keyrings/mongodb-server-{+pgp-version+}.gpg ] https://repo.mongodb.com/apt/debian trixie/mongodb-enterprise/{+version+} main" | sudo tee /etc/apt/sources.list.d/mongodb-enterprise.list
