.. procedure::
   :style: normal
   
   .. include:: /includes/nav/steps-advanced.rst
      
   .. step:: Toggle the button next to :guilabel:`Database Auditing` to :guilabel:`On`.
      
   .. step:: Confirm that you want to audit authentication failures.

      By default, |service| logs the failed authentication attempts of both
      known and unknown users in the audit log of the :term:`primary` node.
      
   .. step:: Select the database users, |service| roles, and LDAP groups whose actions you want to audit in :guilabel:`Select users and roles`.

      Alternatively, click :guilabel:`Use Custom JSON Filter` to manually
      enter an :manual:`audit filter </tutorial/configure-audit-filters/#auditfilter-option>`
      as a JSON string. For more information on configuring custom audit
      filters in |service|, see :ref:`auditing-custom-filter`.
      
   .. step:: Select the event actions that you want to audit in :guilabel:`Select actions to audit`.
      
      .. note::
      
         Deselecting the ``authenticate`` action prevents |service| from
         auditing authentication failures.
      
      .. note::
      
         When selecting the :manual:`authorization success granularity </reference/parameters/#param.auditAuthorizationSuccess>`
         of auditing for the ``authCheck`` event action, |service| does
         not support different selections for reads and writes. For example,
         you may not select :guilabel:`Successes and Failures` for :guilabel:`authCheck Reads`
         and :guilabel:`Failures` for :guilabel:`authCheck Writes`. If you
         select both :guilabel:`authCheck Reads` and :guilabel:`authCheck Writes`,
         |service| automatically applies your selected granularity to both.
      
   .. step:: Click :guilabel:`Save`.
