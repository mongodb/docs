The ``schemas`` object contains the following fields.

.. list-table:: 
   :header-rows: 1
   :widths: 20 10 70

   * - Parameter
     - Type
     - Description

   * - ``databaseName``
     - string
     - Name of the database.

   * - ``namespaces``
     - array of objects
     - Name and generated schema of each collection or view.

   * - ``namespaces.name``
     - string
     - Name of the collection or view.

   * - ``namespaces[n].schema``
     - document
     - Schema of the collection or view.

   * - ``namespaces[n].schema.version``
     - integer
     - Format version of the schema. Value is always 1.

   * - ``namespaces[n].schema.jsonSchema``
     - document
     - |json| schema of the collection or view. The |json| schema can 
       contain the following :manual:`fields 
       </reference/operator/query/jsonSchema/#jsonschema-keywords>`: 

       - ``bsonType`` 
       - ``properties`` 
       - ``items``

       To learn more about these fields, see :manual:`JSON Schema 
       Keywords </reference/operator/query/jsonSchema/#jsonschema-keywords>`.
