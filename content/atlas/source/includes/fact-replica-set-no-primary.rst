If |service| collects data during an :ref:`election
<replica-set-elections>`, this alert might send a false
positive. To prevent such false positives, set the alert
configuration's :guilabel:`after waiting` interval (in the
configuration's :guilabel:`Send to` section).
