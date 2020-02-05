.. _atlas_20200204:

04 February 2020 Release
~~~~~~~~~~~~~~~~~~~~~~~~

- Supports using Google authentication for MongoDB Cloud user login.
- Introduces
  `account.mongodb.com <https://account.mongodb.com/account/login>`__: a
  unified login experience for MongoDB Cloud, Support, JIRA, and
  Feedback.

.. _atlas_20200128:

28 January 2020 Release 
~~~~~~~~~~~~~~~~~~~~~~~~

- :ref:`Continuous Backup <backup-continuous>` is no longer an option for new
  AWS-backed clusters. Newly deployed AWS-backed clusters will use
  :ref:`Cloud Provider Snapshots <backup-cloud-provider>` for backup. 

- Customers with :ref:`project-level maintenance windows
  <atlas-modify-project-settings>` enabled can now receive the 72-hour alert
  notification in their configured alerts destination.

.. _atlas_20200107:

07 January 2020 Release 
~~~~~~~~~~~~~~~~~~~~~~~~

- Modifies behavior so that clusters enter a terminal state after 
  customers revoke MongoDB |service| encryption keys that they 
  manage with |aws| KMS, |gcp| KMS, or |azure| Key Vault.

- Ability to manage :ref:`{+aws-pl+} via API <private-endpoint-api>`.