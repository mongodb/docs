# start-deploy-local
atlas deployments setup myTestDb --type local \
--mdbVersion 8.0 --port 27017 --connectWith skip
# end-deploy-local

# start-deploy-cloud
atlas deployments setup myTestDb --type atlas \
--provider AWS -r us-east-1 --skipSampleData \
--username <database user name> --password <database user password> \
--connectWith skip --force
# end-deploy-cloud