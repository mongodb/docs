MongoDB Federated Authentication links your credentials across 
MongoDB systems like |mdb-support|, `MongoDB University <https://learn.mongodb.com/>`_,
|service-fullname|, |mms-full|, `MongoDB Community Forums <https://community.mongodb.com/>`_, and
|mdb-feedback|. |service| implements authentication using the
Federated Identity Management model.

Using the |fim| model:

- Your company manages your credentials using an Identity Provider
  (|idp|). With its |idp|, your company can enable you to authenticate
  with other services across the web.

- You configure |service-fullname| to authenticate using data passed
  from your |idp|.

This goes beyond |sso| as your |idp| manages your credentials, not
MongoDB. Your users can use |service| without needing to remember
another username and password.

.. important::

   While you have a federated |idp| enabled, |service| disables any 
   other authentication mechanisms.
