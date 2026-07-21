You must add your |vpc| |cidr| block address (or subset)
associated with the peer |vpc| to the
:ref:`IP access list <access-list>` before your new |vpc| peer
can connect to your |service| cluster. When connecting to your
cluster, you must use the new :ref:`private connection strings
<atlas-faq-connstring-private>` to utilize the peering.

.. seealso::

   :gcp:`Auto mode IP ranges </vpc/docs/vpc#ip-ranges>`.

Rolling Back a |gcp| Container with a Restricted Set of Regions
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

After a |gcp| container with a restricted set of regions is generated,
that project is locked into that set of regions. Any attempts to use other
regions will generate an error message similar to what you find below:

.. code-block::
   :copyable: false

   There are no more regions supported with your existing configuration. Try changing to
   a different cluster tier or changing your region configuration.

To resolve this error, follow this general process:

1. :ref:`Remove all clusters from the Google Cloud container <terminate-cluster>`.

#. Delete the |gcp| container using the {+atlas-admin-api+}. See :oas-bump-atlas-op:`Remove One
   Network Peering Container <deletepeeringcontainer>`.

#. Create a new |gcp| container without restricted regions with an Atlas CIDR block of
   at least ``/18`` using the {+atlas-admin-api+}. See :oas-bump-atlas-op:`Create a New Network
   Peering Container <createpeeringcontainer>`.
