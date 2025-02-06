.. list-table::
   :widths: 20 80
   :header-rows: 1

   * - Option
     - Description

   * - :guilabel:`Serverless Continuous Backup`
     - {+Serverless-instances+} are :ref:`deprecated <flex-migration>`.
       You can't create new {+Serverless-instances+}, but you can still
       configure their backup.
       |service| takes incremental :ref:`snapshots 
       <serverless-snapshots>` of the data in your 
       {+Serverless-instance+} every six hours and lets you restore the
       data from a selected point in time within the last 72 hours. 
       |service| also takes daily snapshots and retains these daily
       snapshots for 35 days. To learn more, see
       :ref:`serverless-instance-costs`. 

   * - :guilabel:`Basic Backup`
     - |service| takes incremental :ref:`snapshots 
       <serverless-snapshots>` of the data in your 
       {+Serverless-instance+} every six hours and retains only the two 
       most recent snapshots. You can use this option for free.
