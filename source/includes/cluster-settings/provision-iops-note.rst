|service| clusters on |aws| of size ``M30`` and greater allow you to
customize the maximum |iops| rate of your cluster. Low-CPU or
general class clusters of ``M30`` or greater tiers have a minimum of
ratio of |iops| to storage of 3:1. You can't change the |iops| of a
local |nvme| |ssd| class cluster. To set a greater |iops| rate for your
cluster, select :guilabel:`Provision IOPS` and either:

- Specify the exact |iops| rate in the text box, *or*

- Move the slide bar until the text box displays your preferred |iops|
  rate.

.. note::

   The available |iops| range for a cluster relates to disk
   :ref:`storage capacity <storage-capacity-ui>`. Changing your
   cluster's storage capacity changes the range of available |iops|.

   The default |iops| rate changes as the cluster's storage capacity
   changes. If you want to provision an exact |iops| value, enable
   provisioning.

   Changes to |iops| provisioning affect characteristics, performance
   and :ref:`cost <instance-storage-speed>`. When you select
   :guilabel:`Provision IOPS`, the storage changes from
   **General Purpose SSD** (:aws:`gp2 </AWSEC2/latest/UserGuide/EBSVolumeTypes.html#EBSVolumeTypes_gp2>`)
   volumes to **Provisioned IOPS SSD** (:aws:`io1 </AWSEC2/latest/UserGuide/EBSVolumeTypes.html#EBSVolumeTypes_piops>`)
   volumes.
