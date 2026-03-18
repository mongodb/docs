.. include:: /includes/fact-service-accounts-first.rst

.. code-block:: sh

   curl --header "Authorization: Bearer {ACCESS-TOKEN}" \
        --header "Content-Type: application/json" \
        --header "Accept: application/vnd.atlas.2024-08-05+json" \
        --include \
        --request POST "https://cloud.mongodb.com/api/atlas/v2/orgs/{ORG-ID}/resourcePolicies?pretty=true" \
        --data '{
          "name": "MyResourcePolicy",
          "policies": [
            {
              "body": "forbid (principal, action == ResourcePolicy::Action::\"cluster.modify\", resource)    when {context.cluster.regions.contains(ResourcePolicy::Region::\"aws:us-west-1\")};"
            }
          ]
        }'