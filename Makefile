GIT_BRANCH := $(shell git rev-parse --abbrev-ref HEAD)
USER=$(shell whoami)
STAGING_URL="https://docs-mongodbcom-staging.corp.mongodb.com"
PRODUCTION_URL="https://docs.mongodb.com"
STAGING_BUCKET=docs-mongodb-org-staging
PRODUCTION_BUCKET=docs-compass-prod
PROJECT=compass

# Parse our published-branches configuration file to get the name of
# the current "stable" branch. This is weird and dumb, yes.
STABLE_BRANCH=`grep 'manual' build/docs-tools/data/${PROJECT}-published-branches.yaml | cut -d ':' -f 2 | grep -Eo '[0-9a-z.]+'`

.PHONY: help html publish-artifacts stage fake-deploy deploy deploy-search-index migrate-assets

help: ## Show this help message
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "\033[36m%-20s\033[0m %s\n", $$1, $$2}'
	@echo
	@echo 'Variables'
	@printf "  \033[36m%-18s\033[0m %s\n" 'ARGS' 'Arguments to pass to mut-publish'

html: migrate-assets ## Builds this branch's HTML under build/<branch>/html
	giza make html

publish: migrate-assets ## Builds this branch's publishable HTML and other artifacts under build/public
	giza make publish
	if [ ${GIT_BRANCH} = master ]; then mut-redirects config/redirects -o build/public/.htaccess; fi

stage: ## Host online for review
	mut-publish build/${GIT_BRANCH}/html ${STAGING_BUCKET} --prefix=${PROJECT} --stage ${ARGS}
	@echo "\n\nHosted at ${STAGING_URL}/${PROJECT}/${USER}/${GIT_BRANCH}/index.html"

fake-deploy: build/public/${GIT_BRANCH} ## Do a fake deploy on the staging bucket
	mut-publish build/public/${GIT_BRANCH} ${STAGING_BUCKET} --prefix=${PROJECT} --deploy ${ARGS}
	@echo "\n\nHosted at ${STAGING_URL}/${PROJECT}/index.html"

deploy: ## Deploy to the production bucket
	mut-publish build/public ${PRODUCTION_BUCKET} --prefix=${PROJECT} --deploy --redirects build/public/.htaccess ${ARGS}
	@echo "\n\nHosted at ${PRODUCTION_URL}/${PROJECT}/${GIT_BRANCH}/index.html"

	$(MAKE) deploy-search-index

deploy-search-index: ## Update the search index for this branch
	@echo "Building search index"
	if [ ${STABLE_BRANCH} = ${GIT_BRANCH} ]; then \
		mut-index upload build/public/${GIT_BRANCH} -o ${PROJECT}-${GIT_BRANCH}.json -u ${PRODUCTION_URL}/${PROJECT}/current -g -s; \
	else \
		mut-index upload build/public/${GIT_BRANCH} -o ${PROJECT}-${GIT_BRANCH}.json -u ${PRODUCTION_URL}/${PROJECT}/${GIT_BRANCH} -s; \
	fi

migrate-assets:
	-rm -r source/plugins/example-{user-view,video-player,server-version,ssh-tunnel-status}
	mkdir -p source/plugins/example-{video-player,user-view,server-version,ssh-tunnel-status}
	cp plugin-examples/media-player/src/{actions/actions.js,components/media-player/media-player.jsx,stores/store.js} source/plugins/example-video-player/
	cp plugin-examples/users/src/{components/Users/Users.jsx,stores/store.js,components/Users/Users.less} source/plugins/example-user-view/
	cp plugin-examples/server-version/src/{components/server-version/server-version.jsx,stores/store.js,constants/server-version.js,components/server-version/server-version.less,index.js} source/plugins/example-server-version/
	cp plugin-examples/ssh-tunnel-status/src/{stores/store.js,components/ssh-tunnel-status/ssh-tunnel-status.jsx,components/ssh-tunnel-status/ssh-tunnel-status.less} source/plugins/example-ssh-tunnel-status/
