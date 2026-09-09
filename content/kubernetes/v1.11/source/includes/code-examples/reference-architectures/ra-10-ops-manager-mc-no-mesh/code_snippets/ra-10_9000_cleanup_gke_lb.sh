gcloud compute firewall-rules delete fw-ops-manager-hc -q || true

gcloud compute forwarding-rules delete om-forwarding-rule --global -q || true

gcloud compute target-https-proxies delete om-lb-proxy -q || true

gcloud compute ssl-certificates delete om-certificate -q || true

gcloud compute url-maps delete om-url-map -q || true

gcloud compute backend-services delete om-backend-service --global -q || true

gcloud compute health-checks delete om-healthcheck -q || true
