- A :ref:`connection string <guides-get-connection-string>` to your MongoDB deployment.
- Sample datasets :ref:`loaded into your cluster <guides-load-sample-data>`.
- An :ref:`installed MongoDB Driver <guides-add-a-driver>`.

..
  .. tabs-cloud::

     hidden: true

     tabs:
       - id: local
         content: |

           - If you have not already installed a client (e.g. a driver, :ref:`MongoDB Compass <compass-index>`, or the :binary:`~bin.mongo` shell), complete the :doc:`/server/drivers` guide before attempting this guide.

           - :doc:`Enable Auth </server/auth>` on your local instance of MongoDB.

           .. warning::

              If you are running MongoDB locally and have not enabled authentication, your MongoDB instance is not secure.

       - id: cloud
         content: |

           - If you have not already installed a client (e.g. a driver, :ref:`MongoDB Compass <compass-index>`, or the :binary:`~bin.mongo` shell), complete the :doc:`/server/drivers` guide before attempting this guide.
