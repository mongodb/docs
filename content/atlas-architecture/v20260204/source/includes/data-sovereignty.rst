Data Sovereignty and High Availability Considerations
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
For compliance with data residency laws, data can be partitioned to
reside in specific regions, ensuring adherence to local regulations.
However, deploying to a single region sacrifices high availability if
there is a regional outage. 

You can configure a multi-region for both high availability and data sovereignty.

For example, for an application deployed with |aws| that requires data
storage in Europe, you can deploy a multi-region deployment
to three regions within the EU (such as ``eu-west-1``,
``eu-west-2``, and ``eu-west-3``). This ensures data sovereignty since all 
regions are within the EU, while offering high availability if there's a 
regional outage that affects one of the nodes.