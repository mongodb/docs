if [[ "${PRERELEASE_IMAGE_PULLSECRET:-""}" == "" ]]; then return 0; fi

user=$(echo -n "${PRERELEASE_IMAGE_PULLSECRET}" | base64 -d | jq -r '.auths."quay.io".auth' | base64 -d | cut -d ':' -f1)
password=$(echo -n "${PRERELEASE_IMAGE_PULLSECRET}" | base64 -d | jq -r '.auths."quay.io".auth' | base64 -d | cut -d ':' -f2)
echo -e "${password}" | \
  helm registry login \
    --username "${user}" \
    --password-stdin quay.io/mongodb/staging/helm-chart
