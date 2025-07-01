|service| supports specifying a JSON-formatted audit filter
for customizing :manual:`MongoDB Auditing </core/auditing>`. 

Custom audit filters let users forgo the managed 
{+atlas-ui+} :doc:`auditing filter builder </database-auditing>`
in favor of hand-tailored granular control of event auditing.
|service| checks only that the custom filter uses valid
JSON syntax, and doesn't validate or test the filter's functionality.

The audit filter document must resolve to a query that matches one or 
more fields in the :manual:`audit event message 
</reference/audit-message/#audit-message>`.
The filter document can use combinations of :manual:`query operators
</reference/operator/query/>` and equality 
conditions to match the desired audit messages.

To view example auditing filters, see 
:ref:`auditing-filter-example`. To learn more about configuring MongoDB 
auditing filters, see :manual:`Configure Audit Filter 
</tutorial/configure-audit-filters>`.

.. important::

   |service| uses a :ref:`rolling update <high-availability>` strategy 
   for enabling or updating audit configuration settings across all 
   clusters in the |service| project. Rolling updates require at least 
   one election per replica set. 

   To learn more about testing application resilience to replica set
   elections, see
   :doc:`/tutorial/test-resilience/test-primary-failover`. To learn more
   about how |service| provides high availability, see
   :ref:`Atlas High Availability <high-availability>`.
 