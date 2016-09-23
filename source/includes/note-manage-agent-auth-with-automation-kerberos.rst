
.. only:: onprem

   .. important::

      In |onprem| 1.8 and later, |onprem| can manage agent authentication if
      :term:`Automation` manages agents. Using Automation, you first need to
      specify the agent's name, and, if using LDAP authorization, the LDAP
      group corresponding to the MongoDB role. |onprem| creates the specified
      MongoDB user for each agent and configures the appropriate access for
      that agent user.

      See :doc:`/tutorial/enable-kerberos-authentication-for-group` for more
      information.

.. only:: cloud

   .. important::

      |mms| can manage agent authentication if :term:`Automation` manages
      agents. Using Automation, you first need to specify the agent's name,
      and, if using LDAP authorization, the LDAP group corresponding to the
      MongoDB role. |onprem| creates the specified MongoDB user for each agent
      and configures the appropriate access for that agent user.

      See :doc:`/tutorial/enable-kerberos-authentication-for-group` for
      more information.

