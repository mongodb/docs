GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
USER=$(shell whoami)

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
.PHONY: help stage-cloud fake-deploy-cloud deploy-cloud stage-onprem fake-deploy-onprem deploy-onprem deploy-opsmgr-current deploy-opsmgr-upcoming deploy-cloud-search-index deploy-opsmgr-search-index

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo
	@echo 'Variables'
	@printf "  \033[36m%-18s\033[0m %s\n" 'ARGS' 'Arguments to pass to mut-publish'

stage-cloud: ## Host online for review
	mut-publish build/${GIT_BRANCH}/html-cloud ${STAGING_BUCKET_CLOUDMGR} --prefix=${PREFIX} --stage ${ARGS}
	@echo "Hosted at ${STAGING_URL_CLOUDMGR}/${USER}/${GIT_BRANCH}/index.html"

fake-deploy-cloud: build/public/cloud ## Create a fake deployment in the staging bucket
	@echo "Copying over landing page"
	cp -p build/landing/landing.html build/public/cloud/
	cp -p build/landing/style.min.css build/public/cloud/_static/
	cp -p build/landing/*webfont* build/public/cloud/_static/fonts

	mut-publish build/public/cloud ${STAGING_BUCKET_CLOUDMGR} --prefix=${PREFIX}  --all-subdirectories --deploy ${ARGS}
	@echo "Hosted at ${STAGING_URL_CLOUDMGR}/index.html"

deploy-cloud: build/public/cloud build/landing ## Deploy to the production bucket
ifneq ($(GIT_BRANCH), master)
	$(error "Aborting attempt to deploy cloud on master")
endif

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

	$(MAKE) deploy-cloud-search-index

deploy-cloud-search-index: ## Update the Cloud Manager search index
ifneq ($(GIT_BRANCH), master)
	$(error "Aborting attempt to deploy cloud on master")
endif

	mut-index upload build/public/cloud -o mms-cloud-${GIT_BRANCH}.json -u ${PRODUCTION_URL_CLOUDMGR} -g -s --exclude build/public/cloud/landing.html

stage-opsmgr: ## Host online for review
	mut-publish build/${GIT_BRANCH}/html-onprem ${STAGING_BUCKET_OPSMGR} --prefix=${PREFIX} --stage --all-subdirectories ${ARGS}
	@echo "Hosted at ${STAGING_URL_OPSMGR}/${USER}/${GIT_BRANCH}/index.html"

fake-deploy-opsmgr: build/public/onprem ## Create a fake deployment in the staging bucket
	@echo "Copying over fullsize images "
	cp source/figures/*fullsize.png build/public/onprem/${GIT_BRANCH}/_images/

	mut-publish build/public/onprem/${GIT_BRANCH} ${STAGING_BUCKET_OPSMGR} --prefix=${GIT_BRANCH} --deploy --all-subdirectories ${ARGS}
	@echo "Hosted at ${STAGING_URL_OPSMGR}/${GIT_BRANCH}/index.html"

deploy-opsmgr: build/public/onprem ## Deploy to the production bucket
	@echo "Copying over fullsize images "
	cp source/figures/*fullsize.png build/public/onprem/${GIT_BRANCH}/_images/

	@echo "Doing a dry-run to ${PRODUCTION_BUCKET_OPSMGR}"
	mut-publish build/public/onprem/ ${PRODUCTION_BUCKET_OPSMGR} --prefix= --deploy --verbose  --redirects build/public/onprem/.htaccess --dry-run ${ARGS}

	@echo ''
	read -p "Press any key to publish preceding upload statements to ${PRODUCTION_BUCKET_OPSMGR}"
	mut-publish build/public/onprem/ ${PRODUCTION_BUCKET_OPSMGR} --prefix= --deploy  --redirects build/public/onprem/.htaccess ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL_OPSMGR}/${GIT_BRANCH}/index.html"

	$(MAKE) deploy-opsmgr-search-index

deploy-opsmgr-search-index: ## Update the Ops Manager search index
	mut-index upload build/public/onprem/${GIT_BRANCH} -o mms-onprem-${GIT_BRANCH}.json -u ${PRODUCTION_URL_OPSMGR}/${GIT_BRANCH} -g -s
