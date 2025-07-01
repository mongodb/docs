Consider running the following  procedure twice. Perform a partial migration
that stops at the :guilabel:`Perform the Cutover` step *first*. This creates
an up-to-date |service|-backed staging cluster to test application behavior
and performance using the latest :driver:`driver version </driver-compatibility-reference>` 
that supports the MongoDB version of the |service| cluster.

After you test your application, run the full migration procedure
using a separate |service| cluster to create your |service|-backed
production environment.