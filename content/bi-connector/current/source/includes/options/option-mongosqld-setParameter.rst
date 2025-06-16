.. option:: --setParameter <parameter>

   .. list-table::
    :header-rows: 1
    :widths: 50 10 40
   
    * - Parameter
      - Type
      - Corresponds to
   
    * - ``"polymorphic_type_conversion_mode=<value>"``
      - string
      - .. include:: /includes/fact-polymorphic-type-conversion-mode.rst
   
    * - ``"type_conversion_mode=<value>"``
      - string
      - .. include:: /includes/fact-type-conversion-mode.rst
   
   The following example starts :binary:`~bin.mongosqld` and uses
   the ``--setParameter`` option to specify the
   :doc:`type conversion mode </reference/type-conversion>`:
   
   .. code-block:: sh
   
       mongosqld --setParameter "type_conversion_mode=mongosql"
   

