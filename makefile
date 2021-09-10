#!make
MAKEFLAGS += --silent

# This allows us to accept extra arguments (by doing nothing when we get a job that doesn't match, 
# rather than throwing an error).
%: 
    @: 

# $(MAKECMDGOALS) is the list of "targets" spelled out on the command line
stagel: 
	git clone --quiet https://github.com/mongodb/snooty-scripts.git build_scripts
	@ cd build_scripts && npm install
	@ source ~/.config/.snootyenv && node build_scripts/app.js $(filter-out $@,$(MAKECMDGOALS))
	@ rm -rf build_scripts

commit:
        @:

local:
        @:

GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
ifeq ($(STAGING_USERNAME),)
	USER=$(shell whoami)
else
	USER=$(STAGING_USERNAME)
endif

STAGING_URL_CLOUDMGR="https://docs-cloudmanager-staging.mongodb.com"
STAGING_BUCKET_CLOUDMGR=docs-cloudmanager-stg

PRODUCTION_URL_CLOUDMGR="https://docs.cloudmanager.mongodb.com"
PRODUCTION_BUCKET_CLOUDMGR=docs-cloudmanager-prd

STAGING_URL_OPSMGR="https://docs-opsmanager-staging.mongodb.com"
STAGING_BUCKET_OPSMGR=docs-opsmanager-stg

PRODUCTION_URL_OPSMGR="https://docs.opsmanager.mongodb.com"
PRODUCTION_BUCKET_OPSMGR=docs-opsmanager-prd

PREFIX=

# Parse our published-branches configuration file to get the name of
# the current "stable" branch. This is weird and dumb, yes.
STABLE_BRANCH=`grep 'manual' build/docs-tools/data/mms-published-branches.yaml | cut -d ':' -f 2 | grep -Eo '[0-9a-z.]+'`

## I doubt that we'll ever have files named stage-cloud,
## fake-deploy-cloud, ... but eh
.PHONY: help html publish publish-cloud publish-onprem stage-cloud fake-deploy-cloud deploy-cloud stage-onprem fake-deploy-onprem deploy-onprem deploy-onprem-current deploy-onprem-upcoming deploy-cloud-search-index deploy-onprem-search-index

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo
	@echo 'Variables'
	@printf "  \033[36m%-18s\033[0m %s\n" 'ARGS' 'Arguments to pass to mut-publish'

stage: stage-cloud stage-onprem ## Stage both Cloud and On-Prem

##########################################################
####                                                  ####
####          BUILD DOCUMENTATION ARTIFACTS           ####
####                                                  ####
##########################################################


##########################################################
####              BUILD STAGING ARTIFACTS             ####
##########################################################

## Build both Cloud/Ops Manager HTML files
html:
	giza make html

## Build Ops Manager HTML files
html-onprem:
	giza make html-onprem

## Build Cloud Manager HTML files
html-cloud:
	giza make html-cloud


##########################################################
####   BUILD STAGING ARTIFACTS TO CLEAN DIRECTORY     ####
##########################################################

## Build both Cloud/Ops Manager HTML files to a fresh build directory
clean-html:
	rm -rf build/${GIT_BRANCH}
	giza make html

## Build Ops Manager HTML files to a fresh build directory
clean-html-onprem:
	rm -rf build/${GIT_BRANCH}
	giza make html-onprem

## Build Cloud Manager HTML files to a fresh build directory
clean-html-cloud:
	rm -rf build/${GIT_BRANCH}
	giza make html-cloud


##########################################################
####             BUILD PRODUCTION ARTIFACTS           ####
##########################################################

## Build both Cloud/Ops Manager publishable production artifacts
publish: publish-cloud publish-onprem

## Build Cloud Manager publishable production artifacts
publish-cloud:
	if [ ${GIT_BRANCH} = master ]; then rm -rf build/master build/public/cloud; fi
	giza make publish-cloud
	if [ ${GIT_BRANCH} = master ]; then mut-redirects config/redirects-cloud -o build/public/cloud/.htaccess; fi

