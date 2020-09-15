For a given region in an |service| project with multi-region clusters
or clusters in multiple regions, there is a limit of
**40 MongoDB nodes on all other regions** in that project. This limit
applies across all cloud service providers and can be raised upon
request. |gcp| regions communicating with each other do not count
against this limit.

.. example::

   If an |service| project has:
   
   - 30 nodes in ``Region A``
   - 10 nodes in ``Region B``
   - 5 nodes in ``Region C``
   
   
   You can no longer add any nodes to your project in ``Region A`` or
   ``Region B``. This is because the nodes in those clusters add up to 40,
   which is the maximum allowed per project. You can add up to 5 nodes in
   ``Region C`` while still satisfying the project limit.

This limit applies even if ``Regions A, B,`` and ``C`` are backed by
different cloud service providers.

For |service| projects where every cluster is deployed to a single
region, you cannot create a multi-region cluster in that project if
there are already 40 or more nodes in that single region unless you
request that the limit be raised.

Please contact |service| :manual:`support </support>` for questions
or assistance with raising this limit.
