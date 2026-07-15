- Check the following documents for any considerations or 
  compatibility issues before changing a deployment's MongoDB version:

  - :ref:`The MongoDB Release Notes <server-release-notes-landing>`

  - The documentation for your driver.

  - :doc:`/reference/mongodb-compatibility`

- Plan the version change during a predefined maintenance window.

- Change the MongoDB version on a staging environment before changing a
  production environment. Your staging environment should mirror your
  production environment. This can help avoid compatibility issues 
  that may result in downtime for your production deployment.

- Follow the :ref:`MongoDB release notes <server-release-notes-landing>` when 
  performing manual upgrades of :term:`replica sets <replica set>` and
  :term:`sharded clusters <sharded cluster>`.


.. note:: Downgrading Limitations

   You cannot downgrade a MongoDB deployment:

   - From version 5.0 to any version before 4.4.0
