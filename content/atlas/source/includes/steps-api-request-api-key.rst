Your request should resemble the following examples, where 
``{PUBLIC-KEY}`` is your |api| public key and ``{PRIVATE-KEY}``
is the corresponding private key. To explore the available endpoints
through the {+atlas-admin-api+}, you can use MongoDB's 
`Postman workspace <https://www.postman.com/mongodb-devrel/workspace/mongodb-atlas-administration-apis/overview>`__.

The following sample ``GET`` request 
:oas-bump-atlas-op:`returns all projects </listgroups>` in your organization:

.. code-block:: sh

   curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
         --header "Content-Type: application/json" \
         --header "Accept: application/vnd.atlas.2024-08-05+json" \
         --include \
         --request GET "https://cloud.mongodb.com/api/atlas/v2/groups"

The following sample ``POST`` request takes a request body and
:oas-bump-atlas-op:`creates a project </creategroup>` named 
``MyProject`` in your organization:

.. code-block:: sh

   curl --user "{PUBLIC-KEY}:{PRIVATE-KEY}" --digest \
         --header "Content-Type: application/json" \
         --header "Accept: application/vnd.atlas.2024-08-05+json" \
         --include \
         --request POST "https://cloud.mongodb.com/api/atlas/v2/groups" \
         --data '
            {
               "name": "MyProject",
               "orgId": "5a0a1e7e0f2912c554080adc"
            }'