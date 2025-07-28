.. code-block::
   :copyable: true

   atlas alerts settings create \ 
     --enabled \
     --event "OUTSIDE_METRIC_THRESHOLD" \ 
     --metricName CONNECTIONS \ 
     --metricOperator LESS_THAN \ 
     --metricThreshold 1 \ 
     --metricUnits RAW \ 
     --notificationType GROUP \ 
     --notificationRole "GROUP_DATA_ACCESS_READ_ONLY","GROUP_CLUSTER_MANAGER","GROUP_DATA_ACCESS_ADMIN" \
     --notificationEmailEnabled \ 
     --notificationEmailAddress "user@example.com" \
     --notificationIntervalMin 5 \ 
     --projectId 6698000acf48197e089e4085 
   