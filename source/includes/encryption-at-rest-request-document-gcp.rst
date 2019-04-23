.. list-table::
   :widths: 10 10 80
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Description

   * - ``googleCloudKms``
     - object
     - Specifies |gcp| KMS configuration details and whether
       Encryption at Rest is enabled for an |service| project.

   * - ``googleCloudKms.enabled``
     - boolean
     - Specifies whether Encryption at Rest is enabled for an |service|
       project.  To disable Encryption at Rest, pass only this parameter
       with a value of ``false``.  When you disable Encryption at Rest,
       |service| also removes the configuration details.

   * - ``googleCloudKms.serviceAccountKey``
     - string
     - String-formatted JSON object containing |gcp| KMS credentials
       from your GCP account.

       .. note::

          Your Service Account Key is a JSON object, but it must be
          formatted as a string for API call purposes.

       For more information, see the `GCP
       documentation
       <https://cloud.google.com/docs/authentication/getting-started>`__.

   * - ``googleCloudKms.keyVersionResourceID``
     - string
     - The Key Version Resource ID from your GCP account.
