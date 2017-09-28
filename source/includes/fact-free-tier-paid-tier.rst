|service| provides an option to deploy one Free Tier replica set per project.
Free Tier clusters use |service| ``M0`` instances and provide access to a
subset of |service| features and functionality. They are an ideal development
sandbox. You can :doc:`upgrade </scale-cluster>` an ``M0`` Free Tier cluster
to an ``M2+`` paid cluster at any time.

``M2`` and ``M5`` instances are low-cost shared starter clusters with the same
features as and functionality as ``M0``, but with increased storage and the
ability to deploy into a subset of regions on Amazon Web Service (AWS), Google
Cloud Platform (GCP), and Microsoft Azure.

For a complete list of ``M0`` (Free Tier), ``M2``, and ``M5`` limitations, see
:ref:`atlas-free-tier`.

|service| ``M10`` and larger instances are dedicated clusters that provide
full access to |service| features, configuration options, and operational
capabilities. 

An |service| :ref:`project <create-project>` can have multiple ``M2+``
MongoDB clusters. ``M0``, ``M2``, and ``M5`` are appropriate for starter
environments. ``M10`` and ``M20`` instances are appropriate for
low-traffic websites and applications. ``M30`` or larger instances
should be used for high-traffic websites, large data sets, and sharded
clusters.

The following table highlights key differences between an ``M0`` Free Tier
cluster, an ``M2`` or ``M5`` shared starter cluster, and an ``M10+``  
dedicated cluster. 

.. include:: /includes/list-table-free-paid-compare.rst