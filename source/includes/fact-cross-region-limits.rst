For a given region in an |service| project with multi-region clusters
or clusters in multiple regions, there is a limit of
**40 MongoDB nodes on all other regions** in that project. This limit
applies across all cloud service providers and can be raised upon
request. |gcp| regions communicating with each other do not count
against this limit.

.. example::

   If an |service| project has 20 nodes in ``Region A`` and 20 nodes in
   ``Region B``, you can deploy no more than 20 additional nodes in
   that project in any given region. This limit applies even if
   ``Region A`` and ``Region B`` are backed by different cloud service
   providers.

For |service| projects where every cluster is deployed to a single
region, you cannot create a multi-region cluster in that project if
there are already 40 or more nodes in that single region unless you
request that the limit be raised.

Please contact |service| support for questions or assistance raising
this limit. To contact support, click :guilabel:`Support` from the
left-hand navigation bar of the |service| UI.
