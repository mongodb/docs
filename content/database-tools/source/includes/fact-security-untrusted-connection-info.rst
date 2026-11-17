Do not pass connection options such as ``--uri`` or ``--host`` from an
untrusted source to |tool-binary|. Untrusted connection information can
expose information from the host that runs the tool or direct the tool
to an attacker-controlled cluster.
