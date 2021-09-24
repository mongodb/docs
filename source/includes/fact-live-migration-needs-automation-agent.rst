The process of Live Migration in |mms| relies on the {+mdbagent+}.
Install a dedicated {+mdbagent+} on a separate server, known as the
migration host, for each MongoDB deployment that you intend to live
migrate to |service-short|.
A {+mdbagent+} on the migration host runs a one-time migration
of data from |mms| to |service-short| and reports the Live Migration
status back to |mms|.
