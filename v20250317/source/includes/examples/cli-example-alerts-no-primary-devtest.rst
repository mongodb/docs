.. code-block::
   :copyable: true

   atlas alerts settings create \
     --enabled \
     --event "NO_PRIMARY" \
     --matcherFieldName CLUSTER_NAME \
     --matcherOperator EQUALS \
     --matcherValue ftsTest \
     --notificationType EMAIL \
     --notificationEmailEnabled \
     --notificationEmailAddress "myName@example.com" \
     --notificationIntervalMin 5 \
     --projectId 6698000acf48197e089e4085
