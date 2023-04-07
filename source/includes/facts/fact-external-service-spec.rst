When you set the :setting:`spec.externalAccess` setting, the |k8s-op-short| 
automatically creates an external load balancer service with preset values. 
You can override certain values or add new values depending on your needs. 
For example, if you intend to create :k8sdocs:`NodePort services
</concepts/services-networking/service/#type-nodeport>`
and don't need a load balancer, you must configure overrides in your
|k8s| specification:

.. code-block:: yaml

   externalAccess:
     externalService: 
       annotations:
         # cloud-specific annotations for the service
       spec:
         type: NodePort # default is LoadBalancer
         # you can specify other spec overrides if necessary

For more information about the |k8s| specification, see :k8sdocs:`ServiceSpec 
</reference/kubernetes-api/service-resources/service-v1/#ServiceSpec>` 
in the |k8s| documentation.
