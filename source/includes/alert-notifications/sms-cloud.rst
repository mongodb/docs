Sends the alert to a phone number. |mms| removes all letters and
punctuation except the ``+``.

For international (non-U.S.) phone numbers,
:twilio-sup:`format phone numbers using the E.164 standard </223183008-Formatting-International-Phone-Numbers#h_749baca6-7794-40ed-abb5-ff0dc5782d4e>`.
|mms| uses the U.S.-based `Twilio <https://www.twilio.com>`__ to send
text messages.

If you want to use a non-U.S. phone number, try using a
`Google Voice <https://voice.google.com>`__ phone number.

.. example::

   For New Zealand, enter ``+64`` before the phone number.
