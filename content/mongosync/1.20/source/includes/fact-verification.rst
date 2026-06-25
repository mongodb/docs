
Before transferring your application load from the source cluster to the
destination, check your data to ensure that the sync was successful.

.. note::

   If ``mongosync`` stops during commit, before the
   :ref:`/progress <c2c-api-progress>` endpoint reports
   ``canWrite: true``, you must restart the entire migration to
   ensure that it's verified.

For more information, see :ref:`c2c-verification`.

