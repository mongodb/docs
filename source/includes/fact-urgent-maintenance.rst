.. admonition:: Maintenance Window Considerations
   :class: important

   Urgent Maintenance Activities
     Urgent maintenance activities such as security patches cannot
     wait for your chosen window. |service| will start those
     maintenance activities when needed.

   Ongoing Maintenance Operations
     Once maintenance is scheduled for your cluster, you cannot change
     your maintenance window until the current maintenance efforts have
     completed.

   Maintenance Requires Replica Set Elections
     |service| performs maintenance the same way as the maintenance
     procedure described in the
     :manual:`MongoDB Manual
     </tutorial/perform-maintence-on-replica-set-members/>`. This
     procedure requires at least one
     :manual:`replica set election </core/replica-set-elections>`
     during the maintenance window per replica set.

   Maintenance Starts As Close to the Hour As Possible
     Maintenance always begins as close to the scheduled hour as
     possible, but in-progress cluster updates or unexpected system
     issues could delay the start time.
