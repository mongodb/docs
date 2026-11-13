.. list-table::
   :header-rows: 1
   :widths: 30 15 55
   :stub-columns: 1

   * - Field
     - Type
     - Description

   * - ``enforcement``
     - object
     - Aggregated license key status of the |mms| installation. This
       field is ``null`` until |mms| calculates the status for the
       first time.

   * - ``enforcement.effectiveState``
     - string
     - License key state of the installation. |mms| returns one of
       ``LICENSED``, ``GRACE``, ``EXPIRED``, or ``UNLICENSED``. To
       learn how the states map to the |mms| interface, see
       :ref:`license-keys`.

   * - ``enforcement.cause``
     - string
     - Identifies what produced the ``effectiveState`` value.

   * - ``enforcement.enforced``
     - boolean
     - Indicates whether the state is ``EXPIRED`` or ``UNLICENSED``.
       |mms| doesn't restrict any operation in these states.

   * - ``enforcement.transition``
     - object
     - Next scheduled change to the license key state. This field is
       ``null`` when no change is scheduled.

   * - ``enforcement.transition.evaluatorId``
     - string
     - Evaluator that drives the next change.

   * - ``enforcement.transition.inStateUntil``
     - string
     - Date and time when the current state ends.

   * - ``enforcement.transition.nextState``
     - string
     - State that follows the current state.

   * - ``enforcement.warnings``
     - array of objects
     - Warnings that are open. |mms| opens a renewal warning before
       your order end date. To learn more, see
       :ref:`license-keys`.

   * - ``enforcement.warnings[n].evaluatorId``
     - string
     - Evaluator that raised the warning.

   * - ``enforcement.warnings[n].since``
     - string
     - Date and time when the warning opened.

   * - ``enforcement.warnings[n].subjects``
     - array of objects
     - Subjects that the warning covers. Each object contains an
       ``id`` and a ``since`` date. This array is empty when the
       warning applies to the whole installation.

   * - ``enforcement.verdicts``
     - array of objects
     - Contribution of each evaluator to the ``effectiveState``
       value.

   * - ``enforcement.verdicts[n].evaluatorId``
     - string
     - Evaluator that produced the verdict.

   * - ``enforcement.verdicts[n].state``
     - string
     - State that the evaluator calculated.

   * - ``enforcement.verdicts[n].breachAt``
     - string
     - Date and time when the breach takes effect, such as the order
       end date. This date is in the future while the state
       is ``LICENSED``.

   * - ``enforcement.verdicts[n].warningStart``
     - string
     - Date and time when the renewal warning window opens. This
       field is ``null`` unless the verdict state is ``LICENSED``.

   * - ``enforcement.verdicts[n].metadata``
     - object
     - Details that are specific to the evaluator. This field is
       ``null`` for evaluators that provide none.

   * - ``enforcement.verdicts[n].transition``
     - object
     - Next change to the verdict state. The object contains
       ``inStateUntil`` and ``nextState`` fields. This field is
       ``null`` when no change is scheduled.

   * - ``licenses``
     - array of objects
     - License keys that are installed on the |mms| installation.

   * - ``licenses[n].artifactId``
     - string
     - Unique identifier of the license key. Use this value to
       release the license key. The |mms| interface shows this value
       as the license key ID.

   * - ``licenses[n].usable``
     - boolean
     - Indicates whether |mms| can use the license key for coverage.

   * - ``licenses[n].generatedAt``
     - string
     - Date and time when MongoDB generated the license key.

   * - ``licenses[n].installedAt``
     - string
     - Date and time when the license key was installed.

   * - ``licenses[n].status``
     - string
     - Status of the license key. |mms| returns one of ``ACTIVE``,
       ``EXPIRED``, ``RELEASED``, or ``DENIED``. A license key is
       ``ACTIVE`` when it is usable and its order end date is in the
       future. A license key is ``EXPIRED`` when it is usable but its
       order end date passed.

   * - ``licenses[n].statusCause``
     - string
     - Reason code for a ``DENIED`` license key. |mms| returns one of
       ``CLAIM_CONFLICT``, ``CLAIM_REVOKED``, or
       ``VERIFICATION_FAILED``. |mms| sets this field only for a
       ``DENIED`` license key.

   * - ``licenses[n].statusReason``
     - string
     - Sentence that describes why the license key is ``DENIED``.
       |mms| sets this field only for a ``DENIED`` license key.

   * - ``licenses[n].termEnd``
     - string
     - Date and time when the coverage of the license key ends. This
       field is ``null`` when the license key has no end date.

   * - ``licenses[n].grants``
     - array of objects
     - Grants that the license key contains. For a ``RELEASED`` or
       ``DENIED`` license key, |mms| returns the grants if the stored
       license key still passes verification. This array is empty when
       verification fails.

   * - ``licenses[n].grants[n].grantType``
     - string
     - Type of the grant, such as ``contract``.

   * - ``licenses[n].grants[n].grantId``
     - string
     - Identifier of the grant. This field is ``null`` when the issuer
       doesn't set it.

   * - ``licenses[n].grants[n].startDate``
     - string
     - Date and time when the grant starts.

   * - ``licenses[n].grants[n].endDate``
     - string
     - Date and time when the grant ends.

   * - ``licenses[n].grants[n].entitlements``
     - array of objects
     - Entitlements that the grant carries. Each object uses the
       fields described for ``activeEntitlements``.

   * - ``activeEntitlements``
     - object
     - Entitlements that are active now, grouped by entitlement type.
       Each key is an entitlement type, such as
       ``exemption::telemetry``. Each value is an array of
       entitlement objects.

   * - ``activeEntitlements.<type>[n].type``
     - string
     - Entitlement type.

   * - ``activeEntitlements.<type>[n].productName``
     - string
     - Product name that the entitlement applies to. This field is
       ``null`` when the entitlement has no product name.

   * - ``activeEntitlements.<type>[n].active``
     - boolean
     - Indicates whether the entitlement is in effect.

   * - ``activeEntitlements.<type>[n].window``
     - object
     - Validity window of the entitlement. The object contains
       ``start`` and ``end`` date fields. This field is ``null`` when
       the window has no bounds.
