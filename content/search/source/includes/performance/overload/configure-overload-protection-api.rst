.. :snippet-start: configure-overload-protection-api
.. :snippet-output: content/vector-search/source/includes/performance/overload/

.. important::

   The ``adaptiveSettings`` resource is available as a Preview
   feature. The resource and the corresponding documentation might
   change at any time during the Preview period. To learn more, see
   `Preview Features
   <https://www.mongodb.com/docs/preview-features/>`__.

The ``adaptiveSettings`` resource stores the state in two fields:

- ``adaptiveSettingsOverrides.SEARCH_LOAD_SHEDDING`` is the
  state that you set.

- ``effectiveAdaptiveSettings.SEARCH_LOAD_SHEDDING`` is the
  read-only state that |service| applies to your cluster.

Each PATCH request replaces the full ``adaptiveSettingsOverrides``
map. Any override that you omit from the map returns to Atlas
Managed. Omitting the ``adaptiveSettingsOverrides`` field entirely
preserves your existing overrides.

.. procedure::
   :style: normal

   .. step:: Retrieve your service account access token for the project.

      Use your service account to generate an access token, which
      authenticates your requests to the {+atlas-admin-api+}. To learn
      how to generate an access token, see :ref:`example-api-request`.

   .. step:: Send a request to view the current state.

      Replace ``{ACCESS-TOKEN}`` with the output from the preceding
      step, ``{groupId}`` with your project ID, and ``{clusterName}``
      with the name of your cluster.

      .. code-block:: shell

         curl --request GET \
           --header "Authorization: Bearer {ACCESS-TOKEN}" \
           --header "Accept: application/vnd.atlas.preview+json" \
           "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/adaptiveSettings"

   .. step:: Send a request to change the state.

      To turn Search Load Shedding on, set the override to
      ``true``. To turn it off, set the override to ``false``.

      .. code-block:: shell

         curl --request PATCH \
           --header "Authorization: Bearer {ACCESS-TOKEN}" \
           --header "Accept: application/vnd.atlas.preview+json" \
           --header "Content-Type: application/vnd.atlas.preview+json" \
           --data '{ "adaptiveSettingsOverrides": { "SEARCH_LOAD_SHEDDING": true } }' \
           "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/adaptiveSettings"

   .. step:: Return the cluster to Atlas Managed.

      To remove your override and let |service| select the state,
      send an empty map.

      .. code-block:: shell

         curl --request PATCH \
           --header "Authorization: Bearer {ACCESS-TOKEN}" \
           --header "Accept: application/vnd.atlas.preview+json" \
           --header "Content-Type: application/vnd.atlas.preview+json" \
           --data '{ "adaptiveSettingsOverrides": {} }' \
           "https://cloud.mongodb.com/api/atlas/v2/groups/{groupId}/clusters/{clusterName}/adaptiveSettings"

.. :snippet-end:
