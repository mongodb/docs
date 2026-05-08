You can't use a connection URL directly. |service| {+clusters+}
require authentication. You must create at least one 
:ref:`atlasdatabaseuser-custom-resource` before the application in 
your |k8s| {+cluster+} can connect to the |service| {+cluster+}. 
|ak8so| creates a special |k8s-secret| for each {+cluster+} and 
database user combination in the project. The application in your |k8s| 
{+cluster+} can use this |k8s-secret| to connect to the |service| 
{+cluster+}. The ``spec.scopes`` parameter in the ``AtlasDatabaseUser`` 
custom resource restricts the {+clusters+} that create the database 
user.
