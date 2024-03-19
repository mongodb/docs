
.. list-table::
   :widths: 35 65
   :header-rows: 1

   * - Control
     - Function

   * - :guilabel:`Granularity`
     - Modifies the granularity of metrics displayed for each chart.
       Select a granularity, usually between 1 minute and 1 day (24 
       hours). Select ``Auto`` to automatically adjust the granularity 
       based on the selected :guilabel:`Zoom` or 
       :guilabel:`Current Display` date controls. ``Auto`` granularity 
       selects the highest fidelity granularity available for the time 
       range.

       .. include:: /includes/fact-10-second-granularity.rst

   * - :guilabel:`Zoom`
     - Modifies the date range of metrics displayed for each chart. 
       Select a zoom range between 1 hour and 5 years. Adjusting
       the :guilabel:`Zoom` automatically adjusts the
       :guilabel:`Current Display` date range. 

   * - :guilabel:`Current Display`
     - Modifies the start and end date-time range of metrics displayed 
       for each chart. Modifying the start and end date sets the 
       value of :guilabel:`Zoom` to ``custom`` and overrides the
       previously selected zoom level.

   * - :guilabel:`Add Chart`
     - Select one or more charts to display or hide. Adding
       charts using this dropdown is identical to adding charts
       from the :guilabel:`Toggle Charts` section of the 
       :guilabel:`Metrics` view.

   * - :guilabel:`Select Database`
     - Only visible for the :guilabel:`DB Stats` view. Selects
       the database for which to display metrics. 

   * - :guilabel:`Display Opcounters on Separate Charts`
     - Directs |service| to split the :guilabel:`Opcounters` chart into
       its individual components. You can then choose to chart one or
       more of those components. If you select this checkbox, |service|
       displays the number of the following operations per second
       on the :binary:`mongod <bin.mongod>` process:

       - delete 
       - getmore
       - insert
       - update
       
       If you deployed Search Nodes for workload isolation, you can't
       view opcounters on separate charts in the :guilabel:`Search
       Nodes` tab. To group opcounters metrics in the
       :guilabel:`Search Nodes` tab, select the :guilabel:`Group
       Opcounters metrics` checkbox.

   * - :guilabel:`Display Timeline Annotations`
     - Directs |service| to display or hide chart annotations. 
       Chart annotations consist of colored vertical lines that 
       indicate server events, such as a server restart or 
       a transition in member state. If you deployed Search Nodes for
       workload isolation, you can't display or hide chart annotations
       in the :guilabel:`Search Nodes` tab.
