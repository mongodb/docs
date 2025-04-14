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

     - Yes

   * - :dbcommand:`killAllSessions`

     - Kill all sessions.

     - No support for :atlas:`M0, M2, M5 </unsupported-commands/#unsupported-commands>` 
       and :atlas:`M10 clusters </unsupported-commands/#unsupported-commands-1>`. 

   * - :dbcommand:`killAllSessionsByPattern`

     - Kill all sessions that match the specified pattern
     
     - No support for :atlas:`M0, M2, and M5 clusters </unsupported-commands/#unsupported-commands>`.

   * - :dbcommand:`killSessions`

     - Kill specified sessions.

     - No support for :atlas:`M0, M2, and M5 clusters </unsupported-commands/#unsupported-commands>`.

   * - :dbcommand:`refreshSessions`

     - Refresh idle sessions.

     - Yes 

   * - :dbcommand:`startSession`

     - Starts a new session.

     - Yes
