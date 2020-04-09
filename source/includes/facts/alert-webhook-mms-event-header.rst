|mms| adds a request header called ``X-MMS-Event`` to
distinguish between various alert states. The possible values
for this header are:

.. list-table::
   :widths: 30 70

   * - ``alert.open``

     - The alert was just opened.

   * - ``alert.close``

     - The alert was resolved.

   * - ``alert.update``

     - A previously opened alert is still open.

   * - ``alert.acknowledge``

     - The alert was acknowledged.

   * - ``alert.cancel``

     - The alert became invalid and was canceled.

   * - ``alert.inform``

     - Represents an informational alert, which is a
       point-in-time event, such as "Primary Elected."

If you specify a key in the :guilabel:`Webhook Secret` field,
|service| adds the ``X-MMS-Signature`` request header. This
header contains the base64-encoded |hmac|-SHA-1 signature of the
request body. |service| creates the signature using the provided
secret.
