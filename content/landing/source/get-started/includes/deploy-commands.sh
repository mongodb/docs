# start-deploy-local
atlas deployments setup testing --type local \
--mdbVersion 8.0 --port 27017 --connectWith skip
# end-deploy-local

# start-deploy-cloud
atlas deployments setup testing --type atlas \
--provider AWS -r us-east-1 --skipSampleData \
--username <Your username> --password <Your password> \
--connectWith skip --force
# end-deploy-cloud