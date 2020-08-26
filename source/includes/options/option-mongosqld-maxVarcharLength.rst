.. option:: --maxVarcharLength <length>

   .. versionadded:: 2.2
   
   Specifies the maximum length, in characters, for all varchar fields. If
   :program:`mongosqld` encounters a string that is longer than the maximum length,
   :program:`mongosqld` truncates it to the maximum length and logs a warning.

