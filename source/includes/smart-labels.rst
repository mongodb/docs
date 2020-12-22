Smart labels for dates are axis markers grouped by units of time to reduce
repetition of information. They are generated automatically based on the range of
the chart when a ``date`` type field is encoded on an ``X`` or ``Y`` value axis. 

Smart labels are enabled by default when dates fields are encoded on value
axes on supported chart types. To toggle smart labels on and off:

1. Click the :guilabel:`Customize` tab above the :ref:`encoding channels
   <encoding-channels>` in the :doc:`Chart Builder </build-charts>`.
#. Expand the :guilabel:`Fields` section.
#. Select the desired field from the dropdown menu.
#. If the :guilabel:`Use Smart Labels on Axis` toggle swich is set
   to :guilabel:`Off`, toggle it to :guilabel:`On`.

.. figure:: /images/charts/smart-label-switch.png
   :figwidth: 220px
   :alt: Smart label toggle switch

.. note::

   When smart labels are enabled, date and time formatting options remain
   available. Any formatting options you apply are visible in the chart's
   tooltips.
