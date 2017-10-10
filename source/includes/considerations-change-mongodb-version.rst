- Check the following documents for any considerations or compatibility issues
  before changing a deployment's MongoDB version:

  - :manual:`The MongoDB Release Notes </release-notes>`

  - The documentation for your driver.

  - :doc:`/reference/mongodb-compatibility`

- Plan the version change during a predefined maintenance window.

- Change the MongoDB version on a staging environment before changing a
  production environment. Your staging environment should mirror your
  production environment. This can help avoid compatibility issues that may
  result in downtime for your production deployment.

- Follow the :manual:`MongoDB release notes </release-notes>` when performing
  manual upgrades of :term:`replica sets <replica set>` and
  :term:`sharded clusters <sharded cluster>`.

- Perform any *downgrades* in *two* stages if your MongoDB configuration file
  includes options incompatible with the earlier MongoDB version:

  1. Remove the configuration settings specific to the newer MongoDB
     version. Deploy those changes.

     .. example::
        If you are running MongoDB version 3.0 with the :guilabel:`engine`
        option set to ``mmapv1``, and want to downgrade to MongoDB 2.6, you
        must first remove the :guilabel:`engine` option. MongoDB 2.6 does not
        support that option.

  2. Update the MongoDB version. Deploy that change.

.. admonition:: Downgrade Limitations
   :class: note

   **Downgrading from 3.6**

   - You may not downgrade a MongoDB deployment from version 3.6 to
     :ref:`any version before 3.4 <3.6-compatibility-enabled>`.

   - |mms| blocks users attempts to downgrade from
     ``featureCompatibilityVersion=3.6`` to
     ``featureCompatiblityVersion=3.4``.

   **Downgrading from 3.4**

   - You may not downgrade a MongoDB deployment from version 3.4 to
     :manual:`any version before 3.2.8 </release-notes/3.4-downgrade>`.

   - |mms| blocks users attempts to downgrade from
     ``featureCompatibilityVersion=3.4`` to
     ``featureCompatiblityVersion=3.2``.
