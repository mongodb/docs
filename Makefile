NODE?=/usr/local/bin/node

USER=$(shell whoami)
GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD)

STAGING_BUCKET=docs-mongodb-org-staging
STAGING_PREFIX=redesign/tutorials
STAGING_URL=http://docs-mongodb-org-staging.s3-website-us-east-1.amazonaws.com/${STAGING_PREFIX}/${USER}/${GIT_BRANCH}/

PRODUCTION_BUCKET=docs-mongodb-org-prod
PRODUCTION_PREFIX=tutorials
PRODUCTION_URL=https://docs.mongodb.com/tutorials

.PHONY: help content-html publish deploy deploy-search-index server stage

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

content-html: | tools/node_modules/.npm_pulled
	rm -rf $@/*
	rm -rf public
	$(NODE) tools/genindex.js --config config.toml

publish: | content-html ## Build publishable artifacts under public/
	ulimit -n 1024 && hugo -b ${PRODUCTION_URL}/

deploy: ## Deploy the tutorials site
	$(MAKE) publish

	mut-publish public/ ${PRODUCTION_BUCKET} --prefix=${PRODUCTION_PREFIX} --deploy --all-subdirectories --dry-run --verbose ${ARGS}
	@echo ''
	read -p "Press any key to perform the previous"
	mut-publish public/ ${PRODUCTION_BUCKET} --prefix=${PRODUCTION_PREFIX} --deploy --all-subdirectories --verbose ${ARGS}

	@echo "Deployed"

	$(MAKE) deploy-search-index

deploy-search-index:
	mut-index upload public/ -o tutorials-${GIT_BRANCH}.json -u ${PRODUCTION_URL} -g -s --exclude public/index.html

server: | content-html ## Host the documentation on port 1313
	ulimit -n 1024 && hugo server --renderToDisk -b 'localhost'

stage: | content-html  ## Upload built artifacts to the staging URL
	ulimit -n 1024 && hugo -b ${STAGING_URL}
	mut-publish public/ ${STAGING_BUCKET} --prefix=${STAGING_PREFIX} --stage ${ARGS}
	@echo "Hosted at ${STAGING_URL}"

tools/node_modules/.npm_pulled: tools/package.json
	cd tools && npm install
	touch tools/node_modules/.npm_pulled
