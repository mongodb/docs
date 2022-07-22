# Makefile for Mongoid docs

GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
USER=$(shell whoami)
STAGING_URL="https://docs-mongodborg-staging.corp.mongodb.com"
PRODUCTION_URL="https://docs.mongodb.com"

STAGING_BUCKET=docs-mongodb-org-prd-staging
PRODUCTION_BUCKET=docs-mongodb-org-prd

SEARCH_INDEX_BUCKET=docs-search-indexes-test

PROJECT=mongoid
PREFIX=mongoid
TARGET_DIR=source-${GIT_BRANCH}

SOURCE_FILE_DIR=build/mongoid-${GIT_BRANCH}
DOTCOM_STAGING_URL="https://mongodbcom-cdn.website.staging.corp.mongodb.com"
DOTCOM_STAGING_BUCKET=docs-mongodb-org-dotcomstg
DOTCOM_PRODUCTION_URL="https://mongodb.com"
DOTCOM_PRODUCTION_BUCKET=docs-mongodb-org-dotcomprd
DOTCOM_PREFIX=docs/mongoid
DOTCOM_STGPREFIX=docs/mongoid

# Parse our published-branches configuration file to get the name of
# the current "stable" branch. This is weird and dumb, yes.
STABLE_BRANCH=`grep 'manual' build/docs-tools/data/${PROJECT}-published-branches.yaml | cut -d ':' -f 2 | grep -Eo '[0-9a-z.]+'`

.PHONY: help stage fake-deploy deploy deploy-search-index api-docs get-assets migrate clean

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo
	@echo 'Variables'
	@printf "  \033[36m%-18s\033[0m %s\n" 'ARGS' 'Arguments to pass to mut-publish'

html: migrate ## Builds this branch's HTML under build/<branch>/html
	giza make html

## Migrate the files from the driver repo and build the dirhtml for publishing
## In course of building, will use yard to build API docs (takes a while)
# you must install yard
# generate the api docs from the mongoid project and output to the build dir

debug:
	@echo ${DOTCOM_PRODUCTION_BUCKET}

publish: migrate ## Builds this branch's publishable HTML and other artifacts under build/public
	giza make publish
	@echo "Making api  directory in /build/public/${GIT_BRANCH}"
	if [ -d build/public/${GIT_BRANCH}/api ]; then rm -rf build/public/${GIT_BRANCH}/api ; fi;
	mkdir build/public/${GIT_BRANCH}/api

	yard doc ${SOURCE_FILE_DIR} --exclude ${SOURCE_FILE_DIR}/spec --exclude ${SOURCE_FILE_DIR}/perf --readme ${SOURCE_FILE_DIR}/README.md -o build/public/${GIT_BRANCH}/api/
	if [ ${GIT_BRANCH} = master ]; then mut-redirects config/redirects -o build/public/.htaccess; fi

stage: ## Host online for review
	mut-publish build/${GIT_BRANCH}/html ${DOTCOM_STAGING_BUCKET} --prefix=${DOTCOM_STGPREFIX} --stage ${ARGS}
	@echo "Hosted at ${DOTCOM_STAGING_URL}/${DOTCOM_STGPREFIX}/${USER}/${GIT_BRANCH}/index.html"



fake-deploy: build/public/${GIT_BRANCH} ## Create a fake deployment in the staging bucket
	mut-publish build/public ${DOTCOM_STAGING_BUCKET} --prefix=${DOTCOM_STGPREFIX} --deploy --verbose  ${ARGS}
	@echo "Hosted at ${DOTCOM_STAGING_URL}/${DOTCOM_STGPREFIX}/${GIT_BRANCH}/index.html"



deploy: build/public/${GIT_BRANCH} ## Deploy to the production bucket
	mut-publish build/public/ ${DOTCOM_PRODUCTION_BUCKET} --prefix=${DOTCOM_PREFIX} --deploy --redirects build/public/.htaccess ${ARGS}
	@echo "Hosted at ${DOTCOM_PRODUCTION_URL}/${DOTCOM_PREFIX}/${GIT_BRANCH}"

	$(MAKE) deploy-search-index

deploy-search-index: ## Update the search index for this branch
	@echo "Building search index"
	if [ ${STABLE_BRANCH} = ${GIT_BRANCH} ]; then \
		mut-index upload build/public/${GIT_BRANCH} -o ${PROJECT}-${GIT_BRANCH}.json -u ${PRODUCTION_URL}/${PROJECT}/${GIT_BRANCH} -b ${SEARCH_INDEX_BUCKET} -p search-indexes/prd -g -s --exclude build/public/${GIT_BRANCH}/api; \
	else \
		mut-index upload build/public/${GIT_BRANCH} -o ${PROJECT}-${GIT_BRANCH}.json -u ${PRODUCTION_URL}/${PROJECT}/${GIT_BRANCH} -b ${SEARCH_INDEX_BUCKET} -p search-indexes/prd -s --exclude build/public/${GIT_BRANCH}/api; \
	fi

# in case you want to just generate the api-docs
# generate the api docs
# you must install yard
# generate the api docs from the mongoid project and output to the build dir

api-docs:
	@echo "Making api  directory in /build/public/${GIT_BRANCH}"
	if [ -d build/public/${GIT_BRANCH}/api ]; then rm -rf build/public/${GIT_BRANCH}/api ; fi;
	mkdir build/public/${GIT_BRANCH}/api

	yard doc ${SOURCE_FILE_DIR} --exclude ${SOURCE_FILE_DIR}/spec --exclude ${SOURCE_FILE_DIR}/perf --readme ${SOURCE_FILE_DIR}/README.md -o build/public/${GIT_BRANCH}/api/


migrate: get-assets
	@echo "Making target source directory"
	if [ -d ${TARGET_DIR} ]; then rm -rf ${TARGET_DIR} ; fi;
	mkdir ${TARGET_DIR}


	@echo "Copying over mongoid doc files"
	cp -r ${SOURCE_FILE_DIR}/docs/* ${TARGET_DIR}/

# This gets the docs-tools and the mongoid docs from the mongoid repo.
# the assets are defined in the config/build_conf.yaml

get-assets:
	giza generate assets

clean:
	rm -rf build giza.log source-master
