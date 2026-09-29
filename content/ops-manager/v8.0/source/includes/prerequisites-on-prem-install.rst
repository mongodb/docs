You must have administrative access on the hosts to which you install.

Before you install |onprem|, you must:

1. Plan your configuration. See :doc:`/core/installation-checklist`.

2. Deploy hosts that meet the :doc:`/core/requirements`.

   .. include:: /includes/admonitions/warning-follow-requirements.rst

3. :doc:`Install the Ops Manager Application Database and optional
   Backup Database </tutorial/prepare-backing-mongodb-instances>`. The
   databases require *dedicated* MongoDB instances. *Don't* use
   MongoDB installations that store other data. |onprem| requires the
   Backup Database if you use the Backup feature.

   The |application| must authenticate to the backing databases as a
   MongoDB user with appropriate access.

   .. seealso::

      To learn more about connecting to your backing database with
      authentication, see :setting:`mongo.mongoUri`.

   .. note::

      You must deploy :term:`application databases <application
      database>` manually. However, you can deploy backup databases
      with |onprem|. For more information, see :ref:`Deploy Backing
      Databases <deploy-om-appdb>`.

4. Install and verify an Email Server. |onprem| needs an email server
   to :ref:`send alerts <create-alert-configuration>` and recover
   :ref:`user accounts <profile-page>`. You may use an SMTP Server or
   an |aws| |ses| server. To configure your Email Server, see
   :setting:`Email Delivery Method Configuration`.
