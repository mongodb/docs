.. list-table::
   :header-rows: 1
   :widths: 25 15 60

   * - Name
     - Type
     - Description
       
   * - ``namespaces``
     - array
     - Each element in the array represents one namespace on the specified
       host. Namespaces appear in the following format: ``{database}.{collection}``.
       
   * - ``namespaces[i].namespace``
     - string
     - A namespace on the specified host.
       
   * - ``namespaces[i].type``
     - string
     - The type of namespace.