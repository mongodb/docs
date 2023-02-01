.. _csfle-reference-kms-providers-gcp-architecture:

Architecture
````````````

The following diagram describes the architecture of a
{+csfle-abbrev+}-enabled application using GCP KMS.

.. image:: /images/CSFLE_Data_Key_KMS.png
   :alt: Diagram KMS

.. include:: /includes/reference/kms-providers/cmk-note.rst

.. _csfle-kms-provider-object-gcp:

kmsProviders Object
```````````````````

The following table presents the structure of a ``kmsProviders``
object for GCP KMS:

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 12 68

   * - Field
     - Required
     - Description

   * - email
     - Yes
     - Identifies your service account email address.

   * - privateKey
     - Yes
     - | Identifies your service account private key in either
         `base64 string <https://en.wikipedia.org/wiki/Base64>`__ or
         :manual:`Binary subtype 0 </reference/mongodb-extended-json/#bson.Binary>`
         format without the prefix and suffix markers.
       |
       | Suppose your service account private key value is as follows:

       .. code-block:: none
           :copyable: false

           -----BEGIN PRIVATE KEY-----\nyour-private-key\n-----END PRIVATE KEY-----\n

       | The value you would specify for this field is:

       .. code-block:: none
           :copyable: false

           your-private-key

       | If you have a ``user-key.json`` credential file, you can extract
         the string by executing the following command in a bash or
         similar shell. The following command requires that you
         install `OpenSSL <https://www.openssl.org/source/>`__:

       .. code-block:: shell

           cat user-key.json | jq -r .private_key | openssl pkcs8 -topk8 -nocrypt -inform PEM -outform DER | base64 -w 0

   * - endpoint
     - No
     - Specifies a hostname and port number for the authentication server.
       Defaults to oauth2.googleapis.com.

.. _csfle-kms-datakeyopts-gcp:

dataKeyOpts Object
``````````````````

The following table presents the structure of a ``dataKeyOpts`` object for
GCP KMS:

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 30 15 45

   * - Field
     - Required
     - Description

   * - projectId
     - Yes
     - Identifier for your project in which you created the key.

   * - location
     - Yes
     - Region specified for your key.

   * - keyRing
     - Yes
     - Identifier for the group of keys your key belongs to.

   * - keyName
     - Yes
     - Identifier for the symmetric master key.

   * - keyVersion
     - No
     - Specifies the version of the named key. If not specified, the default
       version of the key is used.

   * - endpoint
     - No
     - Specifies the host and optional port of the Cloud KMS. The default
       is ``cloudkms.googleapis.com``.
