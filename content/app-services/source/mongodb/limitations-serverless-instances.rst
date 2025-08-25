You can link a `serverless instance
<https://www.mongodb.com/docs/atlas/manage-serverless-instances/>`__ to
your app as a MongoDB data source. However, serverless instances do not
currently support change streams, so the following features are limited:

- You cannot create a :ref:`database trigger <database-trigger>` on a serverless instance.

- You cannot use a serverless instance as your app's :ref:`Device Sync <sync>` cluster.

- You cannot watch collections for changes data sources that are serverless MongoDB Atlas instances.
