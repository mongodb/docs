.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-create-new-cluster.rst

   .. step:: Open Advanced Configuration.

      Navigate to the bottom of the page and click
      :guilabel:`Go to Advanced Configuration`.

   .. step:: Select the cluster edition.

      To create an {+atlas-infinite-cluster+}, turn on the
      :guilabel:`Try the new edition: Atlas Infinite` toggle. To create
      an {+atlas-core-cluster+}, leave the toggle off.
      {+atlas-core-full+} couples compute and storage on the same node.
      {+atlas-infinite-full+} runs them as separate layers that scale
      independently. To compare the two editions, see
      :ref:`atlas-editions`.

   .. step:: Select a {+cluster+} type.

      During public preview, {+atlas-infinite-full+} supports replica
      sets only. A single {+atlas-infinite-cluster+} replica set stores
      up to 128 TB (logical), so you can grow to large data sizes
      without sharding. Sharded clusters are available on
      {+atlas-core-full+}.

      .. include:: /includes/steps-choose-deployment-type-advanced.rst

   .. step:: Select your preferred :guilabel:`Cloud Provider & Region`.

      .. include:: /includes/steps-choose-provider-region-advanced.rst

      During public preview, {+atlas-infinite-cluster+}s support
      :ref:`select AWS regions <atlas-infinite-aws-regions>`.

   .. step:: Select the :guilabel:`Cluster Tier`.
      
      .. include:: /includes/infinite/fact-cluster-tiers-infinite-core-difference.rst

      During public preview, {+atlas-infinite-cluster+}s support the
      ``M10`` through ``M60`` :guilabel:`General` cluster tiers and the
      ``M40`` through ``M60`` :guilabel:`Low-CPU` cluster tiers. To
      learn more, see :ref:`supported cluster tiers
      <atlas-infinite-modify-tier>`.

      To choose an appropriate tier and storage settings for your
      workload, see :ref:`create-cluster-instance` and
      :ref:`create-cluster-storage`.

      At this step, you can also:

      - :ref:`Select your cluster's generation <gen2-clusters>` for
        ``M30+`` {+Dedicated-clusters+} on |aws| or |gcp|. This applies to
        {+atlas-core-cluster+}s only. {+atlas-infinite-cluster+}s of
        ``M30`` and larger always run Gen2, and the ``M10`` and ``M20``
        cluster tiers have no generation.

      - :ref:`Select a different tier for your Search Nodes
        <select-tiers-for-search-nodes>`. During public preview,
        {+atlas-infinite-cluster+}s don't support Search Node tier
        selection.

      - .. include:: /includes/fact-analytics-nodes-tier.rst

        Both {+atlas-core-cluster+}s and {+atlas-infinite-cluster+}s
        support analytics nodes.

      An {+atlas-infinite-cluster+} supports up to 5 read-only and
      analytics nodes combined, in addition to its 2 electable nodes,
      for a maximum of 7 nodes.

   .. step:: Select any :guilabel:`Additional Settings`.

      From the :guilabel:`Additional Settings` section, you can:

      - :ref:`create-cluster-version`

        On {+atlas-infinite-cluster+}s, {+service+} sets the MongoDB
        version and you can't change it.

      - :ref:`create-cluster-backups`

        On {+atlas-infinite-cluster+}s, this setting is
        :guilabel:`Additional Backup Retention`.

      - :ref:`create-cluster-termination-protection`

      - :ref:`create-cluster-sharding`

      - :ref:`create-cluster-shardNum`

        {+atlas-infinite-cluster+}s don't support sharding, so these
        two settings are unavailable.

      - :ref:`create-cluster-enable-encryption`

      - :ref:`create-cluster-more-configuration-options`

   .. step:: Specify the :guilabel:`Cluster Details`.

      From the :guilabel:`Cluster Details` section, you can:

      - Specify the :guilabel:`Cluster Name`.

        This label identifies the {+cluster+} in |service|, and
        |service| creates your hostname based on it. You can't change
        the {+cluster+} name after |service| deploys the {+cluster+}.
        {+Cluster+} names can't exceed 64 characters in length.

        .. include:: /includes/admonitions/importants/cluster-naming-limitations.rst

      - :ref:`Apply tags to the {+cluster+} <apply-tags-new-cluster>`.

        .. include:: /includes/fact-sensitive-info-resource-tags.rst

   .. step:: Proceed to checkout.

      Click :guilabel:`Create Cluster` below the form.

      The billing address, payment method, and cost review steps that
      follow apply only if your organization doesn't have billing
      information on file.

   .. step:: Update your Billing Address details as needed.

      .. include:: /includes/step-update-address.rst

   .. step:: Update your Payment Method details as needed.

      .. include:: /includes/step-add-payment.rst

   .. step:: Review the project's cost.

      .. include:: /includes/step-review-costs.rst

   .. step:: Deploy your {+cluster+}.

      Click :guilabel:`Confirm and Deploy Cluster`.

      .. important::

         .. include:: /includes/fact-database-deployment-project-limit-lettered.rst

         .. include:: /includes/footnote-databearing.rst   
