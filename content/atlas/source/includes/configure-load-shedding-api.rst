.. important::

   The ``adaptiveSettings`` resource is available as a Preview
   feature. The resource and the corresponding documentation might
   change at any time during the Preview period. To learn more, see
   `Preview Features
   <https://www.mongodb.com/docs/preview-features/>`__.

To configure Load Shedding for your cluster with the
{+atlas-admin-api+}, set an override on the ``adaptiveSettings``
resource. This resource exposes the state of Load Shedding in two
Boolean properties:

- ``adaptiveSettingsOverrides.LOAD_SHEDDING`` is writable and contains
  the override that you set.

- ``effectiveAdaptiveSettings.LOAD_SHEDDING`` is read-only and contains
  the Load Shedding state that |service| applies to your cluster. This
  state matches your override only if your cluster's tier and MongoDB
  version support Load Shedding. Otherwise, it reflects the
  |service|-managed default state.

**To enable or disable Load Shedding for your cluster,** send a
``PATCH`` request to the :oas-bump-atlas-op:`Update Adaptive Settings
for One Cluster <updateGroupClusterAdaptiveSettings>` endpoint. In the
request body, set ``adaptiveSettingsOverrides.LOAD_SHEDDING`` to
``true`` or ``false`` to set the Load Shedding override. |service|
applies this override only if your cluster's tier and MongoDB version
support Load Shedding.

**To retrieve your current Load Shedding configuration,** send a ``GET``
request to the :oas-bump-atlas-op:`Return Adaptive Settings for One
Cluster <getGroupClusterAdaptiveSettings>` endpoint and check the
``effectiveAdaptiveSettings.LOAD_SHEDDING`` property in the response.

To learn more, see the :oas-bump-atlas-op:`{+atlas-admin-api+}
specification <updateGroupClusterAdaptiveSettings>`.