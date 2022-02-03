GIT_BRANCH=$(shell git rev-parse --abbrev-ref HEAD)
USER=$(shell whoami)
STAGING_URL="https://docs-mongodborg-staging.corp.mongodb.com"
PRODUCTION_URL="https://docs.mongodb.com"
STAGING_BUCKET=docs-mongodb-org-stg
PRODUCTION_BUCKET=docs-mongodb-org-prd
PROJECT=php-library

ifeq ($(ENV), 'dotcom_stg')
	STAGING_URL="https://docs-mongodborg-staging.corp.mongodb.com"
	STAGING_BUCKET=docs-mongodb-org-dotcomstg
endif

ifeq ($(ENV), 'dotcom_prd')
	PRODUCTION_URL="https://mongodb.com/docs"
	PRODUCTION_BUCKET=docs-mongodb-org-dotcomprd
endif

# Parse our published-branches configuration file to get the name of
# the current "stable" branch. This is weird and dumb, yes.
STABLE_BRANCH=`grep 'manual' build/docs-tools/data/${PROJECT}-published-branches.yaml | cut -d ':' -f 2 | grep -Eo '[0-9a-z.]+'`

.PHONY: help publish stage deploy deploy-search-index

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo
	@echo 'Variables'
	@printf "  \033[36m%-18s\033[0m %s\n" 'ARGS' 'Arguments to pass to mut-publish'

html:
	giza make html

publish: ## Build docs locally
# !!! DOES NOT PUT STUFF ONTO THE INTERNET !!!
# Builds the artifacts that you will deploy with other targets.
# Also builds an HTML rendering for local viewing.
#
# If master branch, giza creates any symlinks needed per integrations.yaml
# If master, giza creates any redirects per build_conf.yaml / htaccess.yaml

	# get the latest for mongo-php-libray/docs git submodule:
	git submodule update --remote --init
	# rsync the docs source from the submodule to the source/ directory:
	rsync -a --delete mongo-php-library/docs/ source/
	# build the publish artefacts using giza:
	giza make publish
	if [ ${GIT_BRANCH} = master ]; then mut-redirects config/redirects -o build/public/.htaccess; fi

stage: ## Host online for review
# !!! DEPLOY HTML TO STAGING WEBSITE !!!
# Deploys the HTML from the build/<branch> directory to the STAGING_BUCKET.
#
# mut-publish
#       build/${GIT_BRANCH}/html  directory from which to grab the HTML to deploy to the STAGING_BUCKET
#       STAGING_BUCKET            Amazon s3 bucket used for the staging site
#         --prefix=${PROJECT}      ${PROJECT} is the folder in the staging bucket in which to place the HTML
#      --stage                    indicates that mut-publish should publish to the staging bucket (not the prod bucket)
#      if ${ARGS}, then additonal arguments

	mut-publish build/${GIT_BRANCH}/html ${STAGING_BUCKET} --prefix=${PROJECT} --stage ${ARGS}
	@echo "Hosted at ${STAGING_URL}/${PROJECT}/${USER}/${GIT_BRANCH}/index.html"



deploy: publish ## Deploy to the production bucket
# !!! DEPLOY BUILD ARTIFACTS TO PRODUCTION !!!
# Deploys the build artifacts from the build/public directory to the PRODUCTION_BUCKET,
# first doing a 'dry run' that lists all of the files that will be uploaded/deleted/etc.
# and then asks you to press a key to perform the procedure.
#
# deploy: publish 	the :publish indicates that the publish target must happen before the deploy
# mut-publish
#      build/public         directory from which to grab the build artifacts to deploy to the PRODUCTION_BUCKET
#      PRODUCTION_BUCKET    Amazon s3 bucket that holds the production docs
#      --prefix=${PROJECT}   ${PROJECT} is the folder in the prod. bucket in which to place the artifacts
#      --deploy             indicates that mut-publish should publish to the production bucket (not the staging bucket)
#      --verbose            prints out a detail of what files are being uploaded/deleted/etc.
#      --dry-run            instructs mut-publish to do everything *except* actually put stuff on the internet.
#      if ${ARGS}, then additonal arguments
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PROJECT} --deploy ${ARGS}

	@echo "Hosted at ${PRODUCTION_URL}/${PROJECT}/index.html"

	$(MAKE) deploy-search-index

deploy-search-index: ## Update the search index for this branch
	@echo "Building search index"
	if [ ${STABLE_BRANCH} = ${GIT_BRANCH} ]; then \
		mut-index upload build/public/${GIT_BRANCH} -o docs-php-library-${GIT_BRANCH}.json -u ${PRODUCTION_URL}/${PROJECT}/${GIT_BRANCH} -g -s; \
	else \
		mut-index upload build/public/${GIT_BRANCH} -o docs-php-library-${GIT_BRANCH}.json -u ${PRODUCTION_URL}/${PROJECT}/${GIT_BRANCH} -s; \
	fi

