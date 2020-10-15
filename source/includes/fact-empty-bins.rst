Empty Bins
~~~~~~~~~~

When binning is enabled, |charts-short| displays entries for
empty bins within the minimum and maximum data range a chart displays.

.. note:: Exception

   |charts-short| doesn't display empty bins if including them results
   in more than 5000 unique bins on a chart.

The value |charts-short| uses for empty bins depends on the
aggregation function you choose:

.. list-table::
   :header-rows: 1
   :widths: 2 1

   * - Aggregation Function
     - Inferred Value

   * - ``count`` or ``distinct``
     - ``0``

   * - All Other Functions
     - ``null``

|charts-short| displays bins with ``null`` values differently based on
chart type:

.. list-table::
   :header-rows: 1
   :widths: 1 2

   * - Chart Type
     - How |charts-short| Displays ``null`` Bins

   * - :ref:`column-bar-chart-ref`
     - Bars with a height of ``0``. |charts-short| doesn't display data
       labels for ``null`` bins, even if enabled.

   * - :ref:`line-area-chart-ref`
     - Linear interpolation, with no data marker on the ``null`` bins.
       |charts-short| doesn't display data labels for ``null`` bins,
       even if enabled.
