.. important::
   
   If the ``copyPolicyItemsEnabled`` value in the response is ``false``,
   set it to ``true`` to configure snapshot copy policy items using the
   ``copyPolicyItems`` attribute in the next step. To do this:

   a. Copy and modify the response to set ``copyPolicyItemsEnabled`` to
      ``true``.
   #. Make a ``PATCH`` request to the same endpoint with the modified
      payload.

   The ``copyPolicyItems`` attribute replaces the deprecated
   ``frequencies`` attribute and allows you to define snapshot copy
   policy items with custom retention values. If you keep
   ``copyPolicyItemsEnabled`` set to ``false``, you must use the
   deprecated ``frequencies`` attribute to specify which snapshots to
   copy. These copies are automatically retained for the same retention
   period as the source snapshots.