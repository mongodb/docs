# Makefile for Ruby driver docs

GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
USER=`whoami`
STAGING_URL="https://docs-mongodborg-staging.corp.mongodb.com"
PRODUCTION_URL="https://docs.mongodb.com"
	
STAGING_BUCKET=docs-mongodb-org-staging
PRODUCTION_BUCKET=docs-mongodb-org-prod

PREFIX=ruby-driver
TARGET_DIR=source-${GIT_BRANCH}

.PHONY: help stage fake-deploy deploy

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

publish: migrate 
	giza make publish


stage:
	mut-publish build/${GIT_BRANCH}/html ${STAGING_BUCKET} --prefix=${PREFIX} --stage ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${PREFIX}/${USER}/${GIT_BRANCH}/index.html"

fake-deploy: build/public/${GIT_BRANCH}
	mut-publish build/public/${GIT_BRANCH} ${STAGING_BUCKET} --prefix=${PREFIX}/${GIT_BRANCH} --deploy --verbose  --all-subdirectories ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${PREFIX}/${GIT_BRANCH}/index.html"

deploy: build/public/${GIT_BRANCH}
	@echo "Doing a dry-run"
	mut-publish build/public/${GIT_BRANCH} ${PRODUCTION_BUCKET} --prefix=${PREFIX}/${GIT_BRANCH} --deploy --verbose --all-subdirectories --redirects build/public/.htaccess --dry-run ${ARGS}

	@echo ''
	read -p "Press any key to perform the previous upload to ${PRODUCTION_BUCKET}"
	mut-publish build/public/${GIT_BRANCH} ${PRODUCTION_BUCKET} --prefix=${PREFIX}/${GIT_BRANCH} --deploy --verbose --all-subdirectories  --redirects build/public/.htaccess ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL}/${PREFIX}/${GIT_BRANCH}"

migrate: get-assets
	@echo "Making target source directory -- doing this explicitly instead of via cp"
	if [ -d ${TARGET_DIR} ]; then rm -rf ${TARGET_DIR} ; fi;
	mkdir ${TARGET_DIR}
	mkdir -p ${TARGET_DIR}/tutorials/5.1.0
	mkdir -p ${TARGET_DIR}/tutorials/6.0.0
	
	@echo "Copying over ruby-driver docs files"
	cp -R build/ruby-driver-${GIT_BRANCH}/docs/ ${TARGET_DIR}
	
	@echo "Copying over bson  docs files"
	cp -R build/bson-ruby/docs/ ${TARGET_DIR}
	
	
	
	@echo "Regex'ing mongoid-5.1 toctree"
	perl -pe  's/\/tutorials\/version\//\/tutorials\/5.1.0\//g' build/mongoid-5.1/docs/mongoid-tutorials.txt | tee ${TARGET_DIR}/mongoid-tutorials-5.1.txt 
	
	@echo "Copying over mongoid-5.1 docs files"
	cp -R build/mongoid-5.1/docs/tutorials/ ${TARGET_DIR}/tutorials/5.1.0/
	
	@echo "Regex'ing mongoid-master toctree - Currently master = mongoid 6.0.0"
	perl -pe  's/\/tutorials\/version\//\/tutorials\/6.0.0\//g' build/mongoid-master/docs/mongoid-tutorials.txt | tee ${TARGET_DIR}/mongoid-tutorials-6.0.txt 
	
	
	@echo "Copying over mongoid-master tutorials files"
	cp build/mongoid-master/docs/mongoid.txt ${TARGET_DIR}/mongoid.txt

	cp -R build/mongoid-master/docs/tutorials/ ${TARGET_DIR}/tutorials/6.0.0
	
	
get-assets:
	giza generate assets
