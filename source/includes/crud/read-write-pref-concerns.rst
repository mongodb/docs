**Read preferences**, **read concerns**, and **write concerns** control
how the driver routes read operations and waits for acknowledgment for
read and write operations when connected to a MongoDB replica set.
Read preferences and read concerns apply to all read operations;
write concerns apply to all write operations.

For more information, see the server documentation on
:manual:`read preferences </core/read-preference/>`,
:manual:`read concerns </reference/read-concern/>`, and
:manual:`write concerns </reference/write-concern/>`.