.. procedure::
   :style: normal

   .. step:: Provision hosts.

      Your hosts must meet the :ref:`backing-instances-prerequisites`
      requirements.

      .. important::

	 Configure the MongoDB deployment for your :term:`backing
	 databases` according to the :ref:`MongoDB Production Notes <production-notes>`. If you don't, the
	 MongoDB deployment might fail.

   .. step:: Install MongoDB on each host.

      Follow the steps to :ref:`Install MongoDB <tutorials-installation>`. If you install :product:`MongoDB Enterprise
      <mongodb-enterprise-advanced>` for the backing database, you
      must install the MongoDB Enterprise dependencies.

   .. step:: Deploy replica sets for each backing database.

      Follow the steps described in :ref:`Deploy one Replica Set <server-replica-set-deploy>` for each :term:`application database`.
      After deploying your application databases, you can install |onprem|
      using one of the following procedures:

      - :ref:`Install with RPM Package <om-install-rpm>`
      - :ref:`Install with DEB Package <om-install-deb>`
      - :ref:`Install from Archive with Linux <om-install-archive>`

      You can then perform managed :ref:`replica set deployment
      <om-deploy-replica-set>` with |onprem| for your remaining
      backing databases. Alternatively, you can :ref:`manually deploy replica sets <server-replica-set-deploy>` for each
      backing database.
