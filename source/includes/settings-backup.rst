|backup| Settings
-----------------

The following settings will only be visible to users of |backup|.

Backup Agent
~~~~~~~~~~~~

:guilabel:`Backup Agent` provides links for downloading the
pre-configured Backup agent in both ``.zip`` and ``.tar.gz``
formats, on a variety of platforms. :doc:`|backup| </backup>` 
requires this agent.

Two-Factor Authentication
~~~~~~~~~~~~~~~~~~~~~~~~~

Two-Factor Authentication is only used with :doc:`|backup|
</backup>`. To enable two-factor authentication, click on "Set", and
then input your mobile phone number. You will receive an SMS text
message with an authentication code that you will input into the
MMS console when you complete the Two-Factor Authentication setup.

.. include:: /includes/fact-two-factor-auth-India-limit.rst

Public Key for SCP Restores
~~~~~~~~~~~~~~~~~~~~~~~~~~~

:guilabel:`Public Key for SCP Restores`, or ":guilabel:`|backup|
Public Key`" enables users who have signed up for :doc:`|backup|
</backup>` to generate a new public key that MMS will use to connect
via SSH and transmit a snapshot of your data.
