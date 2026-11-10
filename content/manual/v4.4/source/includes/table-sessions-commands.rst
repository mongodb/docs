.. list-table::
   :header-rows: 1
   :widths: 30,50,20

   * - Command
     - Description
     - Atlas Support

   * - :dbcommand:`abortTransaction`

     - Abort transaction.

       .. versionadded:: 4.0

     - Yes

   * - :dbcommand:`commitTransaction`

     - Commit transaction.

       .. versionadded:: 4.0

     - Yes

   * - :dbcommand:`endSessions`

     - Expire sessions before the sessions' timeout period.

       .. versionadded:: 3.6
     
     - Yes

   * - :dbcommand:`killAllSessions`

     - Kill all sessions.

       .. versionadded:: 3.6

     - No support for :atlas:`M0, M2, M5 </unsupported-commands/#unsupported-commands>` 
       and :atlas:`M10 clusters </unsupported-commands/#unsupported-commands-1>`. 

   * - :dbcommand:`killAllSessionsByPattern`

     - Kill all sessions that match the specified pattern
     
     - No support for :atlas:`M0, M2, and M5 clusters </unsupported-commands/#unsupported-commands>`.

       .. versionadded:: 3.6

   * - :dbcommand:`killSessions`

     - Kill specified sessions.

       .. versionadded:: 3.6
 
     - No support for :atlas:`M0, M2, and M5 clusters </unsupported-commands/#unsupported-commands>`.

   * - :dbcommand:`refreshSessions`

     - Refresh idle sessions.

       .. versionadded:: 3.6
 
     - Yes 

   * - :dbcommand:`startSession`

     - Starts a new session.

       .. versionadded:: 3.6

     - Yes
