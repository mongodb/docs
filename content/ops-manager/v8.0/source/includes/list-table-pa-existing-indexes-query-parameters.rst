.. list-table::
   :header-rows: 1
   :widths: 15 10 10 65

   * - Field
     - Optional/Required
     - Type
     - Description
       
   * - ``namespaces``
     - Optional
     - string
     - A namespace for a collection for which you want to retrieve
       existing indexes on the specified host. To specify multiple
       namespaces, pass the parameter multiple times using an ampersand
       (&) as a delimiter, once for each namespace.

       .. example::

          ?namespaces=data.stocks&namespaces=data.zips&pretty=true 

       If you do not specify this parameter, the endpoint
       return all namespaces for the corresponding collection on
       the specified host.

   * - ``envelope``
     - Optional
     - boolean
     - Specifies whether or not to wrap the response in an
       :ref:`envelope <api-envelope>`. The default is ``false``.

   * - ``pretty``
     - Optional
     - boolean
     - Indicates whether the response body should be in a 
       `prettyprint <https://en.wikipedia.org/wiki/Prettyprint?oldid=791126873>`_ format.
       The default value is ``false``.