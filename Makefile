GIT_BRANCH=`git rev-parse --abbrev-ref HEAD`
USER=`whoami`
STAGING_URL="https://docs-mongodborg-staging.corp.mongodb.com"
PRODUCTION_URL="https://docs.mongodb.org"
STAGING_BUCKET=docs-mongodb-org-staging
PRODUCTION_BUCKET=docs-mongodb-org-prod
PREFIX=php-library

.PHONY: help publish stage fake-deploy deploy

help:
	@echo 'Targets'
	@echo '  help         - Show this help message'
	@echo '  publish      - Build docs locally'
	@echo '  stage        - Host online for review'
	@echo '  fake-deploy  - Create a fake deployment in the staging bucket'
	@echo '  deploy       - Deploy to the production bucket'
	@echo ''
	@echo 'Variables'
	@echo '  ARGS         - Arguments to pass to mut-publish'

publish:
	git submodule update --init
	rsync -a --delete mongo-php-library/docs/ source/
	giza -l debug make publish

stage:
	mut-publish build/${GIT_BRANCH}/html ${STAGING_BUCKET} --prefix=${PREFIX} --stage ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${PREFIX}/${USER}/${GIT_BRANCH}/index.html"

fake-deploy: build/public
	mut-publish build/public/ ${STAGING_BUCKET} --prefix=${PREFIX} --deploy ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${PREFIX}/index.html"

deploy: build/public
	@echo "Doing a dry-run"
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PREFIX} --deploy --verbose --all-subdirectories --dry-run ${ARGS}

	@echo ''
	read -p "Press any key to perform the previous"
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PREFIX} --deploy --all-subdirectories ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL}/${PREFIX}/index.html"
