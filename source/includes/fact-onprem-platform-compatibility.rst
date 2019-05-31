Before you upgrade |onprem|, make sure:

- The platform of the hosts serving |onprem| is
  :ref:`compatible with 4.0 <ops-manager-os-compatibility>`.
- The {+aagent+}s managing your MongoDB deployments are 
  compatible with
  :ref:`Ops Manager 4.0 <ops-manager-agent-compatibility>`.
- The platform of the hosts serving the |onprem| agents are
  :ref:`compatible with the Agents <ops-manager-agent-os-compatibility>`.

If you had to upgrade the platform for the hosts that serve the
{+mdbagent+}s, upgrade the {+mdbagent+}s *before* upgrading |onprem|.
