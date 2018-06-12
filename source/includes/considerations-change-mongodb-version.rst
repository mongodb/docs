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
  performing manual upgrades of :term:`replica sets <replica set>` and
  :term:`sharded clusters <sharded cluster>`.


.. admonition:: Downgrading Limitations
   :class: note

   You cannot downgrade a MongoDB deployment:

   - From version 3.6 to any version before 3.4.0
   - From version 3.4 to any version before 3.2.8

