**Connection String Indexing for Multi-Region Clusters**

After you add a new region to your cluster and configure a private
endpoint for the region, you might see the following error when you use
your private endpoint to connect to the cluster:

.. code-block:: none
    :copyable: false

    DNSHostNotFound: Failed to look up service "<MongoDB service name>"

This error occurs when your connection string's index automatically changes
and your client subsequently restarts, which causes an SRV DNS lookup.
The private endpoint connection string for a multi-region cluster uses
an index of ``0``. If your connection string uses a different index, MongoDB
automatically updates the connection string to use the ``0`` index.

For example, you might configure two private endpoints for a region. If you
remove the first private endpoint, your connection string uses an index of ``1``
and resembles the following:

.. code-block:: none
    :copyable: false

    mongodb+srv://abc-pl-1.xxxxx.mongodb.net/
    
Then, suppose you add a new region to your cluster and configure a private
endpoint for this region. Your cluster now includes multiple regions, and
your connection string updates to use an index of ``0``:

.. code-block:: none
    :copyable: false

    mongodb+srv://abc-pl-0.xxxxx.mongodb.net/

To avoid potential connectivity issues after your client's next restart,
confirm that you are using the zero-indexed private endpoint connection string
to connect to your cluster. You can access the updated private endpoint connection
string from the |service| UI or API after your cluster changes complete.