Files that you want to :doc:`host on Atlas App Services </hosting>` should be
included in your application's ``/hosting`` directory. Each file will be
uploaded with the metadata defined in ``metadata.json``.

You can :doc:`configure the metadata </hosting/configure-file-metadata>`
for each hosted file in ``metadata.json``. This metadata configuration
file is an array of documents that each correspond to a single hosted
file's metadata attributes.

.. code-block:: none
   :copyable: False

   yourRealmApp/
   └── hosting/
       ├── metadata.json
       └── files/
           └── <files to host>

.. _hosting-metadata-json:

Metadata Configuration
~~~~~~~~~~~~~~~~~~~~~~

.. code-block:: json
   :caption: metadata.json

   [
     {
       "path": "<File Resource Path>",
       "attrs": [{
         "name": "<Attribute Type>",
         "value": "<Attribute Value>"
       }]
     }
   ]

.. list-table::
   :header-rows: 1
   :widths: 10 30

   * - Field
     - Description

   * - | ``path``
       | String
     - The :ref:`resource path <hosting-resource-path>` of the file.

   * - | ``attrs``
       | Array<Document>
     - An array of documents where each document represents a single
       metadata attribute. Attribute documents have the following form:

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

          * - | ``name``
              | String
            - The name of the metadata attribute. This should be one of
              the :doc:`file metadata attributes
              </hosting/file-metadata-attributes>` that App Services supports.

          * - | ``value``
              | String
            - The value of the metadata attribute.

.. include:: /hosting/includes/note-infer-content-type.rst
