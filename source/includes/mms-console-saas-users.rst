The :guilabel:`Users` page has four important tabs:

Users
~~~~~

:guilabel:`Users` page lists the users that have access to your MMS group,
their role, their date of last login, the number of times they have
logged in, their time zone, and the creation date of the account.

Add Users
`````````

You can add a user from any tab of the :guilabel:`Users` page: simply select
``Add/Invite User`` at the top of the screen next to the group name. This
will open a modal window where you will input the new user's email address, and
can select their role. See :ref:`assigning-roles-to-users` for details about
roles and privileges.

If the console finds a connected Jira account, MMS will automatically
add the user to your Jira group and the MMS console. 

If the email address is not connected to an existing Jira account, MMS
will send an invitation to join your group. Once accepted, MMS will
create and add a new user to your group.

Users can also create accounts at any time using the `account
registration page <https://mms.mongodb.com/user/register/user>`_, or
through Jira at `jira.mongodb.org <http://jira.mongodb.org/>`_.

.. index:: users; propagation

.. note::

   If you create an account in Jira or make any changes to that
   account from *within* Jira, it can take up to 30 minutes for that
   change to propagate to MMS. During this window you cannot add a
   user to a group in MMS. Also, passwords changed in Jira are subject
   to the same propagation delay for MMS accounts.

Remove Users
````````````

.. include:: /includes/fact-remove-user.rst

Requests
~~~~~~~~

:guilabel:`Requests` lists pending requests to join your group. Users
can request access when they create their MMS account, as on the
registration page.

Invitations
~~~~~~~~~~~

:guilabel:`Invitations` lists pending invitations to your group. When
you invite a user, as when you click on the :guilabel:`Add/Invite
User` button at the top of the console and complete the form. MMS then
sends an email to the prospective new user and lists the invitation
until the user accepts.
