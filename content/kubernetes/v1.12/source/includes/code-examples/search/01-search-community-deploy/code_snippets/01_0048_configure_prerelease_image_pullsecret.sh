if [[ "${PRERELEASE_IMAGE_PULLSECRET:-""}" == "" ]]; then return 0; fi

kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<EOF
apiVersion: v1
kind: Secret
metadata:
  name: prerelease-image-pullsecret
data:
  .dockerconfigjson: "${PRERELEASE_IMAGE_PULLSECRET}"
type: kubernetes.io/dockerconfigjson
EOF
