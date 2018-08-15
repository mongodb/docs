.. list-table::
   :header-rows: 1
   :widths: 30 10 60

   * - Field
     - Required/Optional
     - Description
       
   * - ``namespaces``
     - Optional
     - A namespace for a collection for which you want to retrieve
       existing indexes on the specified host. To specify multiple
       namespaces, pass the parameter multiple times using an ampersand
       (&) as a delimiter, once for each namespace.

       .. example::

          ?namespaces=data.stocks&namespaces=data.zips&pretty=true 

       If you do not specify this parameter, the endpoint
       return all namespaces for the corresponding collection on
       the specified host.