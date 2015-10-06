If you install on AWS servers, you must have at least one EC2 security group
configured with the following inbound rules:

- An SSH rule on the ``ssh`` port, usually port ``22``, that allows traffic from
  all IPs. This is to provide administrative access.

- A custom TCP rule that allows connection on ports ``8080`` and ``8081`` on
  the server that runs the |application|. This lets users connect to |mms|.

- A custom TCP rule that allows traffic on all MongoDB ports from any member
  of the security group. This allows communication between the various |mms|
  components. MongoDB usually uses ports between ``27000`` and ``28000``.
