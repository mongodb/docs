.. setting:: spec.memberConfig

   *Type*: collection

   Specification for each MongoDB replica set member deployed from 
   the |k8s-mdbrsc|.
   
   The order of the elements in the array must reflect the order of members 
   in the replica set. For example, the first element of the array affects 
   the Pod at index ``0``, the second element affects index ``1``, and so on.
   
   .. example::
   
      Consider the following example specification for a 
      three-member replica set:
   
      .. code-block:: yaml
   
         spec:
           memberConfig:
             - votes: 1
               priority: "0.5"
               tags:
                 tag1: "value1"
                 environment: "prod"
             - votes: 1
               priority: "1.5"
               tags:
                 tag2: "value2"
                 environment: "prod"
             - votes: 0
               priority: "0.5"
               tags:
                 tag2: "value2"
                 environment: "prod"
   

