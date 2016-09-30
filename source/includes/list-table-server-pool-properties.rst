.. list-table::
   :widths: 10 10 80
   :header-rows: 1

   * - Name
     - Type
     - Description

   * - ``id``
     - string
     - The property name.

   * - ``multiSelect``
     - boolean

     - If set to ``true``, a user can specify multiple values for the property
       when requesting servers. If a user specifies multiple values for the
       property when requesting multiple servers, |onprem| provisions servers
       in a round-robin fashion; i.e. |onprem| provisions a server for each
       value before provisioning a second server for a given value.

   * - ``statusName``
     - string
     - Specifies whether the property can be used to provision a server. If
       set to ``AVAILABLE``, the property can be specified when a user
       provisions a server. If set to ``UNAVAILABLE``, the property cannot be
       specified.

   * - ``values``
     - object array
     - The property's values.

   * - ``values.description``
     - string
     - A description of the property value.

   * - ``values.statusName``
     - string
     - Specifies whether the property value can be used to provision a server.
       If set to ``AVAILABLE``, the value can be specified when a user
       provisions a server. If set to ``UNAVAILABLE``, the value cannot be
       specified.

   * - ``values.value``
     - string
     - A value that exists for the property.
