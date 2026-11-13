.. list-table::
   :header-rows: 1
   :widths: 25 10 65
   :stub-columns: 1

   * - Error Code
     - HTTP Status
     - Message

   * - ``ARTIFACT_MALFORMED``
     - 400
     - This file could not be read. It may be corrupted or was
       modified after signing. Contact your MongoDB account team to
       obtain a replacement.

   * - ``ARTIFACT_SIGNATURE_INVALID``
     - 400
     - This file cannot be verified - it may have been modified after
       signing. Contact your MongoDB account team to obtain a
       replacement.

   * - ``ARTIFACT_UNTRUSTED``
     - 400
     - This file was signed for a different version of |mms| or by an
       untrusted key. Contact your MongoDB account team for a
       compatible file.

   * - ``ARTIFACT_CERTIFICATE_INVALID``
     - 400
     - This file's signing certificate is not valid for this |mms|.
       Contact your MongoDB account team to obtain a replacement.

   * - ``ARTIFACT_HOLDER_NOT_ALLOWED``
     - 403
     - This artifact is bound to specific |mms| instances and cannot
       be installed on this one. Contact your MongoDB account team.

   * - ``ARTIFACT_OUTDATED``
     - 409
     - This artifact is not newer than one already installed on this
       |mms|. Install the latest artifact issued by your MongoDB
       account team.
