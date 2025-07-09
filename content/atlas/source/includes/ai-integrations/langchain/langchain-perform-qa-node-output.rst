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
        Answer: The given context does not explicitly provide detailed steps to secure a MongoDB Atlas cluster. However, based on general best practices, here are some common steps to secure your MongoDB Atlas cluster:

        1. **Enable Network Access Controls**: Configure IP whitelists to only allow connections from trusted IP addresses.
        2. **Use Strong Authentication and Authorization**: Enable SCRAM (Salted Challenge Response Authentication Mechanism) for authenticating users and define roles with specific permissions.
        3. **Encrypt Data**: Ensure data is encrypted both at rest and in transit by default in MongoDB Atlas.
        4. **Enable VPC Peering (if applicable)**: Use Virtual Private Cloud (VPC) peering for secure and private connections.
        5. **Monitor Activity**: Use MongoDB Atlas's built-in monitoring to track cluster activity and detect unauthorized attempts or anomalies.
        6. **Implement Automated Backups**: Secure backups and ensure they are protected from unauthorized access.
        7. **Educate Yourself**: Continuously refer to the MongoDB documentation and follow security best practices.

        It is recommended to visit the MongoDB documentation and security guides for the most accurate and detailed steps tailored to your specific use case.

        Source documents:
        [
          {
            "pageContent": "Atlas free tier, or download MongoDB for local \ndevelopment.\nReview the MongoDB manuals and tutorials in our \ndocumentation. \nMore Resources\nFor more on getting started in MongoDB:",
            "pageNumber": 30
          },
          {
            "pageContent": "read isolation.  \nWith MongoDB Atlas, you can achieve workload isolation with dedicated analytics nodes. Visualization \ntools like Atlas Charts can be configured to read from analytics nodes only.",
            "pageNumber": 21
          },
          {
            "pageContent": "• Zoned Sharding — You can define specific rules governing data placement in a sharded cluster.\nGlobal Clusters in MongoDB Atlas allows you to quickly implement zoned sharding using a visual UI or",
            "pageNumber": 27
          },
          {
            "pageContent": "22\nWorkload Type: Search\nIf your application requires rich full-text search functionality and you are running MongoDB on Atlas,",
            "pageNumber": 22
          }
        ]