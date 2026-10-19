export K8S_CTX="<kube context name>"

# specify prerelease version
export PRERELEASE_VERSION="1.4.0-prerelease-68bf4a882be4c1000749a75" # mongodb search version used is 1.53.0-95-g8411af86f

# base64 of docker's config.json containing credentials to quay.io
export PRERELEASE_IMAGE_PULLSECRET="<base64 of dockerconfigjson>"

# this parameter is passed to the helm install to instruct the operator to
# configure every pod with prerelease-image-pullsecret
export OPERATOR_ADDITIONAL_HELM_VALUES="registry.imagePullSecrets=prerelease-image-pullsecret"
export OPERATOR_HELM_CHART="oci://quay.io/mongodb/staging/helm-chart/mongodb-kubernetes:${PRERELEASE_VERSION}"
