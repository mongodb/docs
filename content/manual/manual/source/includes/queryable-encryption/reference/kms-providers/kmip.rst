Architecture
````````````

The following diagram describes the architecture of a
{+qe+} enabled application using a {+kmip-kms+}.

.. image:: /images/CSFLE_Data_Key_KMIP.png
   :alt: Diagram

.. important:: Client Accesses {+cmk-long+}

   When your {+qe+} enabled application uses
   a {+kmip-kms+} without specifying the ``delegated`` option, your application
   directly accesses your {+cmk-long+}. To avoid directly accessing your
   {+cmk-abbr+}, you can set the ``delegated`` option to ``true`` in your
   :ref:`dataKeyOpts object <qe-fundamentals-kms-providers-kmip-datakeyopts>`.

kmsProviders Object
```````````````````

The following table presents the structure of a ``kmsProviders``
object for a KMIP compliant {+kms-long+}:

.. note:: Authenticate through TLS/SSL

   Your {+qe+} enabled application authenticates through
   :abbr:`TLS/SSL (Transport Layer Security/Secure Sockets Layer)`
   when using KMIP.

.. list-table::
   :header-rows: 1
   :stub-columns: 1
   :widths: 20 12 68

   * - Field
     - Required
     - Description

   * - endpoint
     - Yes
     - Specifies a hostname and port number for the authentication server.

.. _qe-fundamentals-kms-providers-kmip-datakeyopts:

dataKeyOpts Object
``````````````````

The following table presents the structure of a ``dataKeyOpts`` object
for a KMIP compliant {+kms-long+}:

.. list-table::
    :header-rows: 1
    :stub-columns: 1
    :widths: 30 15 45

    * - Field
      - Required
      - Description

    * - keyId
      - No
      - The ``keyId`` field of a 96 byte
        `Secret Data managed object <http://docs.oasis-open.org/kmip/spec/v1.4/os/kmip-spec-v1.4-os.html#_Toc490660780>`__
        stored in your {+kmip-kms+}.

        If you do not specify the ``keyId`` field in the ``masterKey`` document
        you send to your {+kmip-kms+}, the driver creates a new
        96 Byte Secret Data managed object in your {+kmip-kms+} to act as your
        master key.

    * - endpoint
      - Yes
      - The URI of your {+kmip-kms+}.

    * - delegated
      - No
      - Set this option to ``true`` to delegate the encryption and decryption of your {+dek-abbr+} to your
        {+kmip-kms+}. Delegating these to the {+kmip-kms+} ensures that you
        never have direct access to the {+cmk-abbr+}.
        
        If you do not set the ``delegated`` option to ``true``, your application
        directly accesses and transports your {+cmk-long+} from the KMIP provider.

        :gold:`IMPORTANT:` The ``delegated`` option is not available in the
        Ruby, Go, or C++ drivers.
