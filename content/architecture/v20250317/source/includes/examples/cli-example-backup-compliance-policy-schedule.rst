.. code-block:: shell 
   :copyable: true 

   atlas backups compliancePolicy policies scheduled create \ 
     --projectId 67212db237c5766221eb6ad9 \
     --frequencyInterval 6 \
     --frequencyType hourly \
     --retentionValue 1 \
     --retentionUnit months
