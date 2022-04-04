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

GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD)
ifeq ($(STAGING_USERNAME),)
	USER=$(shell whoami)
else
	USER=$(STAGING_USERNAME)
endif

STAGING_URL="https://docs-staging.atlas.mongodb.com"
STAGING_BUCKET=docs-atlas-staging

PRODUCTION_URL="https://www.mongodb.com/docs/atlas"
PRODUCTION_BUCKET=docs-atlas-prod
PREFIX=

.PHONY: help stage fake-deploy deploy publish deploy-search-index remote-includes

help:
	@echo 'Targets'
	@echo '  help         - Show this help message'
	@echo '  html         - Builds the html files.  Need if staging.'
	@echo '  stage        - Host online for review'
	@echo '  fake-deploy  - Create a fake deployment in the staging bucket'
	@echo '  deploy       - Deploy to the production bucket'
	@echo ''
	@echo 'Variables'
	@echo '  ARGS         - Arguments to pass to mut-publish'


##########################################################
####                                                  ####
####          BUILD DOCUMENTATION ARTIFACTS           ####
####                                                  ####
##########################################################


##########################################################
####            BUILD STAGING ARTIFACTS               ####
##########################################################

html: remote-includes
	giza make html


##########################################################
####   BUILD STAGING ARTIFACTS TO CLEAN DIRECTORY     ####
##########################################################

## Build both Cloud/Ops Manager HTML files to a fresh build directory
clean-html: remote-includes
	rm -rf build/${GIT_BRANCH}
	time giza make html



##########################################################
####             BUILD PRODUCTION ARTIFACTS           ####
##########################################################

publish: remote-includes
	if [ ${GIT_BRANCH} = master ]; then rm -rf build/master build/public; fi
	giza make publish
	if [ ${GIT_BRANCH} = master ]; then mut-redirects config/redirects -o build/public/.htaccess; fi


##########################################################
####                                                  ####
####            DEPLOY ATLAS DOCUMENTATION            ####
####                                                  ####
##########################################################


##########################################################
####       DEPLOY ATLAS DOCUMENTATION TO STAGING      ####
##########################################################

stage:
	mut-publish build/${GIT_BRANCH}/html ${STAGING_BUCKET} --prefix=${PREFIX} --stage ${ARGS}
	@echo "\n\nHosted at ${STAGING_URL}/${USER}/${GIT_BRANCH}/index.html"


##########################################################
####     DEPLOY ATLAS DOCUMENTATION TO PRODUCTION     ####
##########################################################

fake-deploy: build/public
	mut-publish build/public/ ${STAGING_BUCKET} --prefix=${PREFIX} --deploy --verbose  --all-subdirectories  ${ARGS}
	@echo "\n\nHosted at ${STAGING_URL}/index.html"

deploy: build/public
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PREFIX} --deploy --all-subdirectories ${ARGS}

	@echo "\n\nHosted at ${PRODUCTION_URL}/index.html"

	$(MAKE) deploy-search-index

deploy-search-index:
	@echo "Building search index"
	mut-index upload build/public -o atlas-${GIT_BRANCH}.json -u ${PRODUCTION_URL} -g -s --exclude build/public/tutorial/access-encrypted-snapshot/index.html


##########################################################
####                    PULL ASSETS                   ####
##########################################################

remote-includes:
	mkdir -p source/includes/remote
	curl -SfL https://raw.githubusercontent.com/mongodb/docs-assets/atlas/fact-configure-api-access.rst -o source/includes/remote/fact-configure-api-access.rst


##########################################################
####                GENERATE SCREENSHOTS              ####
##########################################################

screenshots:
	giza generate assets
	@echo "Running screenshot tool"
	-rm -r screenshots-temp/
	mkdir -p screenshots-temp/
	cd build/screencapture-tool && npm install
	#node build/docs-tools/tools/screenshot-tool/screenshots.js `pwd`/screenshot-scripts/create-cluster2.js `pwd`/screenshot-scripts/.properties.ini
	node build/screencapture-tool/screenshots.js `pwd`/screenshot-scripts/atlas-metrics.js `pwd`/screenshot-scripts/.properties.ini
