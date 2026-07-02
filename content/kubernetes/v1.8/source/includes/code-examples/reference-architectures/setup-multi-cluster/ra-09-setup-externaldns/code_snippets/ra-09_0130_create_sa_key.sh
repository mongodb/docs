mkdir -p secrets

gcloud iam service-accounts keys create secrets/external-dns-sa-key.json --iam-account="${DNS_SA_EMAIL}"
