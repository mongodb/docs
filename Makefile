GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
USER=`whoami`
STAGING_URL="https://docs-mongodbcom-staging.corp.mongodb.com"
PRODUCTION_URL="https://docs.mongodb.com"
STAGING_BUCKET=docs-mongodb-org-staging
PRODUCTION_BUCKET=docs-mongodb-org-prod
PREFIX=compass

.PHONY: help html publish-artifacts stage fake-deploy deploy

help:
	@echo 'Targets'
	@echo '  help               - Show this help message'
	@echo '  html               - Build html files'
	@echo '  publish-artifacts  - Build artifacts to deploy'
	@echo '  stage              - Host online for review'
	@echo '  fake-deploy        - Create a fake deployment in the staging bucket'
	@echo '  deploy             - Deploy to the production bucket'
	@echo ''
	@echo 'Variables'
	@echo '  ARGS               - Arguments to pass to mut-publish'

html:
	giza make html

## makes just the artifacts
publish:
	giza make publish

stage:
	mut-publish build/${GIT_BRANCH}/html ${STAGING_BUCKET} --prefix=${PREFIX} --stage ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${PREFIX}/${USER}/${GIT_BRANCH}/index.html"


fake-deploy: build/public/${GIT_BRANCH}
	mut-publish build/public/${GIT_BRANCH} ${STAGING_BUCKET} --prefix=${PREFIX} --deploy ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${PREFIX}/index.html"

deploy:
	@echo "Doing a dry-run"
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PREFIX} --deploy  --verbose  --redirects build/public/.htaccess --dry-run ${ARGS}

	@echo ''
	read -p "Press any key to perform the preceding statements to ${PRODUCTION_BUCKET}."
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PREFIX} --deploy ${ARGS} --verbose  --redirects build/public/.htaccess

	@echo "Hosted at ${PRODUCTION_URL}/${PREFIX}/${GIT_BRANCH}/index.html"
