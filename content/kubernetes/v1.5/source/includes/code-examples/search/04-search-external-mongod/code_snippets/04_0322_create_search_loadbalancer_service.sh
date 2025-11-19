kubectl apply --context "${K8S_CTX}" -n "${MDB_NS}" -f - <<YAML
apiVersion: v1
kind: Service
metadata:
  name: ${MDB_SEARCH_SERVICE_NAME}
spec:
  type: LoadBalancer
  selector:
    app: mdbs-search-svc
  ports:
    - name: mongot
      port: 27027
      targetPort: 27027
YAML

echo "Waiting for external IP to be assigned to service ${MDB_SEARCH_SERVICE_NAME}..."
TIMEOUT=120  # 2 minutes timeout
ELAPSED=0
while [ ${ELAPSED} -lt ${TIMEOUT} ]; do
  EXTERNAL_IP=$(kubectl get service "${MDB_SEARCH_SERVICE_NAME}" --context "${K8S_CTX}" -n "${MDB_NS}" -o jsonpath='{.status.loadBalancer.ingress[0].ip}' 2>/dev/null)
  if [ -n "${EXTERNAL_IP}" ] && [ "${EXTERNAL_IP}" != "null" ]; then
    echo "External IP assigned: ${EXTERNAL_IP}"
    break
  fi
  echo "Still waiting for external IP assignment... (${ELAPSED}s/${TIMEOUT}s)"
  sleep 5
  ELAPSED=$((ELAPSED + 5))
done

if [ ${ELAPSED} -ge ${TIMEOUT} ]; then
  echo "ERROR: Timeout reached (${TIMEOUT}s) while waiting for external IP assignment"
  echo "LoadBalancer service may take longer to provision or there may be an issue"
  exit 1
fi
