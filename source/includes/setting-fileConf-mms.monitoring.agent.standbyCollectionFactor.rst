.. setting:: mms.monitoring.agent.standbyCollectionFactor

   *Type*: integer

   *Default*: 4

   
   Specifies how frequently a standby agent checks in with |mms| to see
   if it should start monitoring. The following values are permitted:
   
   .. list-table::
      :widths: 20 80
      :header-rows: 1
   
      * - Value
        - Standby Agents Check Frequency
   
      * - ``1``
        - Every 55 seconds
   
      * - ``2``
        - Every 27 seconds
   
      * - ``3``
        - Every 18 seconds
   
      * - ``4``
        - Every 14 seconds
   
   

