When you create, delete, or change temporary and non-temporary IP access
list entries, |service| notifies you of these events in the project's
:guilabel:`Activity Feed`. For example, if you modify the address of an
IP access list entry, the Activity Feed reports the deletion of the old
entry and the creation of the new entry.

View Activity Feed
-------------------

To view the project's Activity Feed:

.. procedure::
   :style: normal

   .. include:: /includes/nav/steps-project-settings.rst

   .. include:: /includes/nav/steps-project-activity-feed.rst

See also :ref:`View All Activity <project-activity-feed>`.

.. note:: Activity Feed Considerations

   - |service| does not report updates to an IP access list entry's
     comment in the Activity Feed.

   - When you modify the address of an IP access list entry, the
     Activity Feed reports two new activities: one for the deletion of
     the old entry and one for the creation of the new entry.
