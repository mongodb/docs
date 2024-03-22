After you save the file, run the following command. 
The generated response might vary. 

.. io-code-block:: 
    :copyable: true 

    .. input::
        :language: sh

        node get-started.js

    .. output:: 
        :language: json

        ... 
        Question: How can I secure my MongoDB Atlas cluster?
        Answer: To secure your MongoDB Atlas cluster, you can take the following measures:
        1. Enable authentication and use strong, unique passwords for all users.
        2. Utilize encryption in transit and at rest to protect data both while in motion and at rest.
        3. Configure network security by whitelisting IP addresses that can access your cluster.
        4. Enable role-based access control to limit what actions users can perform within the cluster.
        5. Monitor and audit your cluster for suspicious activity using logging and alerting features.
        6. Keep your cluster up to date with the latest patches and updates to prevent vulnerabilities.
        7. Implement backups and disaster recovery plans to ensure you can recover your data in case of data loss.

        Source documents:
        [
          {
            "pageContent": "BSON database dumps produced bymongodump.\nIn the vast majority of cases, MongoDB Atlas backups\ndelivers the simplest, safest, and most efficient backup",
            "pageNumber": 17
          },
          {
            "pageContent": "APM Integration\nMany operations teams use Application Performance\nMonitoring (APM) platforms to gain global oversight of\n15",
            "pageNumber": 17
          },
          {
            "pageContent": "performance SLA.\nIf in the course of a deployment it is determined that a new\nshard key should be used, it will be necessary to reload the\ndata with a new shard key because designation and values",
            "pageNumber": 17
          },
          {
            "pageContent": "to the database.\nReplication Lag\nReplication lag is the amount of time it takes a write\noperation on the primary replica set member to replicate to",
            "pageNumber": 17
          }
        ]
        