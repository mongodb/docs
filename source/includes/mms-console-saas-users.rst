If you, or one of your users, already has an account in the `MongoDB
Jira instance <http://mms.10gen.com/>`_, you can grant these users
access to your MMS console because MMS and Jira have integrated user
management systems. In the "Users" section of the MMS console, click
on the ``+ ADD USER`` button next to your account name and enter 
the Jira
username in the dialogue.

If you are not sure if your user has a Jira account, or if you do not
know their username, you can enter their email address in the dialogue
box. If the console finds a connected account, MMS will automatically
add the user to your Jira group and the MMS console.

Users can create accounts at any time using the "`account registration
page <https://mms.10gen.com/user/register/user>`_", or through Jira at
`jira.mongodb.org <http://jira.mongodb.org/>`_.

.. index:: users; propagation

.. note::

   If you create an account in Jira or make any changes to that
   account from *within* Jira, it can take up to 30 minutes for that
   change to propagate to MMS. During this window you cannot add a
   user to a group in MMS. Also, passwords changed in Jira are subject
   to the same propagation delay for MMS accounts.
