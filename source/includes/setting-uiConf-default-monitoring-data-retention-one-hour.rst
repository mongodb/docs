.. setting:: Default Monitoring Data Retention 1 Hour

   *Type*: string

   *Default*: 2 months

   
   Length of time that |onprem| stores metric data at the hourly
   granularity level. |onprem| computes the data based on the averages
   from the daily granularity level.
   
   The default setting applies to new projects. If you change this
   settings, |onprem| prompts you whether to also apply that change to
   existing projects. To change the settings for a specific project
   without changing the |onprem| default settings, see
   :ref:`groups-page-admin-ui`.
   
   Accepted values are:
   
   - 2 months
   - 12 months
   
   
   Increasing the retention period for a granularity requires more
   storage on the :ref:`Ops Manager Application Database
   <mms-application-database>`.
   
   

