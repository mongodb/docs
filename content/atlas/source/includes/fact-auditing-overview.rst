Database auditing lets administrators track system activity for 
deployments with multiple users. |service| administrators can select 
the actions, database users, |service| roles, and LDAP groups that they 
want to audit. |service| supports :manual:`auditing </core/auditing>` 
most of the documented :ref:`system event actions 
<audit-action-details-results>`, with the following limitation:

- The |service| audit logs don't track user creation or modification 
  events because |service| performs these operations directly in the 
  ``admin`` database.

.. important:: Performing a Full Database Audit

   Due to this limitation, you must use a combination of audit logs,
   the ``mongodb.log``, and the :ref:`Project Activity Feed <view-activity-feed>`
   to perform a full audit.

The ``authCheck`` event action logs authorization attempts by users
trying to read from and write to databases in the {+clusters+} in your
project. |service| audits the following specific commands:

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - ``authCheck Reads``
     - ``authCheck Writes``

   * - :manual:`aggregate </reference/command/aggregate>`
     - :manual:`aggregate </reference/command/aggregate>`

   * - :manual:`mapReduce </reference/command/mapReduce>`
     - :manual:`mapReduce </reference/command/mapReduce>`

   * - :manual:`distinct </reference/command/distinct>`
     - :manual:`delete </reference/command/delete>`

   * - :manual:`count </reference/command/count>`
     - :manual:`findAndModify </reference/command/findAndModify>`

   * - :manual:`geoNear </reference/command/geoNear>`
     - :manual:`insert </reference/command/insert>`

   * - :manual:`geoSearch </reference/command/geoSearch>`
     - :manual:`update </reference/command/update>`

   * - :manual:`group </reference/command/group>`
     - :manual:`resetError </reference/command/resetError>`

   * - :manual:`find </reference/command/find>`
     -

   * - :manual:`getLastError </reference/command/getLastError>`
     -

   * - :manual:`getMore </reference/command/getMore>`
     -

   * - :manual:`getPrevError </reference/command/getPrevError>`
     -


|service| implements the ``authCheck`` event action as the following
four separate actions:

.. list-table::
   :header-rows: 1
   :widths: 25 75

   * - Event Action
     - Description

   * - ``authChecksReadFailures``
     - ``authCheck`` event action for all failed reads with the 
       :manual:`auditAuthorizationSuccess
       </reference/parameters/#param.auditAuthorizationSuccess>`
       parameter set to false. This event action is the default for 
       read-related event actions.

   * - ``authChecksReadAll``
     - ``authCheck`` event action for all reads, both sucesses and 
       failures.
       This event action is the same as ``authChecksReadFailures``, but 
       with the :manual:`auditAuthorizationSuccess 
       </reference/parameters/#param.auditAuthorizationSuccess>`
       parameter set to true.

       .. include:: /includes/fact-auditAuthorizationSuccess.rst

   * - ``authChecksWriteFailures``
     - ``authCheck`` event action for all failed writes with the 
       :manual:`auditAuthorizationSuccess
       </reference/parameters/#param.auditAuthorizationSuccess>`
       parameter set to false. This event action is the default for 
       write-related event actions.

   * - ``authChecksWriteAll``
     - ``authCheck`` event action for all writes, both successes and 
       failures. This event action is the same as 
       ``authChecksWriteFailures``, but with the 
       :manual:`auditAuthorizationSuccess 
       </reference/parameters/#param.auditAuthorizationSuccess>`
       parameter set to true.

       .. include:: /includes/fact-auditAuthorizationSuccess.rst

To learn about how MongoDB writes audit events to disk, see 
:manual:`Audit Guarantee </core/auditing/#audit-guarantee>`
in the MongoDB Manual.

Required Access
---------------

To configure audit logs, you must have
:authrole:`Project Owner` access to the project that
you want to update or :authrole:`Organization Owner` access
to the organization that contains the project that you want to update.
