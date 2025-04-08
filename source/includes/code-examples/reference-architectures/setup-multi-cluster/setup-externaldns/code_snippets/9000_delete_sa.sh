gcloud projects remove-iam-policy-binding "${MDB_GKE_PROJECT}" --member serviceAccount:"${DNS_SA_EMAIL}" --role roles/dns.admin

gcloud iam service-accounts delete "${DNS_SA_EMAIL}" -q
