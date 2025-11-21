# start-deploy-local
atlas deployments setup myDeployment --type local \
--mdbVersion 8.0 --port <port number> --connectWith skip
# end-deploy-local

# start-deploy-cloud
atlas deployments setup myDeployment --type atlas \
--provider AWS -r us-east-1 --skipSampleData \
--username <database user name> --password <database user password> \
--connectWith skip --force
# end-deploy-cloud