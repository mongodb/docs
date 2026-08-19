.. list-table::
   :header-rows: 1
   :widths: 25 10 15 50

   * - Field
     - Type
     - Necessity
     - Description

   * - ``pipeline``
     - array
     - Required
     - :ref:`Stream aggregation pipeline <atlas-sp-aggregation>` the
       stream processor applies to your streaming data.

   * - ``options``
     - object
     - Optional
     - Object that defines optional settings for your stream
       processor.

   * - ``options.limit``
     - integer
     - Optional
     - Maximum number of documents to return to your terminal.
       ``sp.process()`` ends the session after it returns this number
       of documents.

   * - ``options.tier``
     - string
     - Optional
     - Tier to assign to the stream processor. Tier names are
       case-insensitive. If you omit this field, the stream processor
       uses the default tier for your {+spw+}. Must be one of the
       following values:

       .. include:: /includes/fact-asp-stream-processor-tiers.rst
