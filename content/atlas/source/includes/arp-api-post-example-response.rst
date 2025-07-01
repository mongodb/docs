.. code-block:: json
   :linenos:

   {
     "createdByUser" : {
       "id" : "66ce81217d08f463824f3b80",
       "name" : "ecwwjhop"
     },
     "createdDate" : "2024-08-28T02:22:49Z",
     "id" : "66ce89f9b535d00a2cb02f83",
     "lastUpdatedByUser" : {
       "id" : "66ce81217d08f463824f3b80",
       "name" : "ecwwjhop"
     },
     "lastUpdatedDate" : "2024-08-28T02:22:49Z",
     "name" : "MyResourcePolicy",
     "orgId" : "{ORG-ID}",
     "policies" : [ {
       "body" : "forbid (principal, action == ResourcePolicy::Action::\"cluster.modify\", resource) when {context.cluster.regions.contains(ResourcePolicy::Region::\"aws:us-west-1\")};",
       "id" : "66ce89f9b535d00a2cb02f82"
     } ],
     "version" : "v1"