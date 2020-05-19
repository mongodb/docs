MongoDB Federated Authentication links your credentials across many
MongoDB systems. |cloud| implements authentication using the
Federated Identity Management model.

Using the |fim| model:

- Your company manages your credentials using an Identity Provider
  (|idp|). With its |idp|, your company can enable you to authenticate
  with other services across the web.

- You configure |cloud-short| to authenticate using data passed from
  your |idp|.

This goes beyond |sso| as your |idp| manages your credentials, not
MongoDB. Your users can use |cloud-short| without needing to remember
another username and password.
