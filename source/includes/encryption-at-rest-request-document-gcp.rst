.. list-table::
   :widths: 15 10 10 65
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - ``googleCloudKms``
     - object
     - Required
     - |gcp| |kms| configuration details and whether
       {+encrypt-at-rest+} is enabled for |a-service| project.

   * - | ``googleCloudKms``
       | ``.enabled``
     - boolean
     - Required
     - Flag that indicates whether {+encrypt-at-rest+} is enabled for
       |a-service| project. To disable {+encrypt-at-rest+}, pass only
       this parameter with a value of ``false``. When you disable
       {+encrypt-at-rest+}, |service| also removes the configuration
       details.

   * - | ``googleCloudKms``
       | ``.serviceAccountKey``
     - string
     - Optional
     - String-formatted |json| object containing |gcp| |kms|
       credentials from your |gcp| account.

       .. note::

          Your Service Account Key is a |json| object, but it must be
          formatted as a string for API call purposes.

       .. seealso::

          To learn more about authentication, see the
          :gcp:`GCP documentation </docs/authentication/getting-started>`.

   * - | ``googleCloudKms``
       | ``.keyVersionResourceID``
     - string
     - Optional
     - Key Version Resource ID from your |gcp| account.
