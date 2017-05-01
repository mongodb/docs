USER=`whoami`
GIT_BRANCH=`git rev-parse --abbrev-ref HEAD`
STAGING_BUCKET=docs-mongodb-org-staging
STAGING_PREFIX=tutorials
STAGING_URL=http://docs-mongodb-org-staging.s3-website-us-east-1.amazonaws.com/${STAGING_PREFIX}/${USER}/${GIT_BRANCH}

.PHONY: build server help stage

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'

build: | tools/node_modules ## Build into public/
	hugo -b "${STAGING_URL}"
	$(NODE) tools/genindex.js content public/search.json public/tags.json --config config.toml

server: ## Host the documentation on port 1313
	$(NODE) tools/genindex.js content public/search.json public/tags.json --config config.toml
	hugo server --renderToDisk -b 'localhost'

stage: build  # Upload built artifacts to the staging URL
	mut-publish public/ ${STAGING_BUCKET} --prefix=${STAGING_PREFIX} --stage ${ARGS}
	@echo "Hosted at ${STAGING_URL}"

tools/node_modules: tools/package.json
	cd tools && npm update
