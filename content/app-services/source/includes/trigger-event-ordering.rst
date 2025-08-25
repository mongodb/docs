If event ordering is enabled, multiple executions of this Trigger will occur
sequentially based on the timestamps of the change events. If event ordering is
disabled, multiple executions of this Trigger will occur independently.

.. tip:: Performance Optimization

   Improve performance for Triggers that respond to bulk database operations 
   by disabling event ordering.
   :ref:`Learn more. <database-triggers-disable-event-ordering>`
