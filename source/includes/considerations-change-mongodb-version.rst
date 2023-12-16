- Check the following documents for any considerations or 
  compatibility issues before changing a deployment's MongoDB version:

  - :manual:`The MongoDB Release Notes </release-notes>`

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

   - From version 5.0 to any version before 4.4.0
   - From version 4.4 to any version before 4.2.6
   - From version 4.2 to any version 4.0.12 (for Windows) or 4.0.7 
     (for Linux)
   - From version 4.0 to any version before 3.6.23

