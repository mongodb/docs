.. tip::

   You saved a file containing your service account key credentials
   in the :ref:`Create a GCP Service Account <gcp-register-account>`
   step of this guide.

   If you downloaded your credentials in JSON format, you can
   use the following command to extract the value of your private
   key, substituting ``<credentials-filename>`` with the name of
   your credentials file. The following command requires that you
   install `OpenSSL <https://www.openssl.org/source/>`__:

   .. code-block::
      :copyable: true

      cat <credentials-filename> | jq -r .private_key | openssl pkcs8 -topk8 -nocrypt -inform PEM -outform DER | base64

   If you downloaded your credentials in PKCS12 format, you need to
   specify your GCP service account import password and to add a
   PEM pass phrase to access the key when accessing it using the
   following command, substituting ``<credentials-filename>`` with
   the name of your credentials file:

   .. code-block::
      :copyable: true

      openssl pkcs12 -info -in <credentials-filename>