## Build Ops Manager publishable production artifacts
publish-onprem:
	if [ ${GIT_BRANCH} = master ]; then rm -rf build/master build/public/onprem; fi
	giza make publish-onprem
	if [ ${GIT_BRANCH} = master ]; then mut-redirects config/redirects-onprem -o build/public/onprem/.htaccess; fi


##########################################################
####                                                  ####
####        DEPLOY CLOUD MANAGER DOCUMENTATION        ####
####                                                  ####
##########################################################


##########################################################
####  DEPLOY CLOUD MANAGER DOCUMENTATION TO STAGING   ####
##########################################################

## Deploy artifacts from the working branch of Cloud Manager
## to the staging S3 bucket / EC2 for review
stage-cloud:
	mut-publish build/${GIT_BRANCH}/html-cloud ${STAGING_BUCKET_CLOUDMGR} --prefix=${PREFIX} --stage ${ARGS}
	@echo "\n\nHosted at ${STAGING_URL_CLOUDMGR}/${USER}/${GIT_BRANCH}/index.html"

## Create a fake deployment in the staging bucket
fake-deploy-cloud: build/public/cloud
	@echo "Copying over landing page"
	cp -p build/landing/landing.html build/public/cloud/
	cp -p build/landing/style.min.css build/public/cloud/_static/
	cp -p build/landing/*webfont* build/public/cloud/_static/fonts

	mut-publish build/public/cloud ${STAGING_BUCKET_CLOUDMGR} --prefix=${PREFIX}  --all-subdirectories --deploy ${ARGS}
	@echo "\n\nHosted at ${STAGING_URL_CLOUDMGR}/index.html"


##########################################################
#### DEPLOY CLOUD MANAGER DOCUMENTATION TO PRODUCTION ####
##########################################################

## Deploy Cloud Manager to the production S3 bucket
deploy-cloud: build/public/cloud
ifneq ($(GIT_BRANCH), master)
	$(error "Aborting attempt to deploy cloud on master")
endif

	mut-publish build/public/cloud ${PRODUCTION_BUCKET_CLOUDMGR} --prefix=${PREFIX} --deploy --all-subdirectories ${ARGS}

	@echo "\n\nHosted at ${PRODUCTION_URL_CLOUDMGR}/index.html"

	$(MAKE) deploy-cloud-search-index

## Update the Cloud Manager search index
deploy-cloud-search-index:
ifneq ($(GIT_BRANCH), master)
	$(error "Aborting attempt to deploy cloud on master")
endif
    
	@echo "Building search index"
	mut-index upload build/public/cloud -o mms-cloud-${GIT_BRANCH}.json -u ${PRODUCTION_URL_CLOUDMGR} -b ${PRODUCTION_BUCKET_CLOUDMGR} -g -s --exclude build/public/cloud/landing.html,build/public/cloud/reference/api/ssh-keys.html,build/public/cloud/reference/automation-agent.html,build/public/cloud/reference/backup-agent.html,build/public/cloud/reference/monitoring-agent.html,build/public/cloud/reference/required-access-automation-agent.html,build/public/cloud/reference/required-access-backup-agent.html,build/public/cloud/reference/required-access-monitoring-agent.html,build/public/cloud/tutorial/configure-automation-agent-for-cr.html,build/public/cloud/tutorial/configure-automation-agent-for-kerberos.html,build/public/cloud/tutorial/configure-automation-agent-for-ldap.html,build/public/cloud/tutorial/configure-automation-agent-for-ssl.html,build/public/cloud/tutorial/configure-automation-agent-for-x509.html,build/public/cloud/tutorial/configure-backup-agent-for-cr.html,build/public/cloud/tutorial/configure-backup-agent-for-kerberos.html,build/public/cloud/tutorial/configure-backup-agent-for-ldap.html,build/public/cloud/tutorial/configure-backup-agent-for-ssl.html,build/public/cloud/tutorial/configure-backup-agent-for-x509.html,build/public/cloud/tutorial/configure-monitoring-agent-for-cr.html,build/public/cloud/tutorial/configure-monitoring-agent-for-kerberos.html,build/public/cloud/tutorial/configure-monitoring-agent-for-ldap.html,build/public/cloud/tutorial/configure-monitoring-agent-for-ssl.html,build/public/cloud/tutorial/configure-monitoring-agent-for-x509.html,build/public/cloud/tutorial/delete-automation-agent.html,build/public/cloud/tutorial/delete-backup-agent.html,build/public/cloud/tutorial/delete-monitoring-agent.html,build/public/cloud/tutorial/nav/automation-agent.html,build/public/cloud/tutorial/nav/backup-agent.html,build/public/cloud/tutorial/nav/configure-automation-agent.html,build/public/cloud/tutorial/nav/configure-backup-agent.html,build/public/cloud/tutorial/nav/configure-monitoring-agent.html,build/public/cloud/tutorial/nav/legacy-agents.html,build/public/cloud/tutorial/nav/monitoring-agent.html,build/public/cloud/tutorial/nav/provision-aws-servers.html,build/public/cloud/tutorial/remove-group-from-automation.html,build/public/cloud/tutorial/start-or-stop-automation-agent.html,build/public/cloud/tutorial/start-or-stop-backup-agent.html,build/public/cloud/tutorial/start-or-stop-monitoring-agent.html 


##########################################################
####                                                  ####
####         DEPLOY OPS MANAGER DOCUMENTATION         ####
####                                                  ####
##########################################################


##########################################################
####   DEPLOY OPS MANAGER DOCUMENTATION TO STAGING    ####
##########################################################

## Deploy artifacts from the working branch of Ops Manager
## to the staging S3 bucket / EC2 for review
stage-onprem:
	mut-publish build/${GIT_BRANCH}/html-onprem ${STAGING_BUCKET_OPSMGR} --prefix=${PREFIX} --stage --all-subdirectories ${ARGS}
	@echo "\n\nHosted at ${STAGING_URL_OPSMGR}/${USER}/${GIT_BRANCH}/index.html"

## Create a fake deployment in the staging bucket
fake-deploy-onprem: build/public/onprem
	@echo "Copying over fullsize images "
	cp source/figures/*fullsize.png build/public/onprem/${GIT_BRANCH}/_images/

	mut-publish build/public/onprem/${GIT_BRANCH} ${STAGING_BUCKET_OPSMGR} --prefix=${GIT_BRANCH} --deploy --all-subdirectories ${ARGS}
	@echo "\n\nHosted at ${STAGING_URL_OPSMGR}/${GIT_BRANCH}/index.html"


########################################################
#### DEPLOY OPS MANAGER DOCUMENTATION TO PRODUCTION ####
########################################################

## Deploy Ops Manager to the production S3 bucket
deploy-onprem: build/public/onprem
	@echo "Copying over fullsize images "
	cp source/figures/*fullsize.png build/public/onprem/${GIT_BRANCH}/_images/

	mut-publish build/public/onprem/ ${PRODUCTION_BUCKET_OPSMGR} --prefix= --deploy  --redirects build/public/onprem/.htaccess ${ARGS}

	@echo "\n\nHosted at ${PRODUCTION_URL_OPSMGR}/${GIT_BRANCH}/index.html"

	$(MAKE) deploy-onprem-search-index

## Update the Ops Manager search index
deploy-onprem-search-index:
	if [ ${STABLE_BRANCH} = ${GIT_BRANCH} ]; then \
		echo "Building search index"; \
		mut-index upload build/public/onprem/${GIT_BRANCH} -o mms-onprem-current.json --aliases mms-onprem-${GIT_BRANCH} -u ${PRODUCTION_URL_OPSMGR}/current -b ${PRODUCTION_BUCKET_OPSMGR}/current -g -s --exclude build/public/onprem/${GIT_BRANCH}/reference/api/ssh-keys.html,build/public/onprem/${GIT_BRANCH}/reference/automation-agent.html,build/public/onprem/${GIT_BRANCH}/reference/backup-agent.html,build/public/onprem/${GIT_BRANCH}/reference/monitoring-agent.html,build/public/onprem/${GIT_BRANCH}/reference/required-access-automation-agent.html,build/public/onprem/${GIT_BRANCH}/reference/required-access-backup-agent.html,build/public/onprem/${GIT_BRANCH}/reference/required-access-monitoring-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-automation-agent-for-cr.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-automation-agent-for-kerberos.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-automation-agent-for-ldap.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-automation-agent-for-ssl.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-automation-agent-for-x509.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-backup-agent-for-cr.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-backup-agent-for-kerberos.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-backup-agent-for-ldap.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-backup-agent-for-ssl.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-backup-agent-for-x509.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-monitoring-agent-for-cr.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-monitoring-agent-for-kerberos.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-monitoring-agent-for-ldap.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-monitoring-agent-for-ssl.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-monitoring-agent-for-x509.html,build/public/onprem/${GIT_BRANCH}/tutorial/delete-automation-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/delete-backup-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/delete-monitoring-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/nav/automation-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/nav/backup-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/nav/configure-automation-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/nav/configure-backup-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/nav/configure-monitoring-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/nav/legacy-agents.html,build/public/onprem/${GIT_BRANCH}/tutorial/nav/monitoring-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/nav/provision-aws-servers.html,build/public/onprem/${GIT_BRANCH}/tutorial/remove-group-from-automation.html,build/public/onprem/${GIT_BRANCH}/tutorial/start-or-stop-automation-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/start-or-stop-backup-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/start-or-stop-monitoring-agent.html; \
	else \
		echo "Building search index"; \
		mut-index upload build/public/onprem/${GIT_BRANCH} -o mms-onprem-${GIT_BRANCH}.json -u ${PRODUCTION_URL_OPSMGR}/${GIT_BRANCH} -b ${PRODUCTION_BUCKET_OPSMGR}/${GIT_BRANCH} -s --exclude build/public/onprem/${GIT_BRANCH}/reference/api/ssh-keys.html,build/public/onprem/${GIT_BRANCH}/reference/automation-agent.html,build/public/onprem/${GIT_BRANCH}/reference/backup-agent.html,build/public/onprem/${GIT_BRANCH}/reference/monitoring-agent.html,build/public/onprem/${GIT_BRANCH}/reference/required-access-automation-agent.html,build/public/onprem/${GIT_BRANCH}/reference/required-access-backup-agent.html,build/public/onprem/${GIT_BRANCH}/reference/required-access-monitoring-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-automation-agent-for-cr.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-automation-agent-for-kerberos.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-automation-agent-for-ldap.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-automation-agent-for-ssl.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-automation-agent-for-x509.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-backup-agent-for-cr.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-backup-agent-for-kerberos.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-backup-agent-for-ldap.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-backup-agent-for-ssl.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-backup-agent-for-x509.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-monitoring-agent-for-cr.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-monitoring-agent-for-kerberos.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-monitoring-agent-for-ldap.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-monitoring-agent-for-ssl.html,build/public/onprem/${GIT_BRANCH}/tutorial/configure-monitoring-agent-for-x509.html,build/public/onprem/${GIT_BRANCH}/tutorial/delete-automation-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/delete-backup-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/delete-monitoring-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/nav/automation-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/nav/backup-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/nav/configure-automation-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/nav/configure-backup-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/nav/configure-monitoring-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/nav/legacy-agents.html,build/public/onprem/${GIT_BRANCH}/tutorial/nav/monitoring-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/nav/provision-aws-servers.html,build/public/onprem/${GIT_BRANCH}/tutorial/remove-group-from-automation.html,build/public/onprem/${GIT_BRANCH}/tutorial/start-or-stop-automation-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/start-or-stop-backup-agent.html,build/public/onprem/${GIT_BRANCH}/tutorial/start-or-stop-monitoring-agent.html; \
	fi
