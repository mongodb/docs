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
        Answer: You can secure your MongoDB Atlas cluster by taking
        advantage of extensive capabilities to defend, detect, and control 
        access to MongoDB. You can also enable encryption of data at rest 
        with encrypted storage volumes and configure an additional layer of 
        encryption on your data. Additionally, you can set up global clusters 
        on Amazon Web Services, Microsoft Azure, and Google Cloud Platform 
        with just a few clicks in the MongoDB Atlas UI.

        Source documents:
        [
          {
            "pageContent": "MongoDB Atlas features extensive capabilities to defend,\ndetect, and control access to MongoDB, offering among\nthe most complete security controls of any modern\ndatabase:",
            "pageNumber": 18
          },
          {
            "pageContent": "throughput is required, it is recommended to either\nupgrade the Atlas cluster or take advantage of MongoDB's\nauto-shardingto distribute read operations across multiple\nprimary members.",
            "pageNumber": 14
          },
          {
            "pageContent": "Atlas provides encryption of data at rest with encrypted\nstorage volumes.\nOptionally, Atlas users can configure an additional layer of\nencryption on their data at rest using the MongoDB",
            "pageNumber": 19
          },
          {
            "pageContent": "You can set up global clusters — available on Amazon Web\nServices, Microsoft Azure, and Google Cloud Platform —\nwith just a few clicks in the MongoDB Atlas UI. MongoDB",
            "pageNumber": 13
          }
        ]
