gcloud compute firewall-rules delete "${OM_FIREWALL_RULE_NAME}" -q || true

gcloud compute forwarding-rules delete "${OM_FORWARDING_RULE_NAME}" --global -q || true

gcloud compute target-https-proxies delete "${OM_LB_PROXY_NAME}" -q || true

gcloud compute ssl-certificates delete "${OM_CERTIFICATE_NAME}" -q || true

gcloud compute url-maps delete "${OM_URL_MAP_NAME}" -q || true

gcloud compute backend-services delete "${OM_BACKEND_SERVICE_NAME}" --global -q || true

gcloud compute health-checks delete "${OM_HEALTHCHECK_NAME}" -q || true
