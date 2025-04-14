Starting in MongoDB 5.0, a new SELinux policy is available for 
MongoDB installations that:

- Use an ``.rpm`` installer.
- Use default configuration settings.
- Run on RHEL7 or later.

If your installation does not meet these requirements, refer to the
:ref:`SELinux Instructions
<install-enterprise-tarball-rhel-configure-selinux>` for ``.tgz``
packages.

.. note::

   If your MongoDB deployment uses custom settings for any of the
   following:

   - :doc:`MongoDB connection ports </reference/default-mongodb-port>`
   - :setting:`~storage.dbPath`
   - :setting:`systemLog.path`
   - :setting:`~processManagement.pidFilePath`

   You cannot use the MongoDB supplied SELinux policy. An alternative
   is to create a :ref:`custom SELinux policy
   <install-enterprise-tarball-rhel-configure-selinux>`, however an 
   improperly written custom policy may be less secure or may stop your
   :binary:`mongod` instance from working.

Install the SELinux Policy
++++++++++++++++++++++++++

#. Ensure you have the following packages installed:

   - ``git``
   - ``make``
   - ``checkpolicy``
   - ``policycoreutils``
   - ``selinux-policy-devel``

   .. code-block:: bash

      sudo yum install git make checkpolicy policycoreutils selinux-policy-devel

#. Download the policy repository.

   .. code-block:: bash

      git clone https://github.com/mongodb/mongodb-selinux

#. Build the policy.

   .. code-block:: bash

      cd mongodb-selinux
      make

#. Apply the policy.

   .. code-block:: bash

      sudo make install

.. important:: Backward-Incompatible Feature

   .. include:: /includes/downgrade-for-SELinux-policy.rst

SELinux Policy Considerations
+++++++++++++++++++++++++++++

- The SELinux policy is designed to work with the configuration that
  results from a standard MongoDB ``.rpm`` package installation. See 
  `standard installation assumptions
  <https://github.com/mongodb/mongodb-selinux/blob/master/README.md#standard-installation>`__
  for more details.

- The SELinux policy is designed for :binary:`~bin.mongod` servers. It
  does not apply to other MongoDB daemons or tools such as: 

  - :binary:`~bin.mongos`
  - :binary:`~bin.mongosh`
  - :ref:`mongocryptd`

- The `reference policy
  <https://github.com/SELinuxProject/refpolicy/blob/master/policy/modules/services/mongodb.if>`__ 
  supplied by the SELinux Project includes a ``mongodb_admin`` macro.
  This macro is not included in the MongoDB SELinux policy. An
  administrator in the ``unconfined_t`` domain can manage
  :binary:`mongod`.

- To uninstall the policy, go to the directory where you downloaded the
  policy repository and run: 

  .. code-block:: bash

     sudo make uninstall
