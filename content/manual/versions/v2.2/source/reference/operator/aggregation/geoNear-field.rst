.. only:: (html or singlehtml or dirhtml)

   .. list-table::
      :header-rows: 1
      :widths: 20 20 60

      * - Field

        - Type

        - Description

      * - ``near``

        - GeoJSON point or :term:`legacy coordinate pairs <legacy coordinate pairs>`

        - The point for which to find the closest documents.


      * - ``distanceField``

        - string

        - The output field that contains the
          calculated distance. To specify a field within a subdocument,
          use :term:`dot notation`.


      * - ``limit``

        - number

        - Optional. The maximum number of documents to return. The default value is ``100``.
          See also the ``num`` option.


      * - ``num``

        - number

        - Optional. The ``num`` option provides the same function as the ``limit`` option.
          Both define the maximum number of documents to return. If both options
          are included, the ``num`` value overrides the ``limit`` value.


      * - ``maxDistance``

        - number

        - Optional. A distance from the center point. Specify the distance
          in radians. MongoDB limits the results to those documents that fall
          within the specified distance from the center point.


      * - ``query``

        - document

        - Optional. Limits the results to the documents that match the query. The query
          syntax is the usual MongoDB :ref:`read operation query
          <read-operations-query-argument>` syntax.


      * - ``spherical``

        - Boolean

        - Optional. If ``true``, MongoDB references points using a spherical surface. The
          default value is ``false``.


      * - ``distanceMultiplier``

        - number

        - Optional. The factor to multiply all distances returned by the query. For
          example, use the ``distanceMultiplier`` to convert radians, as
          returned by a spherical query, to kilometers by multiplying by the
          radius of the Earth.


      * - ``includeLocs``

        - string

        - Optional. This specifies the output field that identifies the location used to
          calculate the distance. This option is useful when a location field
          contains multiple locations. To specify a field within a
          subdocument, use :term:`dot notation`.


      * - ``uniqueDocs``

        - Boolean

        - Optional. If this value is ``true``, the query returns a matching document once,
          even if more than one of the document's location fields match the
          query. If this value is ``false``, the query returns a document
          multiple times if the document has multiple matching location fields.
          See :query:`$uniqueDocs` for more information.



.. only:: (texinfo or latex or epub)

   :field GeoJSON point,:term:`legacy coordinate pairs <legacy coordinate pairs>` near:

      The point for which to find the closest documents.

   :field string distanceField:

      The output field that contains the calculated distance. To specify a
      field within a subdocument, use :term:`dot notation`.

   :field number limit:

      The maximum number of documents to return. The default value is ``100``.
      See also the ``num`` option.

   :field number num:

      The ``num`` option provides the same function as the ``limit`` option.
      Both define the maximum number of documents to return. If both
      options are included, the ``num`` value overrides the ``limit``
      value.

   :field number maxDistance:

      A distance from the center point. Specify the distance in radians.
      MongoDB limits the results to those documents that fall within the
      specified distance from the center point.

   :field document query:

      Limits the results to the documents that match the query. The query
      syntax is the usual MongoDB :ref:`read operation query
      <read-operations-query-argument>` syntax.

   :field Boolean spherical:

      If ``true``, MongoDB references points using a spherical surface. The
      default value is ``false``.

   :field number distanceMultiplier:

      The factor to multiply all distances returned by the query. For example,
      use the ``distanceMultiplier`` to convert radians, as returned by
      a spherical query, to kilometers by multiplying by the radius of
      the Earth.

   :field string includeLocs:

      This specifies the output field that identifies the location used to
      calculate the distance. This option is useful when a location
      field contains multiple locations. To specify a field within a
      subdocument, use :term:`dot notation`.

   :field Boolean uniqueDocs:

      If this value is ``true``, the query returns a matching document once,
      even if more than one of the document's location fields match the
      query. If this value is ``false``, the query returns a document
      multiple times if the document has multiple matching location
      fields. See :query:`$uniqueDocs` for more information.
