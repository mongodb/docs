.. _qe-gcp-register-account:

.. procedure::
   :style: connected

   .. step:: Register or log in to your existing account on `Google Cloud <https://cloud.google.com>`__.

   .. step:: Create a service account for your project

      .. _qe-tutorial-automatic-gcp-register-service:

      To create a service account on Google Cloud, follow the
      `Creating a service account <https://cloud.google.com/iam/docs/creating-managing-service-accounts#creating>`__
      guide in Google's official documentation.

   .. step:: Add a service account key

      To add a service account key on Google Cloud, follow the
      `Managing service account keys <https://cloud.google.com/iam/docs/creating-managing-service-account-keys>`__
      guide in Google's official documentation.

      .. important::

         When creating your service account key, you receive a one-time
         download of the private key information. Make sure to download this
         file in either the PKCS12 or JSON format for use later in this
         tutorial.
