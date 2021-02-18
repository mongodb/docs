|certauth| that MongoDB |service| clusters use. You can specify
one of the following values:

.. |dstca| replace:: `Root CA X3 <https://letsencrypt.org/certs/trustid-x3-root.pem.txt>`__
.. |dstabbr| replace:: :abbr:`DST (Digital Signature Trust Co.)`
.. |isrgabbr| replace:: :abbr:`ISRG (Internet Security Research Group)`

- **DST**: IdenTrust's |dstabbr| |dstca|

- **ISRGROOTX1**: |isrgabbr| Root X1

|service| triggers a rolling restart of all the nodes in your
cluster after 30 minutes when you switch between certificate
roots. You can verify the change after the cluster restarts.

If omitted, this setting defaults to IdenTrust's root |certauth|
(DST |dstca|).

.. note::

   |service| cluster |tls| certificates use IdenTrust's root
   |certauth| (|dstabbr| |dstca|) by default until 30 April
   2021. Beginning on 1 May 2021, new |tls| certificates that
   MongoDB |service| creates will use |isrgabbr| instead of
   IdenTrust for their root |certauth| in line with Let's
   Encrypt's `announcement <https://letsencrypt.org/2019/04/15/transitioning-to-isrg-root.html>`__
   of this transition.
