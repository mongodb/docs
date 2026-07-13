If your CA provided a separate chain file, you can also inspect
it:

.. code-block:: bash

   openssl x509 -in mongo0.crt -text -noout
   openssl x509 -in ca.pem -text -noout

Confirm that the certificate's ``Issuer`` and ``Subject`` fields, as well as
validity dates, look correct.