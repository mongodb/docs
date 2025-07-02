Maximum input/output operations per second (IOPS) the cluster can
perform. The possible values depend on the selected
**providerSettings.instanceSizeName** and **diskSizeGB**.

This setting requires that **providerSettings.instanceSizeName** to be
**M30** or greater and cannot be used with |nvme-clusters|.

To view the possible range of |iops| values for the selected instance
size and storage capacity:

#. Open the |service| web console.
#. Select :guilabel:`Build a New Cluster`.
#. Under :guilabel:`Cloud Provider & Region`, select **AWS**.
#. Under :guilabel:`Cloud Provider & Region`, select the region
   corresponding to your configured **providerSettings.regionName**.
#. Under :guilabel:`Cluster Tier`, select the cluster tier
   corresponding to your configured
   **providerSettings.instanceSizeName**.
#. Under :guilabel:`Cluster Tier`, set the :guilabel:`Storage Capacity`
   slider to your configured **diskSizeGB**. Alternatively, input the
   exact value of **diskSizeGB** in the input box to the right of the
   slider.

Click :guilabel:`Provision IOPS` to see the available |iops| range.

If you set the **diskIOPS** value to a value higher than the
default value for the selected volume size, Atlas automatically sets
**providerSettings.volumeType** to **PROVISIONED**. If you manually
set **diskIOPS** to the default value, you must specify
**providerSettings.volumeType** to be either **PROVISIONED** or
**STANDARD**.

The default value for **providerSettings.diskIOPS** is the same as the
cluster tier's :guilabel:`Standard IOPS` value, as viewable in the
|service| console.

Changing this value affects the cost of running the cluster
as described in the :ref:`billing <storage-speed>` documentation.
