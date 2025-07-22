gcloud compute firewall-rules create fw-ops-manager-hc \
   --action=allow \
   --direction=ingress \
   --target-tags=mongodb \
   --source-ranges=130.211.0.0/22,35.191.0.0/16 \
   --rules=tcp:8443

gcloud compute health-checks create https om-healthcheck \
    --use-serving-port \
    --request-path=/monitor/health

gcloud compute backend-services create om-backend-service \
    --protocol HTTPS \
    --health-checks om-healthcheck \
    --global

gcloud compute url-maps create om-url-map \
    --default-service om-backend-service

gcloud compute target-https-proxies create om-lb-proxy \
    --url-map om-url-map \
    --ssl-certificates=om-certificate

gcloud compute forwarding-rules create om-forwarding-rule \
    --global \
    --target-https-proxy=om-lb-proxy \
    --ports=443
