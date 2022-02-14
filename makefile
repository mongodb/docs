GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD)
PRODUCTION_URL="https://docs.mongodb.com"
PRODUCTION_BUCKET=docs-mongodb-org-prd

.PHONY: help html deploy deploy-search-index

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo
	@echo 'Variables'
	@printf "  \033[36m%-18s\033[0m %s\n" 'ARGS' 'Arguments to pass to mut-publish'

html: ## Builds this branch's HTML under build/<branch>/html
	giza make html

publish: ## Builds this branch's publishable HTML and other artifacts under build/public
	giza make publish

# The recursive behavior would CHANGE if --all-subdirectories were
# given: ALL contents of build/public/<branch> would be upload
deploy: build/public ## Deploy to the production bucket
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PROJECT} --deploy --redirect-prefix='v[0-9]\.[0-9]' --redirect-prefix='manual' --redirect-prefix='master' ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL}/index.html"

	$(MAKE) deploy-search-index

deploy-search-index: ## Update the search index for this branch
	@echo "Building search index"
	mut-index upload build/public/${GIT_BRANCH} -o manual-${GIT_BRANCH}.json -u ${PRODUCTION_URL}/${GIT_BRANCH} -s
