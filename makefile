GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)

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

### Must Change when we update the current version of OpsMgr
CURRENT_V=v3.4


##  I doubt that we'll ever have files named stage-cloud, fake-deploy-cloud, ... but eh
.PHONY: help stage-cloud fake-deploy-cloud deploy-cloud stage-onprem fake-deploy-onprem deploy-onprem deploy-opsmgr-current deploy-opsmgr-upcoming

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
	@echo "Copying over landing page"
	cp -p build/landing/landing.html build/public/cloud/
	cp -p build/landing/style.min.css build/public/cloud/_static/
	cp -p build/landing/*webfont* build/public/cloud/_static/fonts

	mut-publish build/public/cloud ${STAGING_BUCKET_CLOUDMGR} --prefix=${PREFIX}  --all-subdirectories --deploy ${ARGS}
	@echo "Hosted at ${STAGING_URL_CLOUDMGR}/index.html"

deploy-cloud: build/public/cloud build/landing
	@echo "Copying over landing page"
	cp -p build/landing/landing.html build/public/cloud/
	cp -p build/landing/style.min.css build/public/cloud/_static/
	cp -p build/landing/*webfont* build/public/cloud/_static/fonts

	@echo "Doing a dry-run to ${PRODUCTION_BUCKET_CLOUDMGR}"
	mut-publish build/public/cloud ${PRODUCTION_BUCKET_CLOUDMGR} --prefix=${PREFIX} --deploy --verbose --all-subdirectories --dry-run ${ARGS}

	@echo ''
	read -p "Press any key to perform the preceding upload statements to ${PRODUCTION_BUCKET_CLOUDMGR}"
	mut-publish build/public/cloud ${PRODUCTION_BUCKET_CLOUDMGR} --prefix=${PREFIX} --deploy --all-subdirectories ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL_CLOUDMGR}/index.html"

stage-opsmgr:
	mut-publish build/${GIT_BRANCH}/html-onprem ${STAGING_BUCKET_OPSMGR} --prefix=${PREFIX} --stage --all-subdirectories ${ARGS}
	@echo "Hosted at ${STAGING_URL_OPSMGR}/${USER}/${GIT_BRANCH}/index.html"

fake-deploy-opsmgr: build/public/onprem
	@echo "Copying over fullsize images "
	cp source/figures/*fullsize.png build/public/onprem/${GIT_BRANCH}/_images/

	mut-publish build/public/onprem/${GIT_BRANCH} ${STAGING_BUCKET_OPSMGR} --prefix=${GIT_BRANCH} --deploy --all-subdirectories ${ARGS}
	@echo "Hosted at ${STAGING_URL_OPSMGR}/${GIT_BRANCH}/index.html"

deploy-opsmgr: build/public/onprem
	@echo "Copying over fullsize images "
	cp source/figures/*fullsize.png build/public/onprem/${GIT_BRANCH}/_images/

	@echo "Doing a dry-run to ${PRODUCTION_BUCKET_OPSMGR}"
	mut-publish build/public/onprem/ ${PRODUCTION_BUCKET_OPSMGR} --prefix= --deploy --verbose  --redirects build/public/onprem/.htaccess --dry-run ${ARGS}

	@echo ''
	read -p "Press any key to publish preceding upload statements to ${PRODUCTION_BUCKET_OPSMGR}"
	mut-publish build/public/onprem/ ${PRODUCTION_BUCKET_OPSMGR} --prefix= --deploy  --redirects build/public/onprem/.htaccess ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL_OPSMGR}/${GIT_BRANCH}/index.html"
