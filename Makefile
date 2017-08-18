GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD)
USER=$(shell whoami)
STAGING_URL="https://docs-mongodborg-staging.corp.mongodb.com"
PRODUCTION_URL="https://docs.mongodb.com"
STAGING_BUCKET=docs-mongodb-org-staging
PRODUCTION_BUCKET=docs-bi-connector-prod
PROJECT=bi-connector

# Parse our published-branches configuration file to get the name of
# the current "stable" branch. This is weird and dumb, yes.
STABLE_BRANCH=`grep 'manual' build/docs-tools/data/${PROJECT}-published-branches.yaml | cut -d ':' -f 2 | grep -Eo '[0-9a-z.]+'`

.PHONY: help html publish stage deploy deploy-search-index

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo
	@echo 'Variables'
	@printf "  \033[36m%-18s\033[0m %s\n" 'ARGS' 'Arguments to pass to mut-publish'

html: ## Builds this branch's HTML under build/<branch>/html
	giza make html

publish: ## Builds this branch's publishable HTML and other artifacts under build/public
	giza make publish

stage: ## Host online for review
	mut-publish build/${GIT_BRANCH}/html ${STAGING_BUCKET} --prefix=${PROJECT} --stage ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${PROJECT}/${USER}/${GIT_BRANCH}/index.html"

deploy: build/public check-redirects ## Deploy to the production bucket
	@echo "Doing a dry-run"
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PROJECT} --deploy --verbose --dry-run --redirect-prefix='bi-connector' ${ARGS}

	@echo 'Press any key to perform the previous' && read result
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PROJECT} --deploy --redirect-prefix='bi-connector' ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL}/${PROJECT}/index.html"

	$(MAKE) deploy-search-index

#This workaround is because the redirects for symlink version does not prefix with ruby-driver.
check-redirects:
	perl -pi -e  's/301 \/v/301 \/bi-connector\/v/g' build/public/.htaccess
	perl -pi -e  's/301 \/current/301 \/bi-connector\/current/g' build/public/.htaccess

deploy-search-index: ## Update the search index for this branch
	@echo "Building search index"
	if [ ${STABLE_BRANCH} = ${GIT_BRANCH} ]; then \
		mut-index upload build/public/${GIT_BRANCH} -o bi-connector-current.json --aliases bi-connector-${GIT_BRANCH} -u ${PRODUCTION_URL}/${PROJECT}/current -g -s; \
	else \
		mut-index upload build/public/${GIT_BRANCH} -o bi-connector-${GIT_BRANCH}.json -u ${PRODUCTION_URL}/${PROJECT}/${GIT_BRANCH} -s; \
	fi
