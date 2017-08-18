# Makefile for Mongoid docs

GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
USER=$(shell whoami)
STAGING_URL="https://docs-mongodborg-staging.corp.mongodb.com"
PRODUCTION_URL="https://docs.mongodb.com"

# We put the mongoid files in the same bucket as the ruby driver docs.
STAGING_BUCKET=docs-mongodb-org-staging
PRODUCTION_BUCKET=docs-ruby-driver

PROJECT=mongoid
TARGET_DIR=source-${GIT_BRANCH}

SOURCE_FILE_DIR=build/mongoid-master

# Parse our published-branches configuration file to get the name of
# the current "stable" branch. This is weird and dumb, yes.
STABLE_BRANCH=`grep 'manual' build/docs-tools/data/${PROJECT}-published-branches.yaml | cut -d ':' -f 2 | grep -Eo '[0-9a-z.]+'`

.PHONY: help stage fake-deploy deploy deploy-search-index api-docs get-assets migrate

help:
	@echo 'Targets'
	@echo '  help         - Show this help message'
	@echo '  stage        - Host online for review'
	@echo '  fake-deploy-all  - Create a fake deployment in the staging bucket'
	@echo '  deploy       - Deploy to the production bucket'
	@echo ''
	@echo 'Variables'
	@echo '  ARGS         - Arguments to pass to mut-publish'

html: migrate
	giza make html

## Migrate the files from the driver repo and build the dirhtml for publishing
## In course of building, will use yard to build API docs (takes a while)
# you must install yard
# generate the api docs from the mongoid project and output to the build dir

publish: migrate 
	giza make publish
	@echo "Making api  directory in /build/public/${GIT_BRANCH}"
	if [ -d build/public/${GIT_BRANCH}/api ]; then rm -rf build/public/${GIT_BRANCH}/api ; fi;
	mkdir build/public/${GIT_BRANCH}/api

	yard doc ${SOURCE_FILE_DIR}   --readme ${SOURCE_FILE_DIR}/README.md -o build/public/${GIT_BRANCH}/api/

stage:
	mut-publish build/${GIT_BRANCH}/html ${STAGING_BUCKET} --prefix=${PROJECT} --stage ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${PROJECT}/${USER}/${GIT_BRANCH}/index.html"

fake-deploy: build/public/${GIT_BRANCH} 
	mut-publish build/public ${STAGING_BUCKET} --prefix=${PROJECT} --deploy --verbose  ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${PROJECT}/${GIT_BRANCH}/index.html"

deploy: build/public/${GIT_BRANCH} 
	@echo "Doing a dry-run"
	mut-publish build/public/ ${PRODUCTION_BUCKET} --prefix=${PROJECT} --deploy --verbose  --redirects build/public/.htaccess --dry-run ${ARGS}

	@echo ''
	read -p "Press any key to perform the previous upload to ${PRODUCTION_BUCKET}"
	mut-publish build/public/ ${PRODUCTION_BUCKET} --prefix=${PROJECT} --deploy --verbose  --redirects build/public/.htaccess ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL}/${PROJECT}/${GIT_BRANCH}"

	$(MAKE) deploy-search-index

deploy-search-index:
	@echo "Building search index"
	if [ ${STABLE_BRANCH} = ${GIT_BRANCH} ]; then \
		mut-index upload build/public/${GIT_BRANCH} -o ${PROJECT}-${GIT_BRANCH}.json -u ${PRODUCTION_URL}/${PROJECT}/${GIT_BRANCH} -g -s --exclude build/public/master/api; \
	else \
		mut-index upload build/public/${GIT_BRANCH} -o ${PROJECT}-${GIT_BRANCH}.json -u ${PRODUCTION_URL}/${PROJECT}/${GIT_BRANCH} -s --exclude build/public/master/api; \
	fi

# in case you want to just generate the api-docs
# generate the api docs
# you must install yard
# generate the api docs from the mongoid project and output to the build dir

api-docs:
	@echo "Making api  directory in /build/public/${GIT_BRANCH}"
	if [ -d build/public/${GIT_BRANCH}/api ]; then rm -rf build/public/${GIT_BRANCH}/api ; fi;
	mkdir build/public/${GIT_BRANCH}/api

	yard doc ${SOURCE_FILE_DIR}   --readme ${SOURCE_FILE_DIR}/README.md -o build/public/${GIT_BRANCH}/api/


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
