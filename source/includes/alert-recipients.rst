In the :guilabel:`Send to` section, select the alert recipients and the
alert interval. To add more recipients, click :guilabel:`Add`.

To receive an **SMS** alert, a user must have correctly entered their
telephone number in their :guilabel:`Account` page on the
:guilabel:`Administration` tab. |mms| removes all punctuation and letters
and only uses the digits for the telephone number.

If you are outside of the United States or Canada, you will need to
include '011' and your country code. For instance, for New Zealand
(country code 64), you would need to enter '01164', followed by your phone
number. Alternately, you can sign up for a Google Voice number, and use
that number for your authentication.

For **HipChat** alerts, enter the HipChat room name and API token. Alerts
will appear in the HipChat room message stream. See the :ref:`Group
Settings page <group-settings-page>` to define default group settings for
HipChat.

For **PagerDuty** alerts, enter only the service key. Define escalation
rules and alert assignments in `PagerDuty
<http://www.pagerduty.com/?utm_source=mongodb&utm_medium=docs&utm_campaign=partner>`_.
See the :ref:`Group Settings page <group-settings-page>` to define default
group settings for PagerDuty.
