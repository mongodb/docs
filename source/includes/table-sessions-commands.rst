.. list-table::
   :header-rows: 1
   :widths: 30,50,20

   * - Command
     - Description
     - Atlas Compatible

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

     - Yes, but with :atlas:`limitations </unsupported-commands>`. 

   * - :dbcommand:`killAllSessionsByPattern`

     - Kill all sessions that match the specified pattern
     
     - Yes, but with :atlas:`limitations </unsupported-commands>`.

   * - :dbcommand:`killSessions`

     - Kill specified sessions.

     - Yes, but with :atlas:`limitations </unsupported-commands>`. 

   * - :dbcommand:`refreshSessions`

     - Refresh idle sessions.

     - Yes, but with :atlas:`limitations </unsupported-commands>`. 

   * - :dbcommand:`startSession`

     - Starts a new session.

     - Yes
