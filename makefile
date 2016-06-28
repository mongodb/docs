GIT_BRANCH=`git rev-parse --abbrev-ref HEAD`
USER=`whoami`

STAGING_URL_CLOUDMGR="https://docs-staging.cloudmanager.mongodb.com"
STAGING_BUCKET_CLOUDMGR=docs-cloudmanager-staging

PRODUCTION_URL_CLOUDMGR="https://docs.cloudmanager.mongodb.com"
PRODUCTION_BUCKET_CLOUDMGR=docs-cloudmanager-prod

STAGING_URL_OPSMGR="https://docs-staging.opsmanager.mongodb.com"
STAGING_BUCKET_OPSMGR=docs-opsmanager-staging

PRODUCTION_URL_OPSMGR="https://docs.opsmanager.mongodb.com"
PRODUCTION_BUCKET_OPSMGR=docs-opsmanager-prod

PREFIX=

.PHONY: help stage-cloud fake-deploy-cloud deploy-cloud

help:
	@echo 'Targets'
	@echo '  help                - Show this help message'
	@echo '  stage-cloud         - Host online for review'
	@echo '  fake-deploy-cloud   - Create a fake deployment in the staging bucket'
	@echo '  deploy-cloud        - Deploy to the production bucket'
	@echo '  stage-opsmgr        - Host online for review'
	@echo '  fake-deploy-opsmgr  - Create a fake deployment in the staging bucket'
	@echo '  deploy-opsmgr       - Deploy to the production bucket'

	@echo ''
	@echo 'Variables'
	@echo '  ARGS         - Arguments to pass to mut-publish'

stage-cloud:
	mut-publish build/${GIT_BRANCH}/html-cloud ${STAGING_BUCKET_CLOUDMGR} --prefix=${PREFIX} --stage ${ARGS}
	@echo "Hosted at ${STAGING_URL_CLOUDMGR}/${USER}/${GIT_BRANCH}/index.html"

fake-deploy-cloud: build/public/cloud
	mut-publish build/public/cloud ${STAGING_BUCKET_CLOUDMGR} --prefix=${PREFIX} --deploy ${ARGS}
	@echo "Hosted at ${STAGING_URL_CLOUDMGR}/index.html"

deploy-cloud: build/public/cloud
	@echo "Doing a dry-run"
	mut-publish build/public/cloud ${PRODUCTION_BUCKET_CLOUDMGR} --prefix=${PREFIX} --deploy --verbose --all-subdirectories --dry-run ${ARGS}

	@echo ''
	read -p "Press any key to perform the previous"
	mut-publish build/public/cloud ${PRODUCTION_BUCKET_CLOUDMGR} --prefix=${PREFIX} --deploy --all-subdirectories ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL_CLOUDMGR}/index.html"

stage-opsmgr:
	mut-publish build/${GIT_BRANCH}/html-onprem ${STAGING_BUCKET_OPSMGR} --prefix=${GIT_BRANCH} --stage --all-subdirectories ${ARGS}
	@echo "Hosted at ${STAGING_URL_OPSMGR}/${USER}/${GIT_BRANCH}/index.html"

fake-deploy-opsmgr: build/public/onprem
	mut-publish build/public/onprem/${GIT_BRANCH} ${STAGING_BUCKET_OPSMGR} --prefix=${GIT_BRANCH} --deploy ${ARGS}
	@echo "Hosted at ${STAGING_URL_OPSMGR}/${GIT_BRANCH}/index.html"

deploy-opsmgr: build/public/onprem
	@echo "Doing a dry-run"
	mut-publish build/public/onprem/${GIT_BRANCH} ${PRODUCTION_BUCKET_OPSMGR} --prefix=${GIT_BRANCH} --deploy --verbose --all-subdirectories --redirects build/public/onprem/.htaccess --dry-run ${ARGS}

	@echo ''
	read -p "Press any key to perform the previous"
	mut-publish build/public/onprem/${GIT_BRANCH} ${PRODUCTION_BUCKET_OPSMGR} --prefix=${GIT_BRANCH} --deploy --all-subdirectories --redirects build/public/onprem/.htaccess ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL_OPSMGR}/${GIT_BRANCH}/index.html"

deploy-opsmgr-current: build/public/onprem
	@echo "Doing a dry-run"
	mut-publish build/public/onprem/current ${PRODUCTION_BUCKET_OPSMGR} --prefix=current --deploy --verbose --all-subdirectories --redirects build/public/onprem/.htaccess --dry-run ${ARGS}

	@echo ''
	read -p "Press any key to perform the previous"
	mut-publish build/public/onprem/current ${PRODUCTION_BUCKET_OPSMGR} --prefix=current --deploy --all-subdirectories --redirects build/public/onprem/.htaccess ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL_OPSMGR}/current/index.html"

deploy-opsmgr-upcoming: build/public/onprem
	@echo "Doing a dry-run"
	mut-publish build/public/onprem/upcoming ${PRODUCTION_BUCKET_OPSMGR} --prefix=upcoming --deploy --verbose --all-subdirectories --redirects build/public/onprem/.htaccess --dry-run ${ARGS}

	@echo ''
	read -p "Press any key to perform the previous"
	mut-publish build/public/upcoming ${PRODUCTION_BUCKET_OPSMGR} --prefix=upcoming --deploy --all-subdirectories --redirects build/public/onprem/.htaccess ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL_OPSMGR}/upcoming/index.html"