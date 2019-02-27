.. _provider-settings-disk-iops:

.. note::

   Requires that ``providerSettings.instanceSizeName`` be
   ``M30`` or greater.

.. include:: /includes/fact-not-available-with-nvme.rst

The maximum input/output operations per second (IOPS) the system can
perform. The possible values depend on the selected
``providerSettings.instanceSizeName`` and
``diskSizeGB``.

To view the possible range of |iops| values for the selected instance
size and storage capacity:

#. Open the |service| web interface.
#. Select :guilabel:`Build a New Cluster`.
#. Under :guilabel:`Cloud Provider & Region`, select ``AWS``.
#. Under :guilabel:`Cloud Provider & Region`, select the region
   corresponding to your configured ``providerSettings.regionName``.
#. Under :guilabel:`Cluster Tier`, select the instance size
   corresponding to your configured
   ``providerSettings.instanceSizeName``.
#. Under :guilabel:`Cluster Tier`, set the :guilabel:`Storage Capacity`
   slider to your configured ``diskSizeGB``. Alternatively, input the
   exact value of ``diskSizeGB`` in the input box to the right of the
   slider.

You can see the available |iops| range by checking the
:guilabel:`Provision IOPS` box.

.. note::

   If you set the ``diskIOPS`` value to a value higher than the
   default value for the selected volume size, Atlas automatically sets
   :ref:`providerSettings.volumeType
   <provider-settings-volume-type>` to ``PROVISIONED``. If you manually
   set ``diskIOPS`` to the default value, you must specify
   :ref:`providerSettings.volumeType
   <provider-settings-volume-type>` to be either ``PROVISIONED`` or
   ``STANDARD``.

The default value for ``providerSettings.diskIOPS`` is the same as the
instance size's :guilabel:`Standard IOPS` value, as viewable in the
|service| interface.

Changing this value affects the cost of running the cluster
as described in the :ref:`billing <storage-speed>` documentation.
