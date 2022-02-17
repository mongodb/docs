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
STAGING_URL="https://docs-mongodborg-staging.corp.mongodb.com"
PRODUCTION_URL="https://docs.mongodb.com"
STAGING_BUCKET=docs-mongodb-org-prd-staging
PRODUCTION_BUCKET=docs-mongodb-org-prd
PROJECT=kubernetes-operator
STGPREFIX=kubernetes-operator
PREFIX=kubernetes-operator
DOTCOM_STAGING_URL="https://mongodbcom-cdn.website.staging.corp.mongodb.com"
DOTCOM_STAGING_BUCKET=docs-mongodb-org-dotcomstg
DOTCOM_PRODUCTION_URL="https://mongodb.com"
DOTCOM_PRODUCTION_BUCKET=docs-mongodb-org-dotcomprd
DOTCOM_PREFIX=docs-qa/kubernetes-operator
DOTCOM_STGPREFIX=docs-qa/kubernetes-operator

# Parse our published-branches configuration file to get the name of
# the current "stable" branch. This is weird and dumb, yes.
STABLE_BRANCH=`grep 'manual' build/docs-tools/data/${PROJECT}-published-branches.yaml | cut -d ':' -f 2 | grep -Eo '[0-9a-z.]+'`

.PHONY: help html publish stage deploy deploy-search-index

## Show this help message
help:
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo
	@echo 'Variables'
	@printf "  \033[36m%-18s\033[0m %s\n" 'ARGS' 'Arguments to pass to mut-publish'

#################################################################
####                                                         ####
####             BUILD DOCUMENTATION ARTIFACTS               ####
####                                                         ####
#################################################################


#################################################################
####                  BUILD STAGING ARTIFACTS                ####
#################################################################

## Builds this branch's HTML under build/<branch>/html
html:
	giza make html


#################################################################
####       BUILD STAGING ARTIFACTS TO CLEAN DIRECTORY        ####
#################################################################

## Build this branch's HTML files to a fresh build directory
clean-html:
	rm -rf build/${GIT_BRANCH}
	giza make html


#################################################################
####                 BUILD PRODUCTION ARTIFACTS              ####
#################################################################

## Builds this branch's publishable HTML and other artifacts under
## build/public
publish:
	if [ ${GIT_BRANCH} = master ]; then rm -rf build/public; fi;
	rm -rf build/${GIT_BRANCH}
	giza make publish
	if [ ${GIT_BRANCH} = master ]; then mut-redirects config/redirects -o build/public/.htaccess; fi


#################################################################
####                                                         ####
####        DEPLOY KUBERNETES OPERATOR DOCUMENTATION         ####
####                                                         ####
#################################################################


#################################################################
####   DEPLOY KUBERNETES OPERATOR DOCUMENTATION TO STAGING   ####
#################################################################

## Host online for review
stage:
	mut-publish build/${GIT_BRANCH}/html ${STAGING_BUCKET} --prefix=${PROJECT} --stage ${ARGS}
	@echo "\n\nHosted at ${STAGING_URL}/${PROJECT}/${USER}/${GIT_BRANCH}/index.html"


	mut-publish build/${GIT_BRANCH}/html ${DOTCOM_STAGING_BUCKET} --prefix=${DOTCOM_STGPREFIX} --stage ${ARGS}
	@echo "\n\nHosted at ${DOTCOM_STAGING_URL}/${DOTCOM_STGPREFIX}/${USER}/${GIT_BRANCH}/index.html"




#################################################################
####  DEPLOY KUBERNETES OPERATOR DOCUMENTATION TO PRODUCTION ####
#################################################################

## Deploy to the production bucket
deploy: build/public
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PROJECT} --deploy --redirect-prefix='${PROJECT}' ${ARGS}

	@echo "\n\nHosted at ${PRODUCTION_URL}/${PROJECT}/index.html"

	
	mut-publish build/public ${DOTCOM_PRODUCTION_BUCKET} --prefix=${DOTCOM_PREFIX} --deploy --redirect-prefix='${PROJECT}' ${ARGS}

	@echo "\n\nHosted at ${DOTCOM_PRODUCTION_URL}/${DOTCOM_PREFIX}/${GIT_BRANCH}/index.html"


	$(MAKE) deploy-search-index

## Update the search index for this branch
deploy-search-index:
	@echo "Building search index"
	if [ ${STABLE_BRANCH} = ${GIT_BRANCH} ]; then \
		mut-index upload build/public/${GIT_BRANCH} -o ${PROJECT}-current.json --aliases ${PROJECT}-${GIT_BRANCH} -u ${PRODUCTION_URL}/${PROJECT}/stable -b docs-mongodb-org-prd -g -s; \
	else \
		mut-index upload build/public/${GIT_BRANCH} -o ${PROJECT}-${GIT_BRANCH}.json -u ${PRODUCTION_URL}/${PROJECT}/${GIT_BRANCH} -b docs-mongodb-org-prd -s; \
	fi
