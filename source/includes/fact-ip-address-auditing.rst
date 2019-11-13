|service| audits the creation, deletion, and updates of both temporary
and non-temporary IP whitelist entries in the project's Activity Feed.
To view the project's Activity Feed, click :guilabel:`Activity Feed` in
the :guilabel:`Project` section of the left navigation pane. For more
information on the project Activity Feed, see :ref:`View All Activity
<project-activity-feed>`.

.. admonition:: Activity Feed Considerations
   :class: note

   - |service| does not report updates to a whitelist entry's comment in
     the Activity Feed.

   - When you modify the address of a whitelist entry, the Activity Feed
     reports two new activities: one for the deletion of the old entry
     and one for the creation of the new entry.
