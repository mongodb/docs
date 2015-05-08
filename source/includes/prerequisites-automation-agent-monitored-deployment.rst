Installing to a Server that Already Runs MongoDB
~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

If you install the Automation Agent to a server that is already running a
MongoDB process, the user that owns the Automation Agent must be the same
as the user that owns the MongoDB process. If you had installed MongoDB with a
package manager, then install the agent with the same package manager
to ensure the same user owns both.

Having the same owner for both ensures that the Automation Agent can stop
the pre-existing MongoDB processes and re-start them using its own MongoDB
binaries. Assigning the same owner also gives the agent the needed
``Read`` / ``Write`` permission on the MongoDB data and logs.

In addition, the Automation Agent must have permission to stop, start, and
update the pre-existing Monitoring Agent and, if applicable, Backup Agent.

Before installing the Automation Agent to a server that is running
MongoDB, you must first :doc:`add the server to Monitoring
</tutorial/add-hosts-to-monitoring>`, if that has not already been done.
Then install the Automation Agent.
