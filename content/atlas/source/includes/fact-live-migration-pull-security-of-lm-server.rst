In any pull-type live migration to |service|, |service| manages the server
that runs the live migration and sends data from the source to the destination
cluster.

MongoDB takes the following measures to protect the integrity and confidentiality
of your data in transit to |service|:

- MongoDB encrypts data in transit between the |service|-managed live migration
  server and the destination cluster. If you require encryption for data
  in transit between the source cluster and the |service|-managed migration
  server, configure |tls| on your source cluster.

- MongoDB protects access to the |service|-managed migration server instances
  as it protects access to any other parts of |service|.

- In rare cases where intervention is required to investigate and restore
  critical services, MongoDB adheres to the principle of least privilege
  and authorizes only a small group of privileged users to access your
  |service| {+clusters+} for a minimum limited time necessary to repair
  the critical issue. MongoDB requires |mfa| for these users to log in to
  |service| {+clusters+} and to establish an SSH connection via the bastion
  host. Granting this type of privileged user access requires approval by
  MongoDB senior management. MongoDB doesn't allow access by any other
  MongoDB personnel to your MongoDB |service| {+clusters+}.

- MongoDB allows use of privileged user accounts for privileged activities
  only. To perform non-privileged activities, privileged users must use
  a separate account. Privileged user accounts can't use shared credentials.
  Privileged user accounts must follow the password requirements
  described in Section 4.3.3 of the :website:`Atlas Security </collateral/mongo-db-atlas-security>` whitepaper.

- You can :ref:`restrict access <restrict-access>` to your {+clusters+} by
  all MongoDB personnel, including privileged users, in |service|. If you
  choose to restrict such access and MongoDB determines that access is
  necessary to resolve a support issue, MongoDB must first request your
  permission and you may then decide whether to temporarily restore privileged
  user access for up to 24 hours. You can revoke the temporary 24-hour access
  grant at any time. Enabling this restriction may result in increased time
  for the response and resolution of support issues and, as a result, may
  negatively impact the availability of your |service| {+clusters+}.

- MongoDB reviews privileged user access authorization on a quarterly basis.
  Additionally, MongoDB revokes a privileged user's access when it is no longer
  needed, including within 24 hours of that privileged user changing roles
  or leaving the company. We also log any access by MongoDB personnel to
  your |service| {+clusters+}, retain audit logs for at least six years,
  and include a timestamp, actor, action, and output. MongoDB uses a
  combination of automated and manual reviews to scan those audit logs.

To learn more about |service| security, see the
:website:`Atlas Security </collateral/mongo-db-atlas-security>` whitepaper.
In particular, review the section "MongoDB Personnel Access to MongoDB Atlas Clusters".
