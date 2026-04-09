After you save the file, run the following command. 
The generated response might vary. 

.. io-code-block:: 
    :copyable: true 

    .. input::
        :language: sh

        node get-started.js

    .. output:: 
        :language: json

        Question: How can I secure my MongoDB Atlas cluster?
        Answer: You can secure your MongoDB Atlas cluster by achieving workload isolation with dedicated analytics nodes, configuring visualization tools like Atlas Charts to read from analytics nodes only, and using built-in slow query profiling if deploying with Atlas. Additionally, you can distribute replica set members across multiple data centers for added security during election and failover.

        Source documents:
        [
          {
            "pageContent": "read isolation.  \nWith MongoDB Atlas, you can achieve workload isolation with dedicated analytics nodes. Visualization \ntools like Atlas Charts can be configured to read from analytics nodes only.",
            "pageNumber": 21
          },
          {
            "pageContent": "If you are running MongoDB on your own infrastructure, you can configure replica set tags to achieve \nread isolation.",
            "pageNumber": 21
          },
          {
            "pageContent": "well-tuned queries.\nBuilt-in slow query profiling is also available if you’re deploying MongoDB with Atlas.",
            "pageNumber": 16
          },
          {
            "pageContent": "achieved during election and failover. \nIf possible, distribute replica set members across multiple data centers. If you’re using MongoDB Atlas,",
            "pageNumber": 24
          }
        ]