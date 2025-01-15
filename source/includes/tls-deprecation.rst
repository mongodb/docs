.. important::

   Beginning July 31st, 2025, |service| will no longer support |tls|
   1.0 or 1.1 under any circumstance. |service| will upgrade all
   {+clusters+} to reject attempts to connect with |tls| 1.0 or 1.1.

   Prior to this final deprecation, |service| will upgrade
   {+clusters+} to Amazon Linux 2023 on a rolling basis. Any client
   connections configured for |tls| 1.0 or 1.1 will undergo a service
   outage during this upgrade. To avoid this, set the minimum |tls|
   version of your {+clusters+} to 1.2 at your earliest opportunity.
