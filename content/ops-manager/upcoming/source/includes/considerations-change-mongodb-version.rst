- Check the following documents for any considerations or 
  compatibility issues before changing a deployment's MongoDB version:

  - :manual:`The MongoDB Release Notes </release-notes>`
  
    .. include:: /includes/fact-mongodb-5.0-to-6.0.rst

  - The documentation for your driver.

  - :doc:`/reference/mongodb-compatibility`

- Plan the version change during a predefined maintenance window.

- Change the MongoDB version on a staging environment before changing a
  production environment. Your staging environment should mirror your
  production environment. This can help avoid compatibility issues 
  that may result in downtime for your production deployment.

- Follow the :manual:`MongoDB release notes </release-notes>` when 
  performing manual upgrades of :manual:`replica sets </reference/glossary/#std-term-replica-set>` and
  :manual:`sharded clusters </reference/glossary/#std-term-sharded-cluster>`.


.. note:: Downgrading Limitations

   You cannot downgrade a MongoDB deployment:

   - From version 6.0 to any version before 4.4.0
