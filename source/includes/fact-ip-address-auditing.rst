|service| audits the creation, deletion, and updates of both temporary
and non-temporary IP access list entries in the project's Activity
Feed.

To view the project's Activity Feed, click :guilabel:`Activity Feed` in the :guilabel:`Project` section of the left navigation pane.

.. seealso::

   :ref:`View All Activity <project-activity-feed>`.

.. note:: Activity Feed Considerations

   - |service| does not report updates to an IP access list entry's
     comment in the Activity Feed.

   - When you modify the address of an IP access list entry, the
     Activity Feed reports two new activities: one for the deletion of
     the old entry and one for the creation of the new entry.
