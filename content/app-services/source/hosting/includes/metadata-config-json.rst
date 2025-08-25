.. code-block:: json
   :caption: metadata.json

   [
     {
       "path": "<File Resource Path>",
       "attrs": [
          ...,
          <Attribute Definition>
       ],
     },
     ...
   ]

.. list-table::
   :header-rows: 1
   :widths: 10 40

   * - Field
     - Description

   * - ``path``
     - Required. The :ref:`resource path <hosting-resource-path>` of the
       file.

   * - ``attrs``
     - Required. An array of documents where each document represents a
       single metadata attribute. Attribute documents have the following
       form:

       .. code-block:: json
          :caption: Metadata Attribute Document

          {
            "name": "<Attribute Type>",
            "value": "<Attribute Value>"
          }

       .. list-table::
          :header-rows: 1
          :widths: 10 30

          * - Field
            - Description

          * - ``name``
            - The name of the metadata attribute. This should be one of
              the :doc:`file metadata attributes
              </hosting/file-metadata-attributes>` that App Services
              supports.

          * - ``value``
            - The value of the metadata attribute.
