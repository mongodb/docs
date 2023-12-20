To create or update resources in |service|, |ak8so| uses the 
connection information to make |api| calls to |service|.

.. note::

   Sometimes |ak8so| makes multiple |api| calls in |service| during 
   the reconciliation of a custom resource. For example, 
   ``AtlasProject`` has an :ref:`IP Access List <access-list>` 
   configuration for calling the matching :oas-atlas-tag:`API 
   </Project-IP-Access-List>`.
   