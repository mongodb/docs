You must combine your certificate and its private key to create a ``.pem``
file. For example, on Linux or MacOS:

.. code-block:: bash

    cat mongo0.crt mongo0.key > mongo0.pem

In Windows PowerShell:

.. code-block:: shell
    
    type mongo0.crt mongo0.key > mongo0.pem
