|service| displays the cloud provider regions based on the cloud
provider where your cluster is deployed. For multi-cloud clusters,
|service| displays the cloud provider regions of the highest
priority provider. |service| displays a :icon-fa5:`star` next to
the region that closely or exactly matches the region where your
cluster is deployed.

.. tabs::

   .. tab:: AWS
      :tabid: aws

      For |service| {+cluster+}\s deployed on |aws|, you can select
      one of the following regions:

      .. include:: /includes/list-table-adf-supported-aws-regions.rst

   .. tab:: Azure
      :tabid: azure

      For |service| {+cluster+}\s deployed on |azure|, you can select
      an |azure| region only if there are no other
      {+Online-Archive+}\s on the {+cluster+} that are using a
      different cloud provider. If an existing {+Online-Archive+} on
      the {+cluster+} uses |aws| or |gcp| for storing archived data,
      you can only select |aws| or |gcp| regions for any new
      {+Online-Archive+}\s on that {+cluster+}.

      :gold:`IMPORTANT:` For a {+cluster+} deployed on |azure|, if
      you have existing {+Online-Archive+}\s that use |aws| or |gcp|
      and you delete them, you must wait five days before you can
      create a new {+Online-Archive+} that uses |azure|. Within this
      five-day period, any attempts to create a new
      {+Online-Archive+} still default to the cloud provider that you
      originally selected.

      For |service| {+cluster+}\s deployed on |azure|, you can select
      one of the following regions:

      .. include:: /includes/list-table-adf-supported-azure-regions.rst

   .. tab:: GCP
      :tabid: gcp

      For |service| {+cluster+}\s deployed on |gcp|, you can select a
      |gcp| region only if there are no other {+Online-Archive+}\s on
      the {+cluster+} that are using a different cloud provider. If an
      existing {+Online-Archive+} on the {+cluster+} uses |aws| or
      |azure| for storing archived data, you can only select |aws| or
      |azure| regions for any new {+Online-Archive+}\s on that
      {+cluster+}.

      :gold:`IMPORTANT:` For a {+cluster+} deployed on |gcp|, if you
      have existing {+Online-Archive+}\s that use |aws| or |azure|
      and you delete them, you must wait five days before you can
      create a new {+Online-Archive+} that uses |gcp|. Within this
      five-day period, any attempts to create a new
      {+Online-Archive+} still default to the cloud provider that you
      originally selected.

      For |service| {+cluster+}\s deployed on |gcp|, you can select
      one of the following regions:

      .. include:: /includes/list-table-adf-supported-gcp-regions.rst

:gold:`IMPORTANT:` Once |service| creates the online archive, you
can't modify the storage region.
