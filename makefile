GIT_BRANCH=`git rev-parse --abbrev-ref HEAD`
USER=`whoami`

STAGING_URL="https://docs-staging.atlas.mongodb.com"
STAGING_BUCKET=docs-atlas-staging

PRODUCTION_URL="https://docs.atlas.mongodb.com"
PRODUCTION_BUCKET=docs-atlas-prod
PREFIX=

.PHONY: help stage fake-deploy deploy publish deploy-search-index

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

html:
	giza make html

stage:
	mut-publish build/${GIT_BRANCH}/html ${STAGING_BUCKET} --prefix=${PREFIX} --stage ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${USER}/${GIT_BRANCH}/index.html"

publish:
	giza make publish

fake-deploy: build/public
	mut-publish build/public/ ${STAGING_BUCKET} --prefix=${PREFIX} --deploy --verbose  --all-subdirectories  ${ARGS}
	@echo "Hosted at ${STAGING_URL}/index.html"

deploy: build/public
	@echo "Doing a dry-run"
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PREFIX} --deploy --verbose --all-subdirectories  --dry-run ${ARGS}

	@echo ''
	read -p "Press any key to perform the previous"
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PREFIX} --deploy --all-subdirectories ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL}/index.html"

	$(MAKE) deploy-search-index

deploy-search-index:
	@echo "Building search index"
	mut-index upload build/public -o atlas-${GIT_BRANCH}.json -u ${PRODUCTION_URL} -g -s
