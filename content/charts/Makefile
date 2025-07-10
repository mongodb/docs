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
USER=$(shell whoami)

STAGING_URL="https://docs-mongodborg-staging.corp.mongodb.com"
STAGING_BUCKET=docs-mongodb-org-staging

PRODUCTION_URL="https://www.mongodb.com/docs"
PRODUCTION_BUCKET=docs-compass-prod

PROJECT=charts

.PHONY: help html stage publish  deploy-search-index publish

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo
	@echo 'Variables'
	@printf "  \033[36m%-18s\033[0m %s\n" 'ARGS' 'Arguments to pass to mut-publish'

html: ## Builds the html files
	giza make html

stage: ## Host online for review
	mut-publish build/${GIT_BRANCH}/html ${STAGING_BUCKET} --prefix=${PROJECT} --stage ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${PROJECT}/${USER}/${GIT_BRANCH}/index.html"

publish: ## Builds this branch's publishable HTML and other artifacts under build/public
	giza make publish
	if [ ${GIT_BRANCH} = master ]; then mut-redirects config/redirects -o build/public/.htaccess; fi

deploy: ## Deploy to the production bucket
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PROJECT} --deploy --redirects build/public/.htaccess ${ARGS}
	@echo "Hosted at ${PRODUCTION_URL}/${PROJECT}/${GIT_BRANCH}/index.html"

	$(MAKE) deploy-search-index

deploy-search-index: ## Update the search index for this branch
	@echo "Building search index"
	mut-index upload build/public -o ${PROJECT}-${GIT_BRANCH}.json -u ${PRODUCTION_URL}/${PROJECT} -g -s

screenshots:
	giza generate assets
	@echo "Running screenshot tool"
	-rm -r screenshots-temp/
	mkdir -p screenshots-temp/
	cd build/screencapture-tool && npm install
	#node build/docs-tools/tools/screenshot-tool/screenshots.js `pwd`/screenshot-scripts/order-tutorial-dashboard-final.js
	#node build/docs-tools/tools/screenshot-tool/screenshots.js `pwd`/screenshot-scripts/user-management.js
	#node build/docs-tools/tools/screenshot-tool/screenshots.js `pwd`/screenshot-scripts/movie-tutorial.js
	#node build/docs-tools/tools/screenshot-tool/screenshots.js `pwd`/screenshot-scripts/data-sources.js `pwd`/screenshot-scripts/.properties.ini
	node build/screencapture-tool/screenshots.js `pwd`/screenshot-scripts/data-table-dynamic.js `pwd`/screenshot-scripts/.properties.ini
