GIT_BRANCH=`git rev-parse --abbrev-ref HEAD`
USER=`whoami`
URL="https://docs-mongodborg-staging.corp.mongodb.com"
PRODUCTION_BUCKET=docs-mongodb-org-prod
PREFIX=landing

DOCS_TOOLS_THEME=docs-tools/themes/mongodb/static

.PHONY: help stage fake-deploy build clean

help:
	@echo 'Targets'
	@echo '  help         - Show this help message'
	@echo '  build        - Build HTML artifacts for upload'
	@echo '  stage        - Host online for review'
	@echo '  deploy       - Deploy into production'
	@echo ''
	@echo 'Variables'
	@echo '  ARGS         - Arguments to pass to mut-publish'

stage: build
	mut-publish build/ docs-mongodb-org-staging --prefix=${PREFIX} --stage ${ARGS}
	@echo "Hosted at ${URL}/${PREFIX}/${USER}/${GIT_BRANCH}/cloud/index.html"
	@echo "Hosted at ${URL}/${PREFIX}/${USER}/${GIT_BRANCH}/tools/index.html"

deploy: build
	mut-publish build ${PRODUCTION_BUCKET} --prefix='/' --deploy --all-subdirectories ${ARGS}

	@echo "Deployed"

build:
	@# Pull docs-tools updates
	git submodule init
	git submodule update --remote

	@# Clean build directory
	rm -rf $@

	@# Create output directories
	mkdir -p $@
	mkdir -p $@/cloud
	mkdir -p $@/tools

	@# Copy CSS and JS files to output directories
	cp static/favicon.png $@/favicon.ico
	for prefix in $@/ $@/tools $@/cloud; do \
		mkdir -p $$prefix/js || exit 1; \
		cp -r static/images $$prefix || exit 1; \
		cp -r static/css $$prefix || exit 1; \
		cp ${DOCS_TOOLS_THEME}/landing.min.js* $$prefix/js || exit 1; \
		cp ${DOCS_TOOLS_THEME}/navbar.min.js* $$prefix/js || exit 1; \
		cp ${DOCS_TOOLS_THEME}/landing.css $$prefix/css || exit 1; \
		cp ${DOCS_TOOLS_THEME}/navbar.min.css $$prefix/css || exit 1; \
	done

	@# Run the script to generate each landing page
	python3 ./gen_landings.py $@

clean:
	-rm -r build
