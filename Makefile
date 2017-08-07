GIT_BRANCH=`git rev-parse --abbrev-ref HEAD`
USER=`whoami`
STAGING_URL="https://docs-mongodborg-staging.corp.mongodb.com"
PRODUCTION_URL="https://docs.mongodb.org"
STAGING_BUCKET=docs-mongodb-org-staging
PRODUCTION_BUCKET=docs-bi-connector-prod
PROJECT=bi-connector

.PHONY: help html publish stage deploy

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

#This workaround is because the redirects for symlink version does not prefix with ruby-driver.
check-redirects:
	perl -pi -e  's/301 \/v/301 \/bi-connector\/v/g' build/public/.htaccess
	perl -pi -e  's/301 \/current/301 \/bi-connector\/current/g' build/public/.htaccess
