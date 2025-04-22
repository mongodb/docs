Architecture
````````````

The following diagram describes the architecture of a
{+csfle-abbrev+}-enabled application using a {+kmip-kms+}.

.. image:: /images/CSFLE_Data_Key_KMIP.png
   :alt: Diagram

.. important:: Client Accesses {+cmk-long+}

   When your {+csfle-abbrev+}-enabled application uses
   a {+kmip-kms+}, your application
   directly accesses your {+cmk-long+}.

kmsProviders Object
```````````````````

The following table presents the structure of a ``kmsProviders``
object for a {+kmip-kms+}:

.. note:: Authenticate through TLS/SSL

   Your {+csfle-abbrev+}-enabled application authenticates through 
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

.. _csfle-reference-kms-providers-kmip-datakeyopts:

dataKeyOpts Object
``````````````````

The following table presents the structure of a ``dataKeyOpts`` object
for a KMIP compliant {+km-service-long+}:

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
