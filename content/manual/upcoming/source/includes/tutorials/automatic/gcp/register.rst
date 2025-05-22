.. _gcp-register-account:

a. Register or log into your existing account on `Google Cloud <https://cloud.google.com>`__.

#. Create a service account for your project

   .. _csfle-tutorial-automatic-gcp-register-service:

   To create a service account on Google Cloud, follow the
   `Creating a service account <https://cloud.google.com/iam/docs/creating-managing-service-accounts#creating>`__
   guide in Google's official documentation.

#. Add a service account key

   To add a service account key on Google Cloud, follow the
   `Managing service account keys <https://cloud.google.com/iam/docs/creating-managing-service-account-keys>`__
   guide in Google's official documentation.

   .. tabs-drivers::

      .. tab::
         :tabid: java-sync

         .. important::

            When creating your service account key, you receive a one-time
            download of the private key information. Unless you are using an
            attached service account, make sure to download this
            file in either the PKCS12 or JSON format for use later in this
            tutorial.

      .. tab::
         :tabid: nodejs

         .. include:: /includes/tutorials/automatic/gcp/record-credentials.rst
         
      .. tab::
         :tabid: python

         .. include:: /includes/tutorials/automatic/gcp/record-credentials.rst

      .. tab::
         :tabid: csharp

         .. include:: /includes/tutorials/automatic/gcp/record-credentials.rst

      .. tab::
         :tabid: go

         .. include:: /includes/tutorials/automatic/gcp/record-credentials.rst
