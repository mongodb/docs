GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD)
USER=`whoami`
STAGING_URL="https://docs-mongodborg-staging.corp.mongodb.com"
PRODUCTION_URL="https://docs.mongodb.com"
STAGING_BUCKET=docs-mongodb-org-staging
PRODUCTION_BUCKET=docs-mongodb-org-prod
PREFIX=spark-connector

# Informs make that these are not file names and that they are a recipe below
.PHONY: html help stage fake-deploy deploy

help:
	@echo 'Targets'
	@echo '  help         - Show this help message'
	@echo '  stage        - Host online for review'
	@echo '  fake-deploy  - Create a fake deployment in the staging bucket'
	@echo '  deploy       - Deploy to the production bucket'
	@echo ''
	@echo 'Variables'
	@echo '  ARGS         - Arguments to pass to mut-publish'

# Builds the HTML files
html:
	giza make html

# Builds the DIR artifacts for publishing (DOES NOT PUBLISH), also builds HTML.
# If baster branch, giza will create any symlinks needed for integrations.yaml
# If master branch, giza will create redirects per build_conf.yaml htaccess field.
publish:
	#rm -r build/public/${GIT_BRANCH}
	#rm -r build/${GIT_BRANCH}
	giza make publish
  
# Stages the previously built HTML artifacts to the staging URL with the prefix above, your username, and the git branch appended.
stage: html
	mut-publish build/${GIT_BRANCH}/html ${STAGING_BUCKET} --prefix=${PREFIX} --stage ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${PREFIX}/${USER}/${GIT_BRANCH}/index.html"

# Deploys the DIR (dirhtml) artifacts generated from "publish" to the staging bucket. Mimics production deployment by using the same arguments as "deploy".
fake-deploy:
	mut-publish build/public/${GIT_BRANCH} ${STAGING_BUCKET} --prefix=${PREFIX}/${GIT_BRANCH} --deploy --verbose  --redirects build/public/.htaccess --dry-run ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${PREFIX}/index.html"

# Deploys the DIR (dirhtml) artifacts generated from "publish" to the production bucket.
deploy:
	@echo "Doing a dry-run"
	mut-publish build/public/ ${PRODUCTION_BUCKET} --prefix=${PREFIX} --deploy --verbose  --redirects build/public/.htaccess --dry-run ${ARGS}

	@echo ''
	read -p "Press any key to perform the previous"
	mut-publish build/public/ ${PRODUCTION_BUCKET} --prefix=${PREFIX} --deploy --verbose   --redirects build/public/.htaccess  ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL}/${PREFIX}/${GIT_BRANCH}/index.html"
