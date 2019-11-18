START-input-k8s-agent-csrs
kubectl certificate approve mms-automation-agent.mongodb
kubectl certificate approve mms-backup-agent.mongodb
kubectl certificate approve mms-monitoring-agent.mongodb
END-input-k8s-agent-csrs

START-input-k8s-rs-csrs
kubectl certificate approve my-secure-rs-0.mongodb
kubectl certificate approve my-secure-rs-1.mongodb
kubectl certificate approve my-secure-rs-2.mongodb
END-input-k8s-rs-csrs

START-input-k8s-rs-clusterfile-csrs
kubectl certificate approve my-secure-rs-0-clusterfile.mongodb
kubectl certificate approve my-secure-rs-1-clusterfile.mongodb
kubectl certificate approve my-secure-rs-2-clusterfile.mongodb
END-input-k8s-rs-clusterfile-csrs

START-input-k8s-sc-csrs
kubectl certificate approve my-secure-sc-0-0.mongodb
kubectl certificate approve my-secure-sc-0-1.mongodb
kubectl certificate approve my-secure-sc-0-2.mongodb
kubectl certificate approve my-secure-sc-1-0.mongodb
kubectl certificate approve my-secure-sc-1-1.mongodb
kubectl certificate approve my-secure-sc-1-2.mongodb
kubectl certificate approve my-secure-sc-config-0.mongodb
kubectl certificate approve my-secure-sc-config-1.mongodb
kubectl certificate approve my-secure-sc-config-2.mongodb
kubectl certificate approve my-secure-sc-mongos-0.mongodb
kubectl certificate approve my-secure-sc-mongos-1.mongodb
END-input-k8s-sc-csrs

START-input-k8s-sc-clusterfile-csrs
kubectl certificate approve my-secure-sc-0-0-clusterfile.mongodb
kubectl certificate approve my-secure-sc-0-1-clusterfile.mongodb
kubectl certificate approve my-secure-sc-0-2-clusterfile.mongodb
kubectl certificate approve my-secure-sc-1-0-clusterfile.mongodb
kubectl certificate approve my-secure-sc-1-1-clusterfile.mongodb
kubectl certificate approve my-secure-sc-1-2-clusterfile.mongodb
kubectl certificate approve my-secure-sc-config-0-clusterfile.mongodb
kubectl certificate approve my-secure-sc-config-1-clusterfile.mongodb
kubectl certificate approve my-secure-sc-config-2-clusterfile.mongodb
kubectl certificate approve my-secure-sc-mongos-0-clusterfile.mongodb
kubectl certificate approve my-secure-sc-mongos-1-clusterfile.mongodb
END-input-k8s-sc-clusterfile-csrs

START-input-k8s-sc-internal-x509-csrs
kubectl certificate approve my-secure-sc-0-0.mongodb
kubectl certificate approve my-secure-sc-0-1.mongodb
kubectl certificate approve my-secure-sc-0-2.mongodb
kubectl certificate approve my-secure-sc-1-0.mongodb
kubectl certificate approve my-secure-sc-1-1.mongodb
kubectl certificate approve my-secure-sc-1-2.mongodb
kubectl certificate approve my-secure-sc-config-0.mongodb
kubectl certificate approve my-secure-sc-config-1.mongodb
kubectl certificate approve my-secure-sc-config-2.mongodb
kubectl certificate approve my-secure-sc-mongos-0.mongodb
kubectl certificate approve my-secure-sc-mongos-1.mongodb
END-input-k8s-sc-internal-x509-csrs

START-input-k8s-sc-internal-x509-clusterfile-csrs
kubectl certificate approve my-secure-sc-0-0-clusterfile.mongodb
kubectl certificate approve my-secure-sc-0-1-clusterfile.mongodb
kubectl certificate approve my-secure-sc-0-2-clusterfile.mongodb
kubectl certificate approve my-secure-sc-1-0-clusterfile.mongodb
kubectl certificate approve my-secure-sc-1-1-clusterfile.mongodb
kubectl certificate approve my-secure-sc-1-2-clusterfile.mongodb
kubectl certificate approve my-secure-sc-config-0-clusterfile.mongodb
kubectl certificate approve my-secure-sc-config-1-clusterfile.mongodb
kubectl certificate approve my-secure-sc-config-2-clusterfile.mongodb
kubectl certificate approve my-secure-sc-mongos-0-clusterfile.mongodb
kubectl certificate approve my-secure-sc-mongos-1-clusterfile.mongodb
END-input-k8s-sc-internal-x509-clusterfile-csrs

START-input-k8s-sc-x509-csrs
kubectl certificate approve my-secure-sc-0-0.mongodb
kubectl certificate approve my-secure-sc-0-1.mongodb
kubectl certificate approve my-secure-sc-0-2.mongodb
kubectl certificate approve my-secure-sc-1-0.mongodb
kubectl certificate approve my-secure-sc-1-1.mongodb
kubectl certificate approve my-secure-sc-1-2.mongodb
kubectl certificate approve my-secure-sc-config-0.mongodb
kubectl certificate approve my-secure-sc-config-1.mongodb
kubectl certificate approve my-secure-sc-config-2.mongodb
kubectl certificate approve my-secure-sc-mongos-0.mongodb
kubectl certificate approve my-secure-sc-mongos-1.mongodb
END-input-k8s-sc-x509-csrs

START-input-k8s-sc-x509-clusterfile-csrs
kubectl certificate approve my-secure-sc-0-0-clusterfile.mongodb
kubectl certificate approve my-secure-sc-0-1-clusterfile.mongodb
kubectl certificate approve my-secure-sc-0-2-clusterfile.mongodb
kubectl certificate approve my-secure-sc-1-0-clusterfile.mongodb
kubectl certificate approve my-secure-sc-1-1-clusterfile.mongodb
kubectl certificate approve my-secure-sc-1-2-clusterfile.mongodb
kubectl certificate approve my-secure-sc-config-0-clusterfile.mongodb
kubectl certificate approve my-secure-sc-config-1-clusterfile.mongodb
kubectl certificate approve my-secure-sc-config-2-clusterfile.mongodb
kubectl certificate approve my-secure-sc-mongos-0-clusterfile.mongodb
kubectl certificate approve my-secure-sc-mongos-1-clusterfile.mongodb
END-input-k8s-sc-x509-clusterfile-csrs
