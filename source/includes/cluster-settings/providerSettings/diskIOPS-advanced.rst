Maximum input/output operations per second (IOPS) the cluster can
perform. The possible values depend on the selected
**replicationSpecs[n].regionConfigs[m].<type>Specs.instanceSize** and **diskSizeGB**.

This setting requires you to:

- Set **replicationSpecs[n].regionConfigs[m].<type>Specs.instanceSize** to **M30** or greater
- Not use |nvme-clusters|.

To view the possible range of |iops| values for the selected instance
size and storage capacity:

#. Open the |service| web console.
#. Select :guilabel:`Build a New Cluster`.
#. Under :guilabel:`Cloud Provider & Region`, select **AWS**.
#. Under :guilabel:`Cloud Provider & Region`, select the region
   corresponding to your configured
   **replicationSpecs[n].regionConfigs[m].regionNamee**.
#. Under :guilabel:`Cluster Tier`, select the cluster tier
   corresponding to your configured
   **replicationSpecs[n].regionConfigs[m].<type>Specs.instanceSize**.
#. Under :guilabel:`Cluster Tier`, set the :guilabel:`Storage Capacity`
   slider to your configured **diskSizeGB**. You can also enter the
   exact value of **diskSizeGB** in the box to the right of the slider.

Click :guilabel:`Provision IOPS` to see the available |iops| range.

If you set the **diskIOPS** value to a value higher than the default
value for the selected volume size, Atlas automatically sets
**replicationSpecs[n].regionConfigs[m].<type>Specs.ebsVolumeType**
to **PROVISIONED**. If you manually set **diskIOPS** to the default
value, you must specify
**replicationSpecs[n].regionConfigs[m].<type>Specs.ebsVolumeType**
to be either **PROVISIONED** or **STANDARD**.

This parameter defaults to the cluster tier's :guilabel:`Standard IOPS`
value, as viewable in the |service| console.

If you change this value, the cluster cost also changes. To learn more,
see :ref:`billing <storage-speed>`.
