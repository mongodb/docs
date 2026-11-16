This lists the version of the automation configuration.

.. code-block:: json

   "version" : "<integer>"

.. list-table::
   :widths: 20 14 11 55
   :header-rows: 1
   :stub-columns: 1

   * - Name
     - Type
     - Necessity
     - Description

   * - version
     - integer
     - Required
     - Revision of this automation configuration file. When you
       update the configuration through the |api|, set this field to
       the value from the configuration that you retrieved. Starting
       in Ops Manager 8.0.28 and 9.0.2, if the value does not match
       the current version, |mms| rejects the request with a ``409``
       error.
