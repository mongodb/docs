Each cluster comes with a default set of resources. Clusters tier M10
and larger provide the ability to customize your storage capacity.

|service| provides the following storage configuration options,
depending on the selected cloud provider and cluster tier.

.. list-table::
   :widths: 20 20 60
   :stub-columns: 1

   * - Cluster Class
     - AWS only
     - Cluster tiers M40 and larger on AWS offer multiple options,
       including:

       - :guilabel:`Low CPU`
       - :guilabel:`General`
       - :guilabel:`Local NVMe SSD`

         Locally attached ephemeral :ref:`NVMe SSDs <nvme-storage>`
         offer the best performance.

       Select the :guilabel:`Class` box with your preferred speed.
       Changes to cluster class affect
       :ref:`cost <instance-size-costs>`.

   * - Storage Capacity
     -
     - The size of the server data volume. To change this, either:

       - Specify the exact disk size in the text box, *or*

       - Move the slide bar until the text box displays your preferred
         disk size.

       Changes to storage capacity affect
       :ref:`cost <instance-size-costs>`.

   * - Auto-Expand Storage
     -
     - Available on cluster tier M10 and larger. When disk usage
       reaches 90%, automatically increase storage to achieve 70%
       utilization. To enable this feature, check the box marked
       :guilabel:`Auto-expand storage when disk usage reaches 90%`.

       Changes to storage capacity affect
       :ref:`cost <instance-size-costs>`.

       Contact |service| support for guidance on oplog sizing for
       clusters with automatic storage expansion enabled. For details
       on how |service| handles reaching database storage limits, refer
       to the :ref:`FAQ page <faq-storage limit>`.

       .. note::

          AWS clusters with local :ref:`NVMe SSDs <nvme-storage>`
          cannot expand incrementally. When disk usage reaches 90%,
          NVMe clusters scale to the next available cluster tier, if
          any.

   * - |iops|
     - AWS only
     - .. include:: /includes/cluster-settings/provision-iops-note.rst

.. important::

   For cluster tiers up to and including M40, |service| enforces a
   50:1 ratio of disk storage to RAM to facilitate consistent
   performance of clusters with large datasets. For cluster tier
   M50 and higher, the enforced ratio is 100:1.

   .. example::

      To support 3 TB of disk storage you must select a cluster
      with at least 32 GB of RAM (M50 or higher).

   |service| has a 4 TB disk storage limit on all replica sets and
   shards, regardless of cluster. To expand total cluster
   storage beyond 4 TB, enable :ref:`sharding
   <cluster-option-sharding>`.

   For clusters with :guilabel:`Auto-Expand Storage` enabled,
   |service| respects the calculated maximum storage for the
   selected cluster. Users whose disk storage reaches the
   allowable limit receive notification by email.

For more information on the default resources and available
configuration options for each cloud service provider, see:

- :ref:`AWS Configuration Options <amazon-aws-configuration-options>`
- :ref:`GCP Configuration Options <google-gcp-configuration-options>`
- :ref:`Azure Configuration Options <microsoft-azure-configuration-options>`

.. seealso:: 

   :ref:`connection-limits`
