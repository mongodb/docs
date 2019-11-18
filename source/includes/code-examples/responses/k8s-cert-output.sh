
START-output-k8s-sc-csrs
NAME                                        AGE       REQUESTOR                                                   CONDITION
my-secure-sc-0-0.mongodb                    30s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-0-1.mongodb                    28s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-0-2.mongodb                    27s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-0.mongodb                    22s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-1.mongodb                    13s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-2.mongodb                    6s        system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-0.mongodb               36s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-1.mongodb               34s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-2.mongodb               32s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-mongos-0.mongodb               49s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-mongos-1.mongodb               42s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
END-output-k8s-sc-csrs

START-output-k8s-sc-tls-csrs
NAME                                        AGE       REQUESTOR                                                   CONDITION
my-secure-sc-0-0.mongodb                    30s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-0-1.mongodb                    28s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-0-2.mongodb                    27s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-0.mongodb                    22s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-1.mongodb                    13s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-2.mongodb                    6s        system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-0.mongodb               36s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-1.mongodb               34s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-2.mongodb               32s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-mongos-0.mongodb               49s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-mongos-1.mongodb               42s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
END-output-k8s-sc-tls-csrs

START-output-k8s-sc-x509-csrs
NAME                                        AGE       REQUESTOR                                                   CONDITION
my-secure-sc-0-0.mongodb                    30s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-0-1.mongodb                    28s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-0-2.mongodb                    27s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-0.mongodb                    22s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-1.mongodb                    13s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-2.mongodb                    6s        system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-0.mongodb               36s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-1.mongodb               34s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-2.mongodb               32s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-mongos-0.mongodb               49s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-mongos-1.mongodb               42s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
END-output-k8s-sc-x509-csrs

START-output-k8s-sc-x509-clusterfile-csrs
NAME                                        AGE       REQUESTOR                                                   CONDITION
my-secure-sc-0-0-clusterfile.mongodb        40s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-0-0.mongodb                    2m22s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-0-1-clusterfile.mongodb        36s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-0-1.mongodb                    2m20s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-0-2-clusterfile.mongodb        32s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-0-2.mongodb                    2m19s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-1-0-clusterfile.mongodb        27s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-0.mongodb                    2m14s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-1-1-clusterfile.mongodb        23s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-1.mongodb                    2m5s      system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-1-2-clusterfile.mongodb        20s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-2.mongodb                    118s      system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-config-0-clusterfile.mongodb   10s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-0.mongodb               2m28s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-config-1-clusterfile.mongodb   5s        system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-1.mongodb               2m26s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-config-2-clusterfile.mongodb   2s        system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-2.mongodb               2m24s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-mongos-0-clusterfile.mongodb   18s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-mongos-0.mongodb               2m41s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-mongos-1-clusterfile.mongodb   12s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-mongos-1.mongodb               2m34s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
END-output-k8s-sc-x509-clusterfile-csrs

START-output-k8s-sc-internal-x509-csrs
NAME                                        AGE       REQUESTOR                                                   CONDITION
mms-automation-agent.mongodb                15m       system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
mms-backup-agent.mongodb                    15m       system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
mms-monitoring-agent.mongodb                15m       system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-0-0.mongodb                    30s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-0-1.mongodb                    28s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-0-2.mongodb                    27s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-0.mongodb                    22s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-1.mongodb                    13s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-2.mongodb                    6s        system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-0.mongodb               36s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-1.mongodb               34s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-2.mongodb               32s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-mongos-0.mongodb               49s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-mongos-1.mongodb               42s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
END-output-k8s-sc-internal-x509-csrs

START-output-k8s-sc-internal-x509-clusterfile-csrs
NAME                                        AGE       REQUESTOR                                                   CONDITION
mms-automation-agent.mongodb                15m       system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
mms-backup-agent.mongodb                    15m       system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
mms-monitoring-agent.mongodb                15m       system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-0-0-clusterfile.mongodb        40s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-0-0.mongodb                    2m22s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-0-1-clusterfile.mongodb        36s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-0-1.mongodb                    2m20s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-0-2-clusterfile.mongodb        32s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-0-2.mongodb                    2m19s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-1-0-clusterfile.mongodb        27s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-0.mongodb                    2m14s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-1-1-clusterfile.mongodb        23s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-1.mongodb                    2m5s      system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-1-2-clusterfile.mongodb        20s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-1-2.mongodb                    118s      system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-config-0-clusterfile.mongodb   10s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-0.mongodb               2m28s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-config-1-clusterfile.mongodb   5s        system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-1.mongodb               2m26s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-config-2-clusterfile.mongodb   2s        system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-config-2.mongodb               2m24s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-mongos-0-clusterfile.mongodb   18s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-mongos-0.mongodb               2m41s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-sc-mongos-1-clusterfile.mongodb   12s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-sc-mongos-1.mongodb               2m34s     system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
END-output-k8s-sc-internal-x509-clusterfile-csrs

START-output-k8s-rs-tls-csrs
NAME                                        AGE       REQUESTOR                                                   CONDITION
my-secure-rs-0.mongodb                      33s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-rs-1.mongodb                      31s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-rs-2.mongodb                      24s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
END-output-k8s-rs-tls-csrs

START-output-k8s-rs-x509-csrs
NAME                                        AGE       REQUESTOR                                                   CONDITION
mms-automation-agent.mongodb                15m       system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
mms-backup-agent.mongodb                    15m       system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
mms-monitoring-agent.mongodb                15m       system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-rs-0.mongodb                      33s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-rs-1.mongodb                      31s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-rs-2.mongodb                      24s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
END-output-k8s-rs-x509-csrs

START-output-k8s-rs-internal-x509-csrs
NAME                                        AGE       REQUESTOR                                                   CONDITION
mms-automation-agent.mongodb                15m       system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
mms-backup-agent.mongodb                    15m       system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
mms-monitoring-agent.mongodb                15m       system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-rs-0.mongodb                      6s        system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-rs-1.mongodb                      4s        system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-rs-2.mongodb                      1s        system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
END-output-k8s-rs-internal-x509-csrs

START-output-k8s-rs-internal-x509-clusterfile-csrs
NAME                                        AGE       REQUESTOR                                                   CONDITION
mms-automation-agent.mongodb                15m       system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
mms-backup-agent.mongodb                    15m       system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
mms-monitoring-agent.mongodb                15m       system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-rs-0-clusterfile.mongodb          13s       system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-rs-0.mongodb                      105s      system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-rs-1-clusterfile.mongodb          7s        system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-rs-1.mongodb                      103s      system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
my-secure-rs-2-clusterfile.mongodb          3s        system:serviceaccount:mongodb:mongodb-enterprise-operator   Pending
my-secure-rs-2.mongodb                      100s      system:serviceaccount:mongodb:mongodb-enterprise-operator   Approved,Issued
END-output-k8s-rs-internal-x509-clusterfile-csrs
