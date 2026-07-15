After you create a notification that requires an API or integration
key, the key appears redacted when you:

- View or edit the alert through the {+atlas-ui+}.
- Query the alert for the notification through the {+atlas-admin-api+}.

|service| redacts all but the last four characters of the credential.
The redaction formula applies to all notification types, including
PagerDuty, Slack, and Datadog. The formula is stable and safe to
use in automations. Any disruptive API changes would require a new API version, 
and previous versions should remain usable.
