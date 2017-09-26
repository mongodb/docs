GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD)
USER=$(shell whoami)
STAGING_URL="https://docs-mongodborg-staging.corp.mongodb.com"
PRODUCTION_URL="https://docs.mongodb.com/ecosystem"
STAGING_BUCKET=docs-mongodb-org-staging
PRODUCTION_BUCKET=docs-mongodb-org-prod

# "PROJECT" currently exists to support having multiple projects
# within one bucket.
PROJECT=ecosystem

.PHONY: help lint html stage deploy deploy-search-index

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo
	@echo 'Variables'
	@printf "  \033[36m%-18s\033[0m %s\n" 'ARGS' 'Arguments to pass to mut-publish'

html: ## Builds this branch's HTML under build/<branch>/html
	giza make html

publish: ## Builds this branch's publishable HTML and other artifacts under build/public
	giza make publish
	if [ ${GIT_BRANCH} = master ]; then mut-redirects config/redirects -o build/public/.htaccess; fi

lint: ## Checks URLs in the built corpus underneath build/<branch>/html
	mut-lint --linters=links ./build/master/source/ ${ARGS}

stage: ## Host online for review
	mut-publish build/${GIT_BRANCH}/html ${STAGING_BUCKET} --prefix=${PROJECT} --stage ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${PROJECT}/${USER}/${GIT_BRANCH}/index.html"

deploy: build/public ## Deploy to the production bucket
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PROJECT} --deploy --redirect-prefix='ecosystem' --all-subdirectories  ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL}/index.html"

	$(MAKE) deploy-search-index

deploy-search-index: ## Update the search index for this branch
	@echo "Building search index"
	mut-index upload build/public -o ${PROJECT}-${GIT_BRANCH}.json -u ${PRODUCTION_URL} -s
