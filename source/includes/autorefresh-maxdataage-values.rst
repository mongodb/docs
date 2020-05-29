.. list-table::
   :header-rows: 1
   :widths: 33 33 33

   * - ``autorefresh`` or ``autoRefresh`` Value
     - ``maxDataAge`` Value
     - |charts| Behavior

   * - omitted or ``false``
     - omitted
     - The chart does not automatically refresh.

       When you initially load or manually refresh the chart, |charts|
       renders the chart with data from the cache if the data is less
       than one hour old. If the data from the cache is more than one
       hour old, |charts-short| queries the data source for the latest 
       data, refreshes the cache, and renders the chart using this data.

   * - omitted or ``false``
     - ``-1``
     - The chart does not automatically refresh.

       When you initially load or manually refresh the chart, |charts|
       renders the chart using data from the cache. |charts-short| only
       queries the data source for the latest data if the cache has
       no data for the chart.

   * - omitted or ``false``
     - ``0``
     - The chart does not automatically refresh.

       When you initially load or manually refresh the chart, |charts|
       queries the data source for the latest data, and renders the 
       chart using this data. |charts-short| doesn't read data from the
       cache.

   * - omitted or ``false``
     - Number greater than ``0``
     - The chart does not automatically refresh.

       When you initially load or manually refresh the chart, |charts|
       renders the chart with data from the cache if the data younger
       than the ``maxDataAge`` value, in seconds. If the data from the 
       cache is older than the ``maxDataAge`` value, in seconds, 
       |charts-short| queries the data source for the latest data, 
       refreshes the cache, and renders the chart using this data.

   * - ``true``
     - omitted
     - The chart automatically refreshes every hour.

       When you initially load, manually refresh, or automatically
       refresh the chart, |charts| renders the chart with data from the
       cache if the data is less than one hour old. If the data from the
       cache is more than one hour old, |charts-short| queries the data
       source for the latest data, refreshes the cache, and renders the
       chart using this data.

   * - ``true``
     - Number greater than or equal to ``10``
     - The chart automatically refreshes at the ``maxDataAge`` interval
       you specify, in seconds.

       When you initially load, manually refresh, or automatically
       refresh the chart, |charts| renders the chart with data from the
       cache if the data younger than the ``maxDataAge`` value, in
       seconds. If the data from the cache is older than the
       ``maxDataAge`` value, in seconds, |charts-short| queries the data
       source for the latest data, refreshes the cache, and renders the
       chart using this data.

   * - ``true``
     - Number less than ``10``
     - The chart automatically refreshes at the minimum period of 10
       seconds. 

       When you initially load, manually refresh, or automatically
       refresh the chart, |charts| renders the chart with data from the
       cache if the data younger than the minimum ``maxDataAge`` value
       of 10 seconds. If the data from the cache is older than 10
       seconds, |charts-short| queries the data source for the latest
       data, refreshes the cache, and renders the chart using this data.
