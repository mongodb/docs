.. list-table::
   :header-rows: 1
   :widths: 30,50,20

   * - Command
     - Description
     - Atlas Support

   * - :dbcommand:`abortTransaction`

     - Abort transaction.

     - Yes

   * - :dbcommand:`commitTransaction`

     - Commit transaction.

     - Yes

   * - :dbcommand:`endSessions`

     - Expire sessions before the sessions' timeout period.

     - Yes

   * - :dbcommand:`killAllSessions`

     - Kill all sessions.

     - .. include:: /includes/fact-no-support-free-flex-or-m10.rst

   * - :dbcommand:`killAllSessionsByPattern`

     - Kill all sessions that match the specified pattern
     
     - .. include:: /includes/fact-no-support-free-or-flex.rst

   * - :dbcommand:`killSessions`

     - Kill specified sessions.

     - .. include:: /includes/fact-no-support-free-or-flex.rst

   * - :dbcommand:`refreshSessions`

     - Refresh idle sessions.

     - Yes 

   * - :dbcommand:`startSession`

     - Starts a new session.

     - Yes
