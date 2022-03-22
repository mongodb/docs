.. important:: Data Table Differs from Chart Visualization

   Some configuration options you see reflected on a chart
   visualization are not applied to the data table. The
   :guilabel:`Chart Data` table displays underlying data retrieved
   with your full aggregation pipeline, and not all Chart Builder
   configuration options apply aggregation stages. Review your data to
   verify its contents.

If you want to analyze your underlying data with a third-party tool,
you can download your data from the :guilabel:`Chart Data` modal. To
download your data, click :guilabel:`Download - CSV` or
:guilabel:`Download - JSON`.

.. note::

   You can also retrieve chart data using the 
   :doc:`Embedding SDK </embedding-charts-sdk/>`
   ``getData()`` method. To learn more about SDK API methods, see the
   `Embedding SDK Reference <https://www.npmjs.com/package/@mongodb-js/charts-embed-dom>`_.

.. figure:: /images/charts/editor-chart-data.png
   :figwidth: 60%
   :alt: Viewing chart data will display a table of the values used to create a chart. It also allows for downloading a CSV or JSON representation of that table.