.. option:: --verbose, -v

   Specifies that :program:`mongosqld` should provide more detailed log output.
   
   The following table describes the information provided at each log
   level:
   
   .. list-table::
      :widths: 10 20 70
      :header-rows: 1
   
      * - Letter Option
        - Log Level
        - Message Content
   
      * - ``--quiet``
        - None
        - Log nothing.
   
      * - No flag
        - Default
        - Log messages that notify user of basic :binary:`~bin.mongosqld` 
          events and state changes.
   
      * - ``-v``
        - Administrator
        - Log messages that provie information to :binary:`~bin.mongosqld` 
          administrators.
   
      * - ``-vv``
        - Developer
        - Log messages useful to MongoDB support and development.

