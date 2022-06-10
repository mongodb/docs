|service| doesn't migrate any user or role data to the target cluster.

If the source cluster enforced authentication, before you migrate you
must re-create the appropriate authentication mechanism used by your
applications on the target |service| cluster. The following table lists
authentication mechanisms and how to configure them in |service|.

.. list-table::
   :widths: 30 70
   :header-rows: 1

   * - Authentication Mechanism
     - Configuration Method

   * - SCRAM
     - :doc:`Create database users with SCRAM for password authentication 
       </security-add-mongodb-users>`.

   * - |ldap|
     - :ref:`Set up LDAP <ldaps-authentication-authorization>`.

   * - |aws| KMS, |azure| Key Vault, |gcp| KMS
     - :ref:`Set up KMS encryption <security-kms-encryption>`.

