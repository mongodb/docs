You can use the following shell script to generate a valid RSA
private/public key pair and save each key to its own text file:

.. code-block:: shell
   
   # Generate an RSA SSH key pair
   # Save the key to a file called `rsa_key` when prompted
   ssh-keygen -t rsa -m PEM -b 2048 -C "2048-bit RSA Key"
   
   # Private Key
   cat rsa_key > rsa.private.txt
   # Public Key
   ssh-keygen -f rsa_key.pub -e -m pem > rsa.public.txt
