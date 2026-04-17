# start-deploy-local
atlas local setup myDeployment \
--mdbVersion 8.0 --port <port number> --connectWith connectionString
# end-deploy-local

# start-deploy-cloud
atlas setup --clusterName myDeployment \
--provider AWS --region us-east-1 --skipSampleData \
--username <database username> --password <database user password> \
--connectWith skip --force
# end-deploy-cloud