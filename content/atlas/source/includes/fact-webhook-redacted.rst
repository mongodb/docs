When you view or edit the alert for a webhook notification, the URL
and secret appear redacted:

- **URL:** |service| preserves the protocol, host, and port, and
  replaces the path with ``********``. For example,
  ``http://webhook.mycompany.com:8080/api/alerts/secret`` becomes
  ``http://webhook.mycompany.com:8080/********``.
- **Secret:** If the secret is longer than 10 characters, |service|
  redacts all but the last four characters. If the secret is 10
  characters or fewer, |service| fully redacts the secret.

|service| uses the secret to generate the ``X-MMS-Signature`` header 
for request verification and does not send it as an authentication 
header.
