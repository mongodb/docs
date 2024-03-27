Unrecognized field 'apiVersion' on server
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

{+driver-short+} raises this exception if you specify an API version and connect to a
MongoDB server that doesn't support the {+stable-api+}. Ensure you're connecting to a
deployment running MongoDB Server v5.0 or later.

Provided apiStrict:true, but the command count is not in API Version
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

{+driver-short+} raises this exception if your ``MongoClient`` runs an operation that
isn't in the {+stable-api+} version you specified. To avoid this error, use an alternative
operation supported by the specified {+stable-api+} version, or set the ``strict``
option to ``False`` when constructing your ``ServerApi`` object.