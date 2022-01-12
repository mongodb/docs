GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD)
USER=$(shell whoami)
STAGING_URL="https://docs-mongodborg-staging.corp.mongodb.com"
PRODUCTION_URL="https://docs.mongodb.com"
STAGING_BUCKET=docs-mongodb-org-stg
PRODUCTION_BUCKET=docs-mongodb-org-prd
PREFIX=

# Parse our published-branches configuration file to get the name of
# the current "stable" branch. This is weird and dumb, yes.
STABLE_BRANCH=`grep 'manual' build/docs-tools/data/manual-published-branches.yaml | cut -d ':' -f 2 | grep -Eo '[0-9a-z.]+'`

.PHONY: help lint html stage fake-deploy deploy deploy-search-index

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo
	@echo 'Variables'
	@echo '  ARGS         - Arguments to pass to mut-publish'

html: ## Builds this branch's HTML under build/<branch>/html
	giza make html

publish: ## Builds this branch's publishable HTML and other artifacts under build/public
	giza make publish

lint: ## Checks URLs in the built corpus underneath build/<branch>/html
	mut-lint --linters=links ./build/master/source/ ${ARGS}

stage: ## Host online for review
	mut-publish build/${GIT_BRANCH}/html ${STAGING_BUCKET} --prefix=${PREFIX} --stage ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${PREFIX}/${USER}/${GIT_BRANCH}/index.html"

fake-deploy: build/public
	mut-publish build/public/ ${STAGING_BUCKET} --prefix=${PREFIX} --deploy ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${PREFIX}/index.html"

deploy: build/public ## Deploy to the production bucket
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PREFIX} --deploy ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL}/${PREFIX}/index.html"

	$(MAKE) deploy-search-index

deploy-search-index: ## Update the search index for this branch
	@echo "Building search index"
	if [ ${STABLE_BRANCH} = ${GIT_BRANCH} ]; then \
		mut-index upload build/public/${GIT_BRANCH} -o manual-current.json -u ${PRODUCTION_URL}/manual -g -s; \
	else \
		mut-index upload build/public/${GIT_BRANCH} -o manual-${GIT_BRANCH}.json -u ${PRODUCTION_URL}/${GIT_BRANCH} -s; \
	fi
