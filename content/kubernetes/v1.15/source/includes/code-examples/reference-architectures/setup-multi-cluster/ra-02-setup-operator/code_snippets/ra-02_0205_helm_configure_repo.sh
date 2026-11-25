helm repo add mongodb https://mongodb.github.io/helm-charts
helm repo update mongodb
helm search repo "${OFFICIAL_OPERATOR_HELM_CHART}"
