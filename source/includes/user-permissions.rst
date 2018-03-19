If your MongoDB instance uses :manual:`authentication
</core/authentication/>`, your |bi-short| instance must also use
authentication. The user that connects to MongoDB via the
:binary:`~bin.mongosqld` program must have permission to read from all
the namespaces you wish to sample data from.

For more details about MongoDB user permissions in |bi-short|, see
:ref:`User Permissions for Cached Sampling
<cached-sampling-user-permissions>`.